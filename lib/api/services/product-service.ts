import { ApiResponse, Product, ProductParams } from '@/types/product';
import { apiClient } from '../api-client';

class ProductService {
  async getActiveProducts(params?: ProductParams): Promise<Product[]> {
    // Send params to backend for filtering
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/active', { params });
    return response.data;
  }

  async getProductsByType(type: Product['type'], params?: Omit<ProductParams, 'type'>): Promise<Product[]> {
    return this.getActiveProducts({ ...params, type });
  }

  async getNewArrivals(limit: number = 8): Promise<Product[]> {
    return this.getActiveProducts({ 
      limit, 
      type: 'new',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }

  async getTrendingProducts(limit: number = 8): Promise<Product[]> {
    return this.getActiveProducts({ 
      limit, 
      type: 'trending',
      sort_by: 'average_rating',
      sort_order: 'desc'
    });
  }

  async getSummerProducts(limit: number = 8): Promise<Product[]> {
    return this.getActiveProducts({ 
      limit, 
      type: 'summer',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }

  async getFlashProducts(limit: number = 8): Promise<Product[]> {
    return this.getActiveProducts({ 
      limit, 
      type: 'flash',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }

  async searchProducts(query: string, params?: ProductParams): Promise<Product[]> {
    return this.getActiveProducts({ ...params, search: query });
  }

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  }
}

export const productService = new ProductService();