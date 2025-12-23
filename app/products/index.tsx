import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import ThemedView from "../components/ThemedView";
import ProductGrid from "../components/trexo-mall/ProductGrid";
import { products, Product, PopularityTag } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const categories: Product["category"][] = ["Clothes", "Bags", "Accessories", "Electronics"];
const popularityOptions: PopularityTag[] = ["trending", "hot", "new", "popular"];
const ratingOptions = [1, 2, 3, 4, 5];

export default function Products() {
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Product["category"] | "All">("All");
    const [selectedPopularity, setSelectedPopularity] = useState<PopularityTag | "All">("All");
    const [selectedRating, setSelectedRating] = useState(0);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            const matchesPopularity = selectedPopularity === "All" || p.popularity === selectedPopularity;
            const matchesRating = selectedRating === 0 || Math.round(p.rating) === selectedRating;
            const matchesMinPrice = minPrice === "" || p.price >= parseFloat(minPrice);
            const matchesMaxPrice = maxPrice === "" || p.price <= parseFloat(maxPrice);
            return (
                matchesSearch &&
                matchesCategory &&
                matchesPopularity &&
                matchesRating &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });
    }, [search, minPrice, maxPrice, selectedCategory, selectedPopularity, selectedRating]);

    const resetFilters = () => {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setSelectedCategory("All");
        setSelectedPopularity("All");
        setSelectedRating(0);
    };

    const renderHeader = () => (
        <View>
            <View style={styles.searchCard}>
                <TextInput
                    placeholder="Search products..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
                <View style={styles.priceRow}>
                    <TextInput
                        placeholder="Min"
                        placeholderTextColor="#999"
                        value={minPrice}
                        onChangeText={setMinPrice}
                        keyboardType="numeric"
                        style={styles.priceInput}
                    />
                    <TextInput
                        placeholder="Max"
                        placeholderTextColor="#999"
                        value={maxPrice}
                        onChangeText={setMaxPrice}
                        keyboardType="numeric"
                        style={styles.priceInput}
                    />
                    <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                        <Ionicons name="refresh" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={["All", ...categories]}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.filterRow}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedCategory(item === "All" ? "All" : item as Product["category"])}
                        style={[styles.filterBtn, selectedCategory === item && styles.activeFilterBtn]}
                    >
                        <Text style={[styles.filterText, selectedCategory === item && styles.activeFilterText]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={["All", ...popularityOptions]}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.filterRow}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedPopularity(item === "All" ? "All" : item as PopularityTag)}
                        style={[styles.filterBtn, selectedPopularity === item && styles.activeFilterBtn]}
                    >
                        <Text style={[styles.filterText, selectedPopularity === item && styles.activeFilterText]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[0, ...ratingOptions]}
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={styles.filterRow}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedRating(item)}
                        style={[styles.filterBtn, selectedRating === item && styles.activeFilterBtn]}
                    >
                        <Text style={[styles.filterText, selectedRating === item && styles.activeFilterText]}>
                            {item === 0 ? "All" : `${item}★`}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    return (
        <ThemedView>
            <View style={styles.wrapper}>
                <FlatList
                    data={filteredProducts}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 15, marginTop: 10 }}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="cube-outline" size={80} color="#ccc" style={{ marginBottom: 20 }} />
                            <Text style={styles.emptyText}>No products found</Text>
                            <Text style={styles.emptySubText}>Try changing your filters or search term.</Text>
                            <TouchableOpacity style={styles.resetBtnLarge} onPress={resetFilters}>
                                <Text style={styles.resetTextLarge}>Reset Filters</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ProductGrid
                            item={{
                                id: Number(item.id),
                                name: item.name,
                                price: `₦${item.price.toLocaleString()}`,
                                image: item.images[0],
                            }}
                        />
                    )}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#fff" },
    searchCard: {
        backgroundColor: "#f7f7f7",
        margin: 15,
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        marginBottom: 10,
    },
    priceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    priceInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 14,
    },
    resetBtn: {
        backgroundColor: "#D91339",
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    resetBtnLarge: {
        backgroundColor: "#D91339",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginTop: 15,
    },
    resetText: { color: "#fff", fontWeight: "600" },
    resetTextLarge: { color: "#fff", fontWeight: "700", fontSize: 16 },
    filterRow: { flexDirection: "row", paddingHorizontal: 15, gap: 8, marginVertical: 8 },
    filterBtn: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    activeFilterBtn: { backgroundColor: "#D91339", borderColor: "#D91339" },
    filterText: { fontSize: 13, color: "#333" },
    activeFilterText: { color: "#fff", fontWeight: "600" },
    emptyContainer: { alignItems: "center", justifyContent: "center", marginTop: 50, paddingHorizontal: 20 },
    emptyText: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 6 },
    emptySubText: { fontSize: 14, color: "#666", textAlign: "center" },
});