export interface Category {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
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
    message?: string;
}