import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ThemedView from "../components/ThemedView";

const OrderStatus = () => {
    const router = useRouter();
    const params = useLocalSearchParams<{ status?: string }>();
    const status = params.status || "success";

    const isSuccess = status === "success";

    return (
        <ThemedView>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    {isSuccess ? (
                        <Ionicons name="checkmark-circle" size={120} color="#34D399" />
                    ) : (
                        <Ionicons name="close-circle" size={120} color="#EF4444" />
                    )}
                </View>

                <Text style={styles.title}>
                    {isSuccess ? "Order Successful!" : "Order Failed"}
                </Text>

                <Text style={styles.message}>
                    {isSuccess
                        ? "Your order has been placed successfully. You will receive a confirmation shortly."
                        : "Something went wrong with your order. Please try again or contact support."}
                </Text>

                <View style={styles.buttonContainer}>
                    {isSuccess ? (
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push("/(tabs)")}
                        >
                            <Text style={styles.buttonText}>Go to Home</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.buttonText}>Retry Order</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {isSuccess && (
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push("/orders")}
                    >
                        <Text style={styles.secondaryText}>View My Orders</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 22,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 15,
    },
    primaryButton: {
        backgroundColor: "#D91339",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    secondaryText: {
        color: "#D91339",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default OrderStatus;