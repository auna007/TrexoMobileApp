import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FlashSales = () => {
    const router = useRouter();

    const products = [
        { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦25,000", oldPrice: "₦30,000", discount: "-17%" },
        { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦10,000", oldPrice: "₦14,000", discount: "-28%" },
        { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦18,000", oldPrice: "₦24,000", discount: "-25%" },
        { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦55,000", oldPrice: "₦70,000", discount: "-21%" },
    ];

    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <View style={styles.titleRow}>
                    <Ionicons name="flash" size={20} color="#D91339" />
                    <Text style={styles.title}>Flash Sales</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("/products")}
                >
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{item.discount}</Text>
                        </View>

                        <View style={styles.imageContainer}>
                            <Image source={item.image} style={styles.image} />
                        </View>

                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: { marginBottom: 30 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 2,
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    title: { fontSize: 18, fontWeight: "bold", color: "#111" },
    viewAll: { color: "#D91339", fontWeight: "600", fontSize: 14 },
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
        position: "relative",
        padding: 10,
    },
    discountBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "#D91339",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 6,
        zIndex: 2,
    },
    discountText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    imageContainer: { height: 110, justifyContent: "center", alignItems: "center", marginBottom: 8 },
    image: { width: 100, height: 100, resizeMode: "contain" },
    name: { fontWeight: "600", color: "#222", textAlign: "center", fontSize: 14, marginBottom: 4 },
    priceRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 },
    price: { fontWeight: "bold", color: "#D91339", fontSize: 14 },
    oldPrice: { color: "#888", textDecorationLine: "line-through", fontSize: 12 },
});

export default FlashSales;