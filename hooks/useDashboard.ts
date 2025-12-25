import {
  useProducts,
  useProductsByType,
  useTrendingProducts
} from './useProducts';
  
  // Hook to get deal of the day 
  export const useDealOfTheDay = () => {
    const { data: trendingProducts } = useTrendingProducts(20);

    // Get all active flash products to find the highest flash_end_at
    const { data: allProducts = [] } = useProducts({
      type: 'flash',
      limit: 50
    });

    // Find the latest flash_end_at from all active flash products
    const getHighestFlashEndTime = (): string | null => {
      const flashProductsWithEndTime = allProducts.filter(p => 
        p.flashEndTime && p.isFlashActive
      );
      
      if (flashProductsWithEndTime.length === 0) return null;
      
      const latestFlashProduct = flashProductsWithEndTime.reduce((latest, current) => {
        if (!latest) return current;
        const latestTime = new Date(latest.flashEndTime!).getTime();
        const currentTime = new Date(current.flashEndTime!).getTime();
        return currentTime > latestTime ? current : latest;
      });
      return latestFlashProduct.flashEndTime || null;
    };
    
    const dealOfTheDay = trendingProducts?.[0]; // First trending product as deal
    
    const calculateDiscount = (priceNgn: number): number => {
      // Generate random discount between 15-40%
      return Math.floor(Math.random() * 25) + 15;
    };
  
    if (!dealOfTheDay) return null;
  
    const discount = calculateDiscount(dealOfTheDay.originalPrice);
    const discountPrice = dealOfTheDay.originalPrice * (1 - discount / 100);
    const highestFlashEndTime = getHighestFlashEndTime();
    
    return {
      ...dealOfTheDay,
      discount,
      discountPrice,
      oldPrice: `₦${dealOfTheDay.originalPrice.toLocaleString('en-NG')}`,
      price: `₦${Math.round(discountPrice).toLocaleString('en-NG')}`,
      isFlashSale: false,
      status: 'Deal' as const,
      flashEndTime: highestFlashEndTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  };
  
  // Hook to get flash sale products
  export const useFlashProducts = () => {
    const { data: products, isLoading } = useProductsByType('flash', 8);
    
    const flashProducts = products?.map(product => {
      const discount = Math.floor(Math.random() * 20) + 10; // 10-30% discount
      const discountPrice = product.originalPrice * (1 - discount / 100);
      
      return {
        ...product,
        discount,
        oldPrice: `₦${product.originalPrice.toLocaleString('en-NG')}`,
        price: `₦${Math.round(discountPrice).toLocaleString('en-NG')}`,
        isFlashSale: true,
        status: 'Flash Sale' as const,
        flashEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
      };
    });
  
    return { data: flashProducts, isLoading };
  };
  
  // Hook to get top rated products
  export const useTopRatedProducts = () => {
    const { data: products, isLoading } = useProductsByType('trending', 8);
    
    const topRated = products?.map(product => ({
      ...product,
      status: 'Trending' as const,
    })).sort((a, b) => b.averageRating - a.averageRating);
  
    return { data: topRated, isLoading };
  };