import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authStore } from '../store/auth-store';

class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private tokenRefreshPromise: Promise<string> | null = null;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = authStore.getState().token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        if (process.env.EXPO_PUBLIC_IS_DEV) {
          console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (process.env.EXPO_PUBLIC_IS_DEV) {
          console.log(`✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (process.env.EXPO_PUBLIC_IS_DEV) {
          console.log(`❌ [API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
            status: error.response?.status,
            data: error.response?.data,
            error: error.message,
          });
        }

        // Handle 401 Unauthorized (token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
             // Get new token using refresh token logic
            //  const newToken = await this.handleTokenRefresh();
            
            //  // Update the auth store
            //  authStore.getState().setToken(newToken);
             
            //  // Update the original request header
            //  originalRequest.headers.Authorization = `Bearer ${newToken}`;
             
            //  // Retry the original request
            //  return this.client(originalRequest);
          } catch (refreshError) {
            // Token refresh failed, logout user
            authStore.getState().logout();
            return Promise.reject(refreshError);
          }
        }

        // Handle specific error cases
        if (error.response?.status === 403) {
          // Handle forbidden access
          console.warn('Access forbidden');
        }

        // Throw custom error with meaningful message
        const apiError = this.handleError(error);
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Handle token refresh with request queuing
   * Prevents multiple refresh requests
   */
  private async handleTokenRefresh(): Promise<string> {
    // If refresh process already running → reuse it
    if (this.tokenRefreshPromise) {
        return this.tokenRefreshPromise;
    }
    
    // Create refresh promise
    this.tokenRefreshPromise = new Promise(async (resolve, reject) => {
      try {
        // Get refresh token from secure storage
        const refreshToken = authStore.getState().refreshToken;
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh endpoint
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const newToken = response.data.token;
        
        // Also get new refresh token 
        if (response.data.refresh_token) {
          authStore.getState().setRefreshToken(response.data.refresh_token);
        }

        resolve(newToken);
      } catch (error) {
        reject(error);
      } finally {
        this.tokenRefreshPromise = null;
      }
    });

    return this.tokenRefreshPromise;
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error
      const data = error.response.data as any;
      const message = data?.message || data?.error || 'An error occurred';
      const status = error.response.status;

      return new ApiError(message, status, data, data?.errors);
    } else if (error.request) {
      // Request made but no response
      return new ApiError('Network error. Please check your connection.', 0);
    } else {
      // Something else happened
      return new ApiError(error.message || 'An unexpected error occurred', 0);
    }
  }

  // Public methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /** Upload method with progress tracking */
  async upload<T = any>(
    url: string, 
    formData: FormData, 
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  }
}

// Custom error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any,
    public validationErrors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';

    // Extract validation errors if they exist in standard Laravel format
    if (data?.errors) {
      this.validationErrors = data.errors;
    }
  }

  /**
   * Get the most appropriate error message for display
   */
  getDisplayMessage(): string {
    // 1. If there are validation errors, format them nicely
    if (this.validationErrors) {
      const errors = Object.values(this.validationErrors).flat();
      return errors.join('\n');
    }
    
    // 2. Use the backend-provided message if available
    if (this.data?.message) {
      return this.data.message;
    }
    
    // 3. Fallback to default messages based on status code
    return this.getDefaultMessage();
  }

  private getDefaultMessage(): string {
    switch (this.statusCode) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Please login to continue.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 422:
        return 'Please correct the errors in the form.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return this.message || 'An unexpected error occurred.';
    }
  }
}

export const apiClient = ApiClient.getInstance();