import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Product = {
    id: number;
    image: any;
    name: string;
    price: string;
    quantity?: number;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem("cart");
            if (saved) setCart(JSON.parse(saved));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => setCart([]);

    const increaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p))
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prev) =>
            prev
                .map((p) => (p.id === id ? { ...p, quantity: (p.quantity || 1) - 1 } : p))
                .filter((p) => p.quantity! > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};