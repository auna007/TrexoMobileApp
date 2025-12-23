import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TopRated = () => {
    const router = useRouter();
    const products = [
        { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", rating: "4.9" },
        { id: 2, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", rating: "4.8" },
        { id: 3, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", rating: "5.0" },
        { id: 4, image: require("@/assets/images/product-2.jpg"), name: "Smart Watch", rating: "4.7" },
    ];

    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Top Rated</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("/products")}
                >
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                        <View style={styles.imageContainer}>
                            <Image source={item.image} style={styles.image} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.rating}>{item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
    },
    viewAll: {
        color: "#D91339",
        fontWeight: "600",
        fontSize: 14,
    },
    card: {
        backgroundColor: "#fff",
        width: 150,
        borderRadius: 14,
        marginRight: 14,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
        overflow: "hidden",
    },
    imageContainer: {
        backgroundColor: "#f9f9f9",
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: "contain",
    },
    infoContainer: {
        padding: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rating: {
        marginLeft: 4,
        fontWeight: "bold",
        color: "#444",
        fontSize: 13,
    },
});

export default TopRated;