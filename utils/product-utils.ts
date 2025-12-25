import { Product, TransformedProduct } from '@/types/product';

export const transformProduct = (product: Product): TransformedProduct => {
  // Determine status based on type and other factors
  const getStatus = (product: Product): TransformedProduct['status'] => {
    if (product.type === 'flash' && product.is_flash_active) {
      return 'Flash Sale';
    }
    
    switch (product.type) {
      case 'new': 
        // Check if product is less than 7 days old
        // const createdAt = new Date(product.created_at);
        // const now = new Date();
        // const daysOld = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        return 'New';
      case 'summer': 
        return 'Summer';
      case 'trending': 
        return 'Trending';
      default: 
        return 'New';
    }
  };

  // Get main image
  const getMainImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      // Try to find primary image
      const primaryImage = product.images.find(img => img.is_primary === '1' || img.is_primary === 'true');
      if (primaryImage && primaryImage.image_url) {
        return primaryImage.image_url;
      }
      
      // Try first image with valid URL
      const firstImage = product.images.find(img => img.image_url);
      if (firstImage && firstImage.image_url) {
        return firstImage.image_url;
      }
    }
    
    // Fallback to product.image or product.image_url
    return product.image || 'https://via.placeholder.com/150';
  };

  // Get all image URLs 
  const getAllImages = (product: Product): string[] => {
    const images = new Set<string>();
    
    // Add main image
    const mainImage = getMainImage(product);
    if (mainImage && mainImage !== 'https://via.placeholder.com/150') {
      images.add(mainImage);
    }
    
    // Add all images from images array
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img.image_url) {
          images.add(img.image_url);
        }
      });
    }
    
    return images.size > 0 ? Array.from(images) : ['https://via.placeholder.com/150'];
  };

  // Calculate discount percentage if applicable
  const calculateDiscount = (product: Product): number | undefined => {
    // For flash sales with active timer, generate random discount
    if (product.type === 'flash' && product.is_flash_active) {
      return Math.floor(Math.random() * 40) + 10; // 10-50% discount
    }
    
    return 20; // Default 20% discount for other types
  };

  // Format price in Naira
  const formatPrice = (priceNgn: number): string => {
    if (priceNgn >= 1000000) {
      return `₦${(priceNgn / 1000000).toFixed(1)}M`;
    }
    if (priceNgn >= 1000) {
      return `₦${(priceNgn / 1000).toFixed(1)}K`;
    }
    return `₦${priceNgn.toLocaleString('en-NG')}`;
  };

  // Check if product is in stock
  const isInStock = (quantity: string): boolean => {
    const qty = parseInt(quantity);
    return !isNaN(qty) && qty > 0;
  };

  // Get category name safely
  const getCategoryName = (product: Product): string => {
    return product.category?.name || 'Uncategorized';
  };

  // Get flash end time if product is a flash sale
  const getFlashEndTime = (product: Product): string | null => {
    if (product.type === 'flash' && product.flash_end_at) {
      return product.flash_end_at;
    }
    return null;
  };

  // Calculate old price for discounted items
  const getOldPrice = (product: Product, discount?: number): string | undefined => {
    if (discount && discount > 0) {
      const originalPriceNgn = product.price_ngn / (1 - discount / 100);
      return formatPrice(Math.round(originalPriceNgn));
    }
    return undefined;
  };

  const status = getStatus(product);
  const discount = calculateDiscount(product);
  const isFlashSale = product.type === 'flash' && product.is_flash_active;
  const flashEndTime = getFlashEndTime(product);
  const oldPrice = getOldPrice(product, discount);

  return {
    id: Number(product.id),
    title: product.name,
    description: product.description || 'No description available',
    price: formatPrice(product.price_ngn),
    originalPrice: parseFloat(product.price),
    image: getMainImage(product),
    type: product.type,
    status,
    averageRating: product.average_rating || 0,
    category: getCategoryName(product),
    quantity: parseInt(product.quantity) || 0,
    isInStock: isInStock(product.quantity),
    images: getAllImages(product),
    discount,
    oldPrice,
    isFlashSale,
    flashEndTime,
    isFlashActive: product.is_flash_active || false,
    categoryId: parseInt(product.category_id) || 0,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
};

export const transformProducts = (products: Product[]): TransformedProduct[] => {
  return products.map(transformProduct);
};

// Helper to filter and transform products by type
export const getProductsByType = (
  products: Product[], 
  type: Product['type'],
  limit?: number
): TransformedProduct[] => {
  const filtered = products.filter(product => product.type === type);
  const transformed = transformProducts(filtered);
  return limit ? transformed.slice(0, limit) : transformed;
};

// Helper to get trending products (high rating or new)
export const getTrendingProducts = (
  products: Product[], 
  limit: number = 8
): TransformedProduct[] => {
  const transformed = transformProducts(products);
  
  return transformed
    .sort((a, b) => {
      // Prioritize high rating
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      // Then prioritize newer products
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, limit);
};

// Helper to get new arrivals (last 7 days)
export const getNewArrivals = (
  products: Product[], 
  limit: number = 8
): TransformedProduct[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const transformed = transformProducts(products);
  
  return transformed
    .filter(product => new Date(product.createdAt) > sevenDaysAgo)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

// Helper to get flash sales
export const getFlashSales = (
  products: Product[], 
  limit: number = 8
): TransformedProduct[] => {
  const transformed = transformProducts(products);
  
  return transformed
    .filter(product => product.isFlashSale)
    .sort((a, b) => {
      // Sort by time left (soonest ending first)
      if (a.flashEndTime && b.flashEndTime) {
        return new Date(a.flashEndTime).getTime() - new Date(b.flashEndTime).getTime();
      }
      return 0;
    })
    .slice(0, limit);
};

// Helper to get deal of the day (random trending product with discount)
export const getDealOfTheDay = (products: Product[]): TransformedProduct | null => {
  const trendingProducts = getTrendingProducts(products, 20);
  
  if (trendingProducts.length === 0) return null;
  
  // Select random product from top trending
  const randomIndex = Math.floor(Math.random() * Math.min(5, trendingProducts.length));
  const randomProduct = trendingProducts[randomIndex];
  
  // Add discount for deal
  const discount = Math.floor(Math.random() * 35) + 15; // 15-50% discount
  const discountedPrice = Math.round(Number(randomProduct.price) * (1 - discount / 100));
  
  return {
    ...randomProduct,
    discount,
    price: `₦${discountedPrice.toLocaleString('en-NG')}`,
    oldPrice: randomProduct.price,
    status: 'Deal' as const,
    isFlashSale: false,
    flashEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  };
};

export const getHighestFlashEndTime = (products: Product[]): string | null => {
  const flashProducts = products.filter(p => 
    p.type === 'flash' && 
    p.is_flash_active && 
    p.flash_end_at
  );
  
  if (flashProducts.length === 0) return null;
  
  // Sort by flash_end_at (latest first)
  const sortedFlashProducts = [...flashProducts].sort((a, b) => {
    const aTime = new Date(a.flash_end_at!).getTime();
    const bTime = new Date(b.flash_end_at!).getTime();
    return bTime - aTime; // Descending (latest first)
  });
  
  return sortedFlashProducts[0].flash_end_at;
};