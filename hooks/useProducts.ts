import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { productService } from '../lib/api/services/product-service';

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getActiveProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteProducts = (params?: any) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      productService.getActiveProducts({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Implement pagination logic based on your API response
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });
};