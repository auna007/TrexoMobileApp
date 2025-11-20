import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ThankYou() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thank you for your order! 🎉</Text>
            <Text style={styles.subHeader}>Your order has been placed successfully.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(tabs)")}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#D91339",
        marginBottom: 15,
        textAlign: "center"
    },
    subHeader: {
        fontSize: 18,
        color: "#333",
        marginBottom: 30,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#D91339",
        padding: 15,
        borderRadius: 10
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16
    },
});