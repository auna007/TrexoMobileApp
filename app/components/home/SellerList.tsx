import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SellerList = ({ sellers }: { sellers: any[] }) => (
    <View style={styles.container}>
        {sellers.map((seller) => (
            <View key={seller.id} style={styles.card}>
                <View style={styles.avatar}>
                    <Text style={styles.initial}>{seller.name.charAt(0)}</Text>
                </View>
                <Text style={styles.name}>{seller.name}</Text>
                <Text style={styles.rating}>{seller.rating}</Text>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
    card: {
        width: "30%",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#D91339",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    initial: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    name: { fontWeight: "600", fontSize: 14 },
    rating: { color: "#555", fontSize: 13 },
});

export default SellerList;