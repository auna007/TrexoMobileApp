import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/contexts/CartContext";
import { router } from "expo-router";

export default function TrexoHeader() {
    const { cart } = useCart();

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Trexo Mall 🛍️</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={{ marginRight: 18 }}>
                    <Ionicons name="search" size={22} color="#D91339" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cartIcon} onPress={() => router.push("/cart")}>
                    <Ionicons name="cart-outline" size={26} color="#D91339" />
                    {cart.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cart.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    title: { fontSize: 22, fontWeight: "bold", color: "#D91339" },
    cartIcon: { position: "relative" },
    badge: {
        position: "absolute",
        top: -5,
        right: -8,
        backgroundColor: "#D91339",
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});