import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const Wishlist = () => {
    const wishlistItems = [
        {
            id: 1,
            name: "Samsung Galaxy S23 Ultra",
            price: "₦920,000",
            image: require("@/assets/images/product-1.png"),
        },
        {
            id: 2,
            name: "Nike Air Max 270",
            price: "₦75,000",
            image: require("@/assets/images/product-3.png"),
        },
        {
            id: 3,
            name: "Bluetooth Earbuds",
            price: "₦18,000",
            image: require("@/assets/images/product-4.png"),
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>My Wishlist</Text>

            {wishlistItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>Your wishlist is empty</Text>
                </View>
            ) : (
                wishlistItems.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.image} style={styles.image} />

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>

                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.moveBtn}>
                                    <Feather name="shopping-cart" size={16} color="#fff" />
                                    <Text style={styles.moveText}>Add to Cart</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.removeBtn}>
                                    <Feather name="trash-2" size={16} color="#D91339" />
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            )}

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60, // Top padding for status bar
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 25,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 80,
    },
    emptyText: {
        marginTop: 10,
        color: "#888",
        fontSize: 18,
        fontWeight: "500",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 0.5,
        borderColor: "#eee",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    info: {
        flex: 1,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 12,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 12,
    },
    moveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D91339",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 6,
    },
    moveText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    removeBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D91339",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 6,
    },
    removeText: {
        color: "#D91339",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default Wishlist;