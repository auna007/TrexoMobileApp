import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const DealOfTheDay = () => {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>🔥 Deal of the Day</Text>
                <TouchableOpacity style={styles.timerContainer}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.timerText}>12h : 45m : 20s</Text>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={["#fff0f3", "#ffe5eb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dealCard}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require("@/assets/images/product-5.png")}
                        style={styles.image}
                    />
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>30% OFF</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>Wireless Headset</Text>
                    <Text style={styles.desc}>Noise Cancelling • Bluetooth 5.0</Text>
                    <Text style={styles.price}>Now ₦18,000</Text>
                    <Text style={styles.oldPrice}>₦25,000</Text>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={styles.buyText}>Shop Now</Text>
                        <Ionicons name="cart-outline" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 28,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D91339",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 5,
    },
    timerText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },
    dealCard: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        padding: 14,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    imageContainer: {
        position: "relative",
        marginRight: 15,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    discountBadge: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#D91339",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
    },
    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    name: {
        fontWeight: "700",
        color: "#111",
        fontSize: 16,
        marginBottom: 3,
    },
    desc: {
        color: "#777",
        fontSize: 13,
        marginBottom: 8,
    },
    price: {
        color: "#D91339",
        fontWeight: "bold",
        fontSize: 15,
    },
    oldPrice: {
        color: "#888",
        textDecorationLine: "line-through",
        marginBottom: 10,
    },
    buyButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D91339",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        alignSelf: "flex-start",
        gap: 5,
    },
    buyText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
});

export default DealOfTheDay;