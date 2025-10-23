import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CustomerReviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Jane Doe",
            location: "Lagos",
            rating: 5,
            text: "Amazing shopping experience! Fast delivery, great prices, and quality products. Highly recommend Trexo Mall!",
        },
        {
            id: 2,
            name: "Tunde Ade",
            location: "Abuja",
            rating: 5,
            text: "The customer service is excellent. I got assistance quickly, and my order arrived earlier than expected. Love it ❤️",
        },
        {
            id: 3,
            name: "Chioma Eze",
            location: "Enugu",
            rating: 4,
            text: "Good variety of products and easy checkout. My go-to shopping app from now on!",
        },
    ];

    const renderStars = (rating: number) =>
        Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
                key={i}
                name={i < rating ? "star" : "star-outline"}
                size={14}
                color="#FFD700"
                style={{ marginRight: 2 }}
            />
        ));

    return (
        <View style={styles.section}>
            <Text style={styles.title}>What Our Customers Say 💬</Text>

            <FlatList
                data={reviews}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                snapToInterval={width * 0.8 + 16}
                decelerationRate="fast"
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.headerRow}>
                            <Ionicons name="person-circle" size={45} color="#D91339" style={styles.icon} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.location}>{item.location}</Text>
                                <View style={styles.starRow}>{renderStars(item.rating)}</View>
                            </View>
                        </View>
                        <Text style={styles.text}>“{item.text}”</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 35,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 12,
    },
    card: {
        backgroundColor: "#fff",
        width: width * 0.8,
        borderRadius: 16,
        padding: 18,
        marginRight: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#f2f2f2",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    name: {
        fontWeight: "700",
        fontSize: 15,
        color: "#222",
    },
    location: {
        fontSize: 13,
        color: "#888",
    },
    starRow: {
        flexDirection: "row",
        marginTop: 4,
    },
    text: {
        fontSize: 14,
        color: "#333",
        lineHeight: 21,
        fontStyle: "italic",
        marginTop: 5,
    },
});

export default CustomerReviews;