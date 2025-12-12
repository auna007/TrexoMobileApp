import { CartProvider } from "@/contexts/CartContext";
import { queryClient } from "@/lib/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import ErrorBoundary from "./components/ErrorBoundary";

export default function RootLayout() {
    return (
        <ErrorBoundary
            fallback={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Something went wrong. Please restart the app.</Text>
                </View>
            }
        >
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </ErrorBoundary>
    );
}