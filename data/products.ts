export type PopularityTag = "trending" | "hot" | "new" | "popular";

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: any[];
    rating: number;
    discount: number;
    available: boolean;
    stock: number;
    category: "Clothes" | "Bags" | "Accessories" | "Electronics";
    weight: number;
    sku: string;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    popularity: PopularityTag;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic Cotton T-Shirt",
        price: 29.99,
        description: "Soft breathable cotton t-shirt suitable for everyday wear.",
        images: [
            require("../assets/images/product-1.png"),
            require("../assets/images/trending-1.png")
        ],
        rating: 4.5,
        discount: 10,
        available: true,
        stock: 120,
        category: "Clothes",
        weight: 0.3,
        sku: "CLS-TS-001",
        dimensions: { width: 30, height: 40, depth: 2 },
        popularity: "trending"
    },
    {
        id: "2",
        name: "Slim Fit Denim Jeans",
        price: 59.99,
        description: "Modern slim-fit denim with durable stitching.",
        images: [
            require("../assets/images/product-2.jpg"),
            require("../assets/images/product-3.png")
        ],
        rating: 4.6,
        discount: 15,
        available: true,
        stock: 80,
        category: "Clothes",
        weight: 0.8,
        sku: "DEN-JN-002",
        dimensions: { width: 35, height: 45, depth: 4 },
        popularity: "hot"
    },
    {
        id: "3",
        name: "Leather Handbag",
        price: 89.99,
        description: "Premium leather handbag with spacious interior.",
        images: [
            require("../assets/images/product-4.png"),
            require("../assets/images/trending-2.png")
        ],
        rating: 4.8,
        discount: 20,
        available: true,
        stock: 40,
        category: "Bags",
        weight: 1.2,
        sku: "BAG-LTH-003",
        dimensions: { width: 40, height: 30, depth: 12 },
        popularity: "popular"
    },
    {
        id: "4",
        name: "Canvas Backpack",
        price: 69.99,
        description: "Durable backpack suitable for travel and daily use.",
        images: [
            require("../assets/images/product-5.png"),
            require("../assets/images/product-6.png"),
            require("../assets/images/trending-3.png")
        ],
        rating: 4.7,
        discount: 5,
        available: true,
        stock: 65,
        category: "Bags",
        weight: 1.5,
        sku: "BAG-CNV-004",
        dimensions: { width: 32, height: 45, depth: 15 },
        popularity: "trending"
    },
    {
        id: "5",
        name: "Wireless Earbuds",
        price: 49.99,
        description: "Noise-isolating wireless earbuds with long battery life.",
        images: [
            require("../assets/images/product-7.png"),
            require("../assets/images/trending-4.png")
        ],
        rating: 4.4,
        discount: 25,
        available: true,
        stock: 150,
        category: "Electronics",
        weight: 0.1,
        sku: "ELC-WEB-005",
        dimensions: { width: 8, height: 6, depth: 3 },
        popularity: "hot"
    },
    {
        id: "6",
        name: "Smart Fitness Watch",
        price: 129.99,
        description: "Track workouts, heart rate, and daily activity.",
        images: [
            require("../assets/images/product-8.png"),
            require("../assets/images/product-9.png")
        ],
        rating: 4.6,
        discount: 18,
        available: true,
        stock: 70,
        category: "Electronics",
        weight: 0.2,
        sku: "ELC-SFW-006",
        dimensions: { width: 4, height: 4, depth: 1 },
        popularity: "popular"
    },
    {
        id: "7",
        name: "Leather Wallet",
        price: 24.99,
        description: "Slim leather wallet with multiple card slots.",
        images: [
            require("../assets/images/product-10.png"),
            require("../assets/images/product-11.png")
        ],
        rating: 4.3,
        discount: 5,
        available: true,
        stock: 200,
        category: "Accessories",
        weight: 0.15,
        sku: "ACC-LWT-007",
        dimensions: { width: 10, height: 8, depth: 1 },
        popularity: "new"
    },
    {
        id: "8",
        name: "Aviator Sunglasses",
        price: 34.99,
        description: "UV-protected stylish aviator sunglasses.",
        images: [
            require("../assets/images/product-1.png"),
            require("../assets/images/product-2.jpg")
        ],
        rating: 4.2,
        discount: 12,
        available: true,
        stock: 90,
        category: "Accessories",
        weight: 0.1,
        sku: "ACC-SUN-008",
        dimensions: { width: 14, height: 5, depth: 4 },
        popularity: "hot"
    },
    {
        id: "9",
        name: "Running Sneakers",
        price: 99.99,
        description: "Lightweight sneakers designed for performance.",
        images: [
            require("../assets/images/product-3.png"),
            require("../assets/images/product-4.png")
        ],
        rating: 4.7,
        discount: 10,
        available: true,
        stock: 55,
        category: "Clothes",
        weight: 0.9,
        sku: "CLS-SNK-009",
        dimensions: { width: 28, height: 12, depth: 10 },
        popularity: "trending"
    },
    {
        id: "10",
        name: "Casual Hoodie",
        price: 49.99,
        description: "Warm fleece hoodie for casual outings.",
        images: [
            require("../assets/images/product-5.png"),
            require("../assets/images/product-6.png")
        ],
        rating: 4.5,
        discount: 8,
        available: true,
        stock: 75,
        category: "Clothes",
        weight: 0.7,
        sku: "CLS-HOD-010",
        dimensions: { width: 35, height: 45, depth: 5 },
        popularity: "popular"
    },
    {
        id: "11",
        name: "Minimal Wrist Watch",
        price: 79.99,
        description: "Elegant wrist watch with minimalist design.",
        images: [
            require("../assets/images/product-7.png"),
            require("../assets/images/product-8.png")
        ],
        rating: 4.6,
        discount: 15,
        available: true,
        stock: 60,
        category: "Accessories",
        weight: 0.2,
        sku: "ACC-WAT-011",
        dimensions: { width: 4, height: 4, depth: 1 },
        popularity: "hot"
    },
    {
        id: "12",
        name: "Bluetooth Speaker",
        price: 54.99,
        description: "Portable speaker with deep bass and clear sound.",
        images: [
            require("../assets/images/product-9.png"),
            require("../assets/images/product-10.png")
        ],
        rating: 4.4,
        discount: 20,
        available: true,
        stock: 110,
        category: "Electronics",
        weight: 0.6,
        sku: "ELC-BSP-012",
        dimensions: { width: 18, height: 8, depth: 8 },
        popularity: "trending"
    },
    {
        id: "13",
        name: "Laptop Sleeve",
        price: 27.99,
        description: "Protective sleeve compatible with most laptops.",
        images: [
            require("../assets/images/product-11.png"),
            require("../assets/images/product-1.png")
        ],
        rating: 4.3,
        discount: 10,
        available: true,
        stock: 140,
        category: "Accessories",
        weight: 0.4,
        sku: "ACC-LPS-013",
        dimensions: { width: 38, height: 27, depth: 2 },
        popularity: "new"
    },
    {
        id: "14",
        name: "Travel Duffel Bag",
        price: 119.99,
        description: "Spacious duffel bag ideal for weekend trips.",
        images: [
            require("../assets/images/product-2.jpg"),
            require("../assets/images/product-3.png")
        ],
        rating: 4.7,
        discount: 18,
        available: true,
        stock: 35,
        category: "Bags",
        weight: 2.0,
        sku: "BAG-DUF-014",
        dimensions: { width: 55, height: 30, depth: 28 },
        popularity: "popular"
    },
    {
        id: "15",
        name: "Noise-Canceling Headphones",
        price: 199.99,
        description: "Over-ear headphones with active noise cancellation.",
        images: [
            require("../assets/images/product-4.png"),
            require("../assets/images/product-5.png"),
            require("../assets/images/trending-1.png")
        ],
        rating: 4.9,
        discount: 22,
        available: true,
        stock: 45,
        category: "Electronics",
        weight: 0.9,
        sku: "ELC-NCH-015",
        dimensions: { width: 20, height: 18, depth: 10 },
        popularity: "hot"
    }
];