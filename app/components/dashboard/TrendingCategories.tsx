import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Category = {
    name: string;
    slug: string;
    icon: React.ReactNode;
};

const TrendingCategories = () => {
    const router = useRouter();

    const categories: Category[] = [
        { name: "Electronics", slug: "electronics", icon: <MaterialIcons name="devices" size={20} color="#D91339" /> },
        { name: "Fashion", slug: "fashion", icon: <Ionicons name="shirt-outline" size={20} color="#D91339" /> },
        { name: "Home & Kitchen", slug: "home-kitchen", icon: <MaterialIcons name="kitchen" size={20} color="#D91339" /> },
        { name: "Gadgets", slug: "gadgets", icon: <FontAwesome5 name="mobile-alt" size={18} color="#D91339" /> },
        { name: "Accessories", slug: "accessories", icon: <Feather name="watch" size={20} color="#D91339" /> },
        { name: "Beauty", slug: "beauty", icon: <Ionicons name="rose-outline" size={20} color="#D91339" /> },
        { name: "Automotive", slug: "automotive", icon: <Ionicons name="car-outline" size={20} color="#D91339" /> },
        { name: "Toys", slug: "toys", icon: <Ionicons name="game-controller-outline" size={20} color="#D91339" /> },
    ];

    return (
        <View style={styles.section}>
            <Text style={styles.title}>🔥 Trending Categories</Text>
            <View style={styles.categoryGrid}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.85}
                        style={styles.categoryCard}
                        onPress={() => router.push(`/categories/${item.slug}`)}
                    >
                        <View style={styles.iconContainer}>{item.icon}</View>
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 15,
    },
    categoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
    },
    categoryCard: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        width: "48%",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 0.5,
        borderColor: "#f5f5f5",
    },
    iconContainer: {
        backgroundColor: "#ffe8eb",
        padding: 8,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default TrendingCategories;