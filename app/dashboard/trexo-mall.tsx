import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TrexoMall = () => {
    const categories = [
        "All",
        "Accessories",
        "Electronics",
        "Home",
        "Fashion",
        "Autos",
        "Gadgets",
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const trending = [
        { id: 1, image: require("@/assets/images/trending-1.png"), name: "Bluetooth Speaker" },
        { id: 2, image: require("@/assets/images/trending-2.png"), name: "Smart Watch" },
        { id: 3, image: require("@/assets/images/trending-3.png"), name: "Wireless Earbuds" },
        { id: 4, image: require("@/assets/images/trending-4.png"), name: "Sunglasses" },
    ];

    const products = [
        { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦35,000" },
        { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦12,000" },
        { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦20,000" },
        { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦40,000" },
        { id: 5, image: require("@/assets/images/product-5.png"), name: "Wireless Headset", price: "₦18,000" },
        { id: 6, image: require("@/assets/images/product-6.png"), name: "Smart Light", price: "₦10,000" },
    ];

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.name.toLowerCase().includes(selectedCategory.toLowerCase()));

    return (
        <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>Trexo Mall 🛍️</Text>
                        <TouchableOpacity>
                            <Ionicons name="search" size={22} color="#D91339" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((cat) => {
                            const active = cat === selectedCategory;
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setSelectedCategory(cat)}
                                    style={[
                                        styles.categoryTab,
                                        active && styles.activeCategory,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            active && styles.activeCategoryText,
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 5 }}
                        >
                            {trending.map((item) => (
                                <View key={item.id} style={styles.trendingCard}>
                                    <Image source={item.image} style={styles.trendingImage} />
                                    <Text style={styles.trendingName}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <Text style={styles.sectionTitle}>Top Picks For You 💎</Text>
                </>
            }
            renderItem={({ item }) => (
                <View style={styles.productCard}>
                    <Image source={item.image} style={styles.productImage} />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addBtn}>
                        <Ionicons name="cart-outline" size={18} color="#fff" />
                        <Text style={styles.addText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#D91339",
    },
    categoriesContainer: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    categoryTab: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    activeCategory: {
        backgroundColor: "#D91339",
    },
    categoryText: {
        color: "#555",
        fontWeight: "500",
    },
    activeCategoryText: {
        color: "#fff",
        fontWeight: "600",
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    seeAll: {
        color: "#D91339",
        fontSize: 13,
        fontWeight: "600",
    },
    trendingCard: {
        width: 130,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
    },
    trendingImage: {
        width: "100%",
        height: 100,
        resizeMode: "contain",
    },
    trendingName: {
        textAlign: "center",
        marginTop: 5,
        fontWeight: "600",
        color: "#333",
        fontSize: 13,
    },
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        width: "48%",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: "100%",
        height: 120,
        resizeMode: "contain",
    },
    productName: {
        fontWeight: "600",
        color: "#222",
        marginTop: 5,
    },
    productPrice: {
        color: "#D91339",
        fontWeight: "bold",
        marginBottom: 8,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D91339",
        borderRadius: 8,
        paddingVertical: 8,
        gap: 5,
    },
    addText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
});

export default TrexoMall;