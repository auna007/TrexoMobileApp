import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomerReviews from "../components/dashboard/CustomerReviews";
import DealOfTheDay from "../components/dashboard/DealOfTheDay";
import FlashSales from "../components/dashboard/FlashSales";
import SummerProducts from "../components/dashboard/SummerProducts";
import TopRated from "../components/dashboard/TopRated";
import TrendingCategories from "../components/dashboard/TrendingCategories";
import ThemedView from "../components/ThemedView";

const Dashboard = () => {
    const [greeting, setGreeting] = useState("");
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 17) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    return (
        <ThemedView>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
                    <Text style={styles.greeting}>{`${greeting}, Ayomide 👋`}</Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor="#888"
                    />

                    <SummerProducts />
                    <TrendingCategories />
                    <DealOfTheDay />
                    <FlashSales />
                    <TopRated />
                    <CustomerReviews />
                </ScrollView>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15,  },
    greeting: { fontSize: 22, fontWeight: "bold", color: "#D91339", marginBottom: 15 },
    searchInput: {
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        marginBottom: 25,
    },
});

export default Dashboard;