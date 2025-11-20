import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import SummerProducts from "../components/dashboard/SummerProducts";
import TrendingCategories from "../components/dashboard/TrendingCategories";
import DealOfTheDay from "../components/dashboard/DealOfTheDay";
import FlashSales from "../components/dashboard/FlashSales";
import TopRated from "../components/dashboard/TopRated";
import CustomerReviews from "../components/dashboard/CustomerReviews";

const Dashboard = () => {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 17) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 50 },
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