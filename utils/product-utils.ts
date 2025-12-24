import { Product, TransformedProduct } from '@/types/product';

export const transformProduct = (product: Product): TransformedProduct => {
  // Determine status based on type
  const getStatus = (type: string): TransformedProduct['status'] => {
    switch (type) {
      case 'new': return 'New';
      case 'trending': return 'Trending';
      case 'summer': return 'Summer';
      case 'flash': return 'Flash Sale';
      default: return 'New';
    }
  };

  // Get main image (prioritize primary image from images array)
  const getMainImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.is_primary === '1');
      if (primaryImage) return primaryImage.image_url;
      return product.images[0].image_url;
    }
    return product.image || 'https://via.placeholder.com/150';
  };

  // Get all image URLs
  const getAllImages = (product: Product): string[] => {
    const images = product.images?.map(img => img.image_url) || [];
    if (product.image && !images.includes(product.image)) {
      images.unshift(product.image);
    }
    return images.length > 0 ? images : ['https://via.placeholder.com/150'];
  };

  // Format price in Naira
  const formatPrice = (priceNgn: number): string => {
    return `₦${priceNgn.toLocaleString('en-NG')}`;
  };

  return {
    id: product.id,
    title: product.name,
    description: product.description,
    price: formatPrice(product.price_ngn),
    originalPrice: parseFloat(product.price),
    image: getMainImage(product),
    type: product.type,
    status: getStatus(product.type),
    averageRating: product.average_rating || 0,
    category: product.category.name,
    quantity: parseInt(product.quantity),
    isInStock: parseInt(product.quantity) > 0,
    images: getAllImages(product),
  };
};

export const filterProductsByType = (
  products: Product[], 
  type: Product['type'], 
  limit?: number
): TransformedProduct[] => {
  const filtered = products
    .filter(product => product.type === type)
    .slice(0, limit)
    .map(transformProduct);
  
  return filtered;
};

export const groupProductsByType = (products: Product[]): Record<string, TransformedProduct[]> => {
  const groups: Record<string, TransformedProduct[]> = {};
  
  products.forEach(product => {
    const type = product.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(transformProduct(product));
  });
  
  return groups;
};

export const getRandomProducts = (products: Product[], count: number): TransformedProduct[] => {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(transformProduct);
};