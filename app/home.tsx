import { useProducts } from "@/hooks/useProducts";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTASection from "./components/home/CTASection";
import DealBanner from "./components/home/DealBanner";
import HeaderAuth from "./components/home/HeaderAuth";
import HeroCarousel from "./components/home/HeroCarousel";
import ProductGrid from "./components/home/ProductGrid";
import SearchBar from "./components/home/SearchBar";
import SectionTitle from "./components/home/SectionTitle";
import SellerList from "./components/home/SellerList";
import TrackingSection from "./components/home/TrackingSection";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { 
        data: products, 
        isLoading, 
        error, 
        refetch 
    } = useProducts({
        limit: 10,
        sort: 'newest'
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);
    const newProducts = [
        {
            id: 1,
            image: require("@/assets/images/product-1.png"),
            title: "Wireless Earbuds",
            description: "High-quality sound with noise cancellation.",
            price: "₦25,000",
            status: "New",
        },
        {
            id: 2,
            image: require("@/assets/images/product-2.jpg"),
            title: "Smart Watch",
            description: "Track your fitness and stay connected.",
            price: "₦45,000",
            status: "New",
        },
        {
            id: 3,
            image: require("@/assets/images/product-3.png"),
            title: "Power Bank",
            description: "10000mAh fast charging capacity.",
            price: "₦15,000",
            status: "New",
        },
        {
            id: 4,
            image: require("@/assets/images/product-4.png"),
            title: "Wireless Mouse",
            description: "Ergonomic and battery efficient.",
            price: "₦7,500",
            status: "New",
        },
        {
            id: 5,
            image: require("@/assets/images/product-5.png"),
            title: "Mechanical Keyboard",
            description: "RGB backlight with durable switches.",
            price: "₦28,000",
            status: "New",
        },
        {
            id: 6,
            image: require("@/assets/images/product-6.png"),
            title: "Phone Case",
            description: "Durable and stylish protective design.",
            price: "₦5,000",
            status: "New",
        },
    ];

    const trendingProducts = [
        {
            id: 7,
            image: require("@/assets/images/trending-1.png"),
            title: "Gaming Laptop",
            description: "High performance for gaming and productivity.",
            price: "₦450,000",
            status: "Trending",
        },
        {
            id: 8,
            image: require("@/assets/images/trending-2.png"),
            title: "Bluetooth Speaker",
            description: "Portable speaker with deep bass and long battery.",
            price: "₦18,000",
            status: "Trending",
        },
        {
            id: 9,
            image: require("@/assets/images/trending-3.png"),
            title: "Smart TV",
            description: "4K Ultra HD display with built-in streaming.",
            price: "₦300,000",
            status: "Trending",
        },
        {
            id: 10,
            image: require("@/assets/images/trending-4.png"),
            title: "Drone Camera",
            description: "Capture cinematic aerial shots easily.",
            price: "₦120,000",
            status: "Trending",
        },
    ];

    const sellers = [
        { id: 1, name: "TechWorld", rating: "4.9⭐" },
        { id: 2, name: "Naija Gadgets", rating: "4.8⭐" },
        { id: 3, name: "Smart Deals", rating: "4.7⭐" },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
            <ScrollView 
                style={styles.container} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <HeaderAuth />
                <HeroCarousel />
                <DealBanner />
                <SearchBar placeholder="Search for products, brands, or sellers..." />
                <SectionTitle title="New Arrivals" />
                <ProductGrid products={newProducts} />
                <SectionTitle title="Top Verified Sellers" />
                <SellerList sellers={sellers} />
                <SectionTitle title="Track Your Goods" />
                <TrackingSection />
                <SectionTitle title="Trending Now" />
                <ProductGrid products={trendingProducts} />
                <CTASection />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingInline: 16,
        backgroundColor: "#fff"
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingInline: 16,
    },
});

export default Home;