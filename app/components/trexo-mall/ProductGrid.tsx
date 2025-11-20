import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart, Product } from "@/contexts/CartContext";
import { useRouter } from "expo-router";

export default function ProductGrid({ item }: { item: Product }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleViewProduct = () => {
        router.push({
            pathname: "/product-detail/[id]",
            params: { id: item.id.toString() },
        });
    };

    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                    <Ionicons name="cart-outline" size={18} color="#fff" />
                    <Text style={styles.addText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={handleViewProduct}>
                    <Text style={styles.iconText}>View Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        width: "48%",
        marginBottom: 15,
        elevation: 2,
        alignItems: "center",
    },
    image: { width: "100%", height: 120, resizeMode: "contain", marginBottom: 8 },
    name: { fontWeight: "600", fontSize: 14, textAlign: "center", marginBottom: 4 },
    price: { color: "#D91339", fontWeight: "bold", marginBottom: 8 },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D91339",
        borderRadius: 8,
        paddingVertical: 10,
        width: "100%",
        marginBottom: 6,
        gap: 5,
    },
    addText: { color: "#fff", fontWeight: "600" },
    iconText: { color: "#000", fontWeight: "600" },
    iconBtn: {
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 10,
        width: "100%",
        marginBottom: 6,
        gap: 5,
    },
});