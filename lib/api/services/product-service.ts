import { apiClient } from '../api-client';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class ProductService {
  async getActiveProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
  }): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products/active', { params });
    return response;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response;
  }

  async searchProducts(query: string, params?: any): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products/search', {
      params: { q: query, ...params },
    });
    return response;
  }
}

export const productService = new ProductService();