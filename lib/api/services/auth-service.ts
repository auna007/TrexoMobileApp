import { apiClient } from '../api-client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: any;
  token_type: string;
  expires_in: number | null;
}

export interface RegisterResponse {
  message: string;
  otp_expires_in: number;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return await apiClient.post<LoginResponse>('/auth/login', credentials);
  }

  async register(userData: RegisterData): Promise<RegisterResponse> {
    return await apiClient.post<RegisterResponse>('/auth/register', userData);
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Any other status error → still logout client-side
      console.warn("Logout error (ignored):", error);
    }
  }

  async refreshToken(): Promise<string> {
    // Implement token refresh logic
    throw new Error('Not implemented');
  }
}

export const authService = new AuthService();