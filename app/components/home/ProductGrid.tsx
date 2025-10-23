import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductGrid = ({ products }: { products: any[] }) => (
    <View style={styles.container}>
        {products.map((item) => (
            <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text
                    style={[
                        styles.status,
                        { backgroundColor: item.status === "New" ? "#10B981" : "#F59E0B" },
                    ]}
                >
                    {item.status}
                </Text>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    image: { width: "100%", height: 120, resizeMode: "contain", marginBottom: 10 },
    title: { fontSize: 15, fontWeight: "600", color: "#333" },
    desc: { fontSize: 12, color: "#666", marginVertical: 3 },
    price: { fontWeight: "bold", color: "#D91339", marginBottom: 5 },
    status: {
        color: "#fff",
        fontSize: 11,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        alignSelf: "flex-start",
    },
});

export default ProductGrid;