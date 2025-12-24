import { authStore } from "@/lib/store/auth-store";
import { Redirect } from "expo-router";

export default function Index() {
    const isAuthenticated = authStore.getState().isAuthenticated;
    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }
    return <Redirect href="/home" />;
}