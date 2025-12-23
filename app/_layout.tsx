import { CartProvider } from "@/contexts/CartContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify-otp" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </CartProvider>
    );
}