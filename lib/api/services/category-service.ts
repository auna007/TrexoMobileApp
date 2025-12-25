import { Category } from '@/types';
import { apiClient } from '../api-client';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>('/categories');
    return response;
  }

  async getActiveCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(cat => cat.status === '1');
  }
}

export const categoryService = new CategoryService();