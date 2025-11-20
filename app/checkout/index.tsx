import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
    const { cart, clearCart } = useCart();
    const total = cart.reduce((sum, item) => {
        const priceNumber = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
        return sum + priceNumber * (item.quantity || 1);
    }, 0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [card, setCard] = useState("");

    const router = useRouter();

    const handleCheckout = () => {
        if (!name || !email || !address || !card) {
            Alert.alert("Please fill in all fields");
            return;
        }

        Alert.alert("Order placed successfully!");
        clearCart();

        router.replace("/thank-you");
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>
                                ${item.price} x {item.quantity}
                            </Text>
                        </View>
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>Checkout 🛒</Text>
                        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                        <Text style={styles.subHeader}>Billing Information</Text>

                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Shipping Address"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            placeholder="Card Number"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={card}
                            onChangeText={setCard}
                            keyboardType="number-pad"
                        />
                    </>
                }
                ListFooterComponent={
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutText}>Place Order</Text>
                        <Ionicons
                            name="arrow-forward-circle-outline"
                            size={24}
                            color="#fff"
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                }
                contentContainerStyle={{ padding: 20 }}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
                        Your cart is empty
                    </Text>
                }
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#f7f7f7", flexGrow: 1 },
    header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#D91339" },
    subHeader: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#333" },
    itemRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: "center",
        elevation: 3,
    },
    itemImage: { width: 60, height: 60, borderRadius: 10 },
    itemName: { fontWeight: "600", fontSize: 16 },
    itemPrice: { color: "#D91339", marginTop: 4 },
    total: { fontSize: 20, fontWeight: "bold", marginVertical: 15, color: "#000" },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16,
        elevation: 2,
    },
    checkoutButton: {
        flexDirection: "row",
        backgroundColor: "#D91339",
        padding: 15,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        elevation: 3,
    },
    checkoutText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});