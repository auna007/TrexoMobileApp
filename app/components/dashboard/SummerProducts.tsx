import React, { useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SummerProducts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<any>>(null);

    const summerProducts = [
        { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦35,000" },
        { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦12,000" },
        { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦20,000" },
        { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦40,000" },
    ];

    const nextSlide = () => {
        if (currentIndex < summerProducts.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>Summer Products</Text>

            <View style={styles.carouselWrapper}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    data={summerProducts}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={[styles.arrow, styles.leftArrow]}
                    onPress={prevSlide}
                >
                    <Ionicons name="chevron-back-circle" size={40} color="#D91339" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.arrow, styles.rightArrow]}
                    onPress={nextSlide}
                >
                    <Ionicons name="chevron-forward-circle" size={40} color="#D91339" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 10,
    },
    carouselWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginRight: 12,
        width: width * 0.4,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 110,
        resizeMode: "contain",
    },
    name: {
        fontWeight: "600",
        color: "#333",
        marginTop: 5,
    },
    price: {
        color: "#D91339",
        fontWeight: "bold",
    },
    arrow: {
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -20 }],
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 20,
        padding: 2,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    leftArrow: {
        left: 0,
    },
    rightArrow: {
        right: 0,
    },
});

export default SummerProducts;