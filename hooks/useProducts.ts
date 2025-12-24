import { productService } from '@/lib/api/services/product-service';
import { Product, ProductParams } from '@/types/product';
import { transformProduct } from '@/utils/product-utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Base hook for all products
export const useProducts = (params?: ProductParams) => {
  return useQuery({
    queryKey: ['products', 'active', params],
    queryFn: () => productService.getActiveProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data.map(transformProduct),
  });
};

// Hook for products by type
export const useProductsByType = (type: Product['type'], limit?: number) => {
  return useQuery({
    queryKey: ['products', 'type', type, limit],
    queryFn: () => productService.getProductsByType(type, { limit }),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.map(transformProduct).slice(0, limit),
  });
};

// Hook for new arrivals
export const useNewArrivals = (limit: number = 4) => {
  return useProductsByType('new', limit);
};

// Hook for trending products
export const useTrendingProducts = (limit: number = 4) => {
  return useProductsByType('trending', limit);
};

// Hook for summer products
export const useSummerProducts = (limit: number = 4) => {
  return useProductsByType('summer', limit);
};

// Infinite scroll hook
export const useInfiniteProducts = (params?: Omit<ProductParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      productService.getActiveProducts({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming pagination metadata is in the response
      if (lastPage.length === 0 || lastPage.length < (params?.limit || 10)) {
        return undefined;
      }
      return allPages.length + 1;
    },
    select: (data) => ({
      pages: data.pages.map(page => page.map(transformProduct)),
      pageParams: data.pageParams,
    }),
  });
};

// Search hook
export const useSearchProducts = (query: string, params?: ProductParams) => {
  return useQuery({
    queryKey: ['products', 'search', query, params],
    queryFn: () => productService.searchProducts(query, params),
    enabled: query.length > 2, // Only search when query has at least 3 characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    select: (data) => data.map(transformProduct),
  });
};