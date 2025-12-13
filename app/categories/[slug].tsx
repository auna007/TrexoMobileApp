import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";

type Product = {
    id: number;
    image: any;
    name: string;
    price: string;
    category: string;
};

// Sample products
const productsData: Product[] = [
    { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦35,000", category: "Home & Kitchen" },
    { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦12,000", category: "Fashion" },
    { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦20,000", category: "Electronics" },
    { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦40,000", category: "Home & Kitchen" },
    { id: 5, image: require("@/assets/images/product-5.png"), name: "Wireless Headset", price: "₦18,000", category: "Gadgets" },
    { id: 6, image: require("@/assets/images/product-6.png"), name: "Smart Light", price: "₦10,000", category: "Electronics" },
];

// Categories with slugs and icons
type Category = {
    name: string;
    slug: string;
    icon: React.ReactNode;
};

const categoryList: Category[] = [
    { name: "Electronics", slug: "electronics", icon: <MaterialIcons name="devices" size={22} color="#D91339" /> },
    { name: "Fashion", slug: "fashion", icon: <Ionicons name="shirt-outline" size={22} color="#D91339" /> },
    { name: "Home & Kitchen", slug: "home-kitchen", icon: <MaterialIcons name="kitchen" size={22} color="#D91339" /> },
    { name: "Gadgets", slug: "gadgets", icon: <FontAwesome5 name="mobile-alt" size={20} color="#D91339" /> },
    { name: "Accessories", slug: "accessories", icon: <Feather name="watch" size={22} color="#D91339" /> },
    { name: "Beauty", slug: "beauty", icon: <Ionicons name="rose-outline" size={22} color="#D91339" /> },
    { name: "Automotive", slug: "automotive", icon: <Ionicons name="car-outline" size={22} color="#D91339" /> },
    { name: "Toys", slug: "toys", icon: <Ionicons name="game-controller-outline" size={22} color="#D91339" /> },
];

const CategoryProducts = () => {
    const params = useLocalSearchParams<{ slug?: string }>();
    const initialSlug = params.slug || "electronics";

    const initialCategory = categoryList.find(c => c.slug === initialSlug)?.name || "Electronics";

    const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const filteredProducts = useMemo<Product[]>(() => {
        return productsData.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{activeCategory}</Text>

                    <TouchableOpacity
                        style={styles.changeBtn}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="filter-outline" size={18} color="#D91339" />
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>

                {filteredProducts.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="alert-circle-outline" size={65} color="#bbb" />
                        <Text style={styles.emptyText}>No products in this category</Text>
                    </View>
                )}

                <View style={styles.grid}>
                    {filteredProducts.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Select Category</Text>

                        <ScrollView contentContainerStyle={styles.categoryGrid}>
                            {categoryList.map((cat) => (
                                <TouchableOpacity
                                    key={cat.slug}
                                    style={[
                                        styles.categoryItem,
                                        activeCategory === cat.name && styles.activeCategoryItem,
                                    ]}
                                    onPress={() => {
                                        setActiveCategory(cat.name);
                                        setModalVisible(false);
                                    }}
                                >
                                    <View style={styles.categoryIcon}>{cat.icon}</View>
                                    <Text style={[
                                        styles.categoryItemText,
                                        activeCategory === cat.name && styles.activeCategoryText
                                    ]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "#fafafa", paddingHorizontal: 20, paddingTop: 60 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    title: { fontSize: 26, fontWeight: "700", color: "#111", width: "70%" },
    changeBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#ffe8eb", paddingVertical: 7, paddingHorizontal: 14, borderRadius: 10 },
    changeText: { fontSize: 14, fontWeight: "600", color: "#D91339" },
    emptyContainer: { marginTop: 60, alignItems: "center", paddingBottom: 40 },
    emptyText: { marginTop: 10, fontSize: 15, color: "#666", fontWeight: "500" },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 20 },
    card: { width: "47%", backgroundColor: "#fff", padding: 12, borderRadius: 14, shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 2, borderWidth: 0.6, borderColor: "#eee" },
    image: { width: "100%", height: 130, borderRadius: 12, marginBottom: 10 },
    name: { fontSize: 14, fontWeight: "600", color: "#222" },
    price: { fontSize: 14, fontWeight: "700", color: "#D91339", marginTop: 5 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    modalBox: { backgroundColor: "#fff", padding: 22, borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: "70%" },
    modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#111" },
    categoryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 14, paddingBottom: 20 },
    categoryItem: { width: "30%", paddingVertical: 18, backgroundColor: "#f2f2f2", borderRadius: 14, alignItems: "center" },
    activeCategoryItem: { backgroundColor: "#D91339" },
    categoryIcon: { marginBottom: 8 },
    categoryItemText: { fontSize: 13, fontWeight: "600", color: "#333", textAlign: "center" },
    activeCategoryText: { color: "#fff" },
    closeBtn: { alignSelf: "center", marginTop: 20 },
    closeText: { fontSize: 16, fontWeight: "600", color: "#D91339" },
});

export default CategoryProducts;