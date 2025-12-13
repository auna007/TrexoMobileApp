import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const orders = [
    {
        orderNumber: "ORD-1001",
        status: "Shipped",
        estimatedDelivery: "Dec 15, 2025",
        items: [
            { name: "Smart Fan", quantity: 1 },
            { name: "Cool Shades", quantity: 2 },
        ],
        history: [
            { date: "Dec 10, 2025", action: "Order Placed" },
            { date: "Dec 11, 2025", action: "Payment Confirmed" },
            { date: "Dec 12, 2025", action: "Order Shipped" },
        ],
    },
    {
        orderNumber: "ORD-1002",
        status: "Pending",
        estimatedDelivery: "Dec 18, 2025",
        items: [
            { name: "Beach Speaker", quantity: 1 },
        ],
        history: [
            { date: "Dec 09, 2025", action: "Order Placed" },
        ],
    },
];

const Tracking = () => {
    const [trackingId, setTrackingId] = useState("");
    const [order, setOrder] = useState<typeof orders[0] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrack = () => {
        setLoading(true);
        setOrder(null);
        setError("");

        setTimeout(() => {
            const found = orders.find(
                (o) => o.orderNumber.toLowerCase() === trackingId.trim().toLowerCase()
            );
            if (found) {
                setOrder(found);
            } else {
                setError("No order found with this tracking ID.");
            }
            setLoading(false);
        }, 800);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Track Your Order</Text>

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Enter your tracking ID"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={trackingId}
                    onChangeText={setTrackingId}
                />
                <TouchableOpacity style={styles.button} onPress={handleTrack}>
                    <Ionicons name="search" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#D91339" style={{ marginTop: 20 }} />}

            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : null}

            {order && (
                <View style={styles.orderCard}>
                    <Text style={styles.orderNumber}>Order ID: {order.orderNumber}</Text>
                    <Text style={styles.status}>Status: {order.status}</Text>
                    <Text style={styles.estimated}>Estimated Delivery: {order.estimatedDelivery}</Text>

                    <Text style={styles.sectionTitle}>Items:</Text>
                    {order.items.map((item, index) => (
                        <Text key={index} style={styles.itemText}>
                            {item.name} x{item.quantity}
                        </Text>
                    ))}

                    <Text style={styles.sectionTitle}>Order History:</Text>
                    {order.history.map((h, index) => (
                        <View key={index} style={styles.historyRow}>
                            <Text style={styles.historyDate}>{h.date}</Text>
                            <Text style={styles.historyAction}>{h.action}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#f8f8f8",
        flexGrow: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 30,
    },
    inputRow: {
        flexDirection: "row",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#eee",
        marginRight: 10,
    },
    button: {
        backgroundColor: "#D91339",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "#dc2626",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 20,
    },
    orderCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        marginTop: 20,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    status: {
        fontSize: 14,
        marginBottom: 6,
        color: "#16a34a",
    },
    estimated: {
        fontSize: 14,
        marginBottom: 12,
        color: "#555",
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginTop: 10,
        marginBottom: 6,
        color: "#D91339",
    },
    itemText: {
        fontSize: 14,
        marginBottom: 4,
    },
    historyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    historyDate: {
        fontSize: 13,
        color: "#777",
    },
    historyAction: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111",
    },
});

export default Tracking;