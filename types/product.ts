export interface ProductImage {
    id: number;
    product_id: string;
    image_url: string;
    sort_order: string;
    is_primary: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ProductCategory {
    id: number;
    name: string;
    status: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    price: string;
    flash_start_at: string | null;
    flash_end_at: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    image: string; // Main image URL
    type: 'new' | 'summer' | 'flash' | 'trending' | string; // Add other types as needed
    quantity: string;
    average_rating: number;
    is_flash_active: boolean;
    price_ngn: number;
    category: ProductCategory;
    images: ProductImage[];
  }
  
  export interface ApiResponse<T> {
    data: T;
    meta?: {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<{
        url: string | null;
        label: string;
        active: boolean;
      }>;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  }
  
  export interface ProductParams {
    page?: number;
    limit?: number;
    category_id?: number | string;
    type?: Product['type'];
    sort_by?: 'id' | 'price' | 'name' | 'created_at' | 'average_rating';
    sort_order?: 'asc' | 'desc';
    min_price?: number;
    max_price?: number;
    search?: string;
    featured?: boolean;
  }
  
  export interface TransformedProduct {
    id: number;
    title: string;
    description: string;
    price: string;
    originalPrice: number;
    image: string;
    type: Product['type'];
    status: 'New' | 'Trending' | 'Summer' | 'Flash Sale' | 'Limited';
    averageRating: number;
    category: string;
    quantity: number;
    isInStock: boolean;
    images: string[]; // Array of image URLs
  }