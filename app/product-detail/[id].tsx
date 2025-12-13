import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";

const { width } = Dimensions.get("window");

const ProductDetail: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const product = useMemo(() => products.find(p => p.id === id), [id]);

    if (!product) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Product not found</Text>
            </View>
        );
    }

    const discountedPrice = product.discount
        ? (product.price - (product.price * product.discount) / 100).toFixed(2)
        : product.price.toFixed(2);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: discountedPrice,
            image: product.images[0],
            quantity,
        });
        Alert.alert(`Added ${quantity} item(s) to cart!`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/cart")} style={styles.cartBtn}>
                    <Ionicons name="cart-outline" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setActiveImageIndex(index);
                }}
            >
                {product.images.map((img, idx) => (
                    <Image
                        key={idx}
                        source={img}
                        style={[styles.image, { width: width - 40 }]}
                    />
                ))}
            </ScrollView>

            <View style={styles.imageIndicatorContainer}>
                {product.images.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.imageIndicator,
                            i === activeImageIndex && styles.activeImageIndicator,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.name}</Text>

                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <Ionicons
                            key={i}
                            name={i <= Math.round(product.rating) ? "star" : "star-outline"}
                            size={18}
                            color="#D91339"
                        />
                    ))}
                    <Text style={styles.stockText}>{product.stock} in stock</Text>
                </View>

                <View style={styles.priceContainer}>
                    {product.discount ? (
                        <Text style={styles.oldPrice}>₦{product.price.toFixed(2)}</Text>
                    ) : null}
                    <Text style={styles.price}>₦{discountedPrice}</Text>
                    {product.discount ? (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{product.discount}%</Text>
                        </View>
                    ) : null}
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Specifications</Text>
                <Text>Category: {product.category}</Text>
                <Text>SKU: {product.sku}</Text>
                <Text>Weight: {product.weight}kg</Text>
                <Text>
                    Dimensions: {product.dimensions.width} × {product.dimensions.height} ×{" "}
                    {product.dimensions.depth} cm
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

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: "#f7f7f7",
        alignItems: "center",
    },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    topBar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    cartBtn: {
        backgroundColor: "#D91339",
        padding: 10,
        borderRadius: 10,
    },

    image: {
        height: 300,
        borderRadius: 16,
        marginBottom: 10,
        resizeMode: "contain",
    },
    imageIndicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    imageIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeImageIndicator: { backgroundColor: "#D91339" },

    infoContainer: { width: "100%", marginBottom: 15 },
    title: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 6 },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    stockText: { marginLeft: 8, color: "#555" },
    priceContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
    price: { fontSize: 22, fontWeight: "bold", color: "#D91339" },
    oldPrice: {
        fontSize: 18,
        fontWeight: "600",
        textDecorationLine: "line-through",
        color: "#999",
        marginRight: 10,
    },
    discountBadge: {
        backgroundColor: "#D91339",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
        marginLeft: 10,
    },
    discountText: { color: "#fff", fontWeight: "600", fontSize: 12 },

    sectionContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    description: { fontSize: 16, color: "#555", lineHeight: 22 },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 40,
        elevation: 2,
        marginBottom: 20,
    },
    qtyBtn: { paddingHorizontal: 12 },
    quantity: { fontSize: 22, fontWeight: "bold", marginHorizontal: 20 },

    addToCartButton: {
        width: "100%",
        backgroundColor: "#D91339",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 30,
        elevation: 3,
    },
    addToCartText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});