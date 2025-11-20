import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart, Product } from "@/contexts/CartContext";
import { useRouter } from "expo-router";

const ProductDetail: React.FC = () => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const product: Product = {
        id: 1,
        name: "Awesome Product",
        price: "49.99",
        image: require("@/assets/images/product-1.png"),
        quantity: quantity,
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        Alert.alert(`Added ${quantity} item(s) to cart!`);
    };

    const goToCart = () => {
        router.push("/cart");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.screenTitle}>Product Detail</Text>
                <TouchableOpacity onPress={goToCart} style={styles.cartBtn}>
                    <Ionicons name="cart-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <Image source={product.image} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    This is a detailed description of the product. Highlight features, quality, 
                    and why it's worth buying. Include specifications, material, or anything important.
                </Text>
            </View>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.qtyBtn}>
                    <Ionicons name="remove-outline" size={28} color="#D91339" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.qtyBtn}>
                    <Ionicons name="add-outline" size={28} color="#D91339" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f2f2f2",
        paddingTop: 40,
        alignItems: "center",
    },
    topBar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    cartBtn: {
        backgroundColor: "#D91339",
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 16,
        marginBottom: 20,
    },
    infoContainer: {
        width: "100%",
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 6,
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#D91339",
    },
    descriptionContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    description: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 40,
        elevation: 2,
    },
    qtyBtn: {
        paddingHorizontal: 12,
    },
    quantity: {
        fontSize: 22,
        fontWeight: "bold",
        marginHorizontal: 20,
    },
    addToCartButton: {
        width: "100%",
        backgroundColor: "#D91339",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 30,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default ProductDetail;