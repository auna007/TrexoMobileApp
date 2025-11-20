import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "expo-router";

export default function Cart() {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
    const router = useRouter();

    const total = cart.reduce((sum, item) => {
        const priceNumber = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
        return sum + (priceNumber || 0) * (item.quantity || 1);
    }, 0);


    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={80} color="#ccc" />
                <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart 🛒</Text>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Image source={item.image} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                                    <Ionicons name="remove-circle-outline" size={25} color="#D91339" />
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                                    <Ionicons name="add-circle-outline" size={25} color="#D91339" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <Ionicons name="trash-outline" size={25} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.summary}>
                <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>

                <TouchableOpacity
                    style={styles.checkout}
                    onPress={() => router.push("/checkout")}
                >
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clear} onPress={clearCart}>
                    <Text style={styles.clearText}>Clear Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    row: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: "center",
        elevation: 3,
    },
    image: { width: 70, height: 70, marginRight: 15, borderRadius: 10 },
    name: { fontWeight: "600", fontSize: 16 },
    price: { color: "#D91339", marginTop: 3, fontWeight: "500" },
    remove: { color: "red", marginLeft: "auto" },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quantity: {
        marginHorizontal: 10,
        fontWeight: "600",
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: { fontSize: 20, color: "#aaa", marginTop: 10 },
    summary: { marginTop: 20 },
    total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    clear: {
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    clearText: { textAlign: "center", fontWeight: "600" },
    checkout: {
        backgroundColor: "#D91339",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    checkoutText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});