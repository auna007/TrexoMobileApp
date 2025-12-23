import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // router for navigation
import ThemedView from "../components/ThemedView";

const trending = [
    { id: 1, image: require("@/assets/images/trending-1.png"), name: "Bluetooth Speaker" },
    { id: 2, image: require("@/assets/images/trending-2.png"), name: "Smart Watch" },
    { id: 3, image: require("@/assets/images/trending-3.png"), name: "Wireless Earbuds" },
    { id: 4, image: require("@/assets/images/trending-4.png"), name: "Sunglasses" },
];

const products = [
    { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦35,000" },
    { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦12,000" },
    { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦20,000" },
    { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦40,000" },
    { id: 5, image: require("@/assets/images/product-5.png"), name: "Wireless Headset", price: "₦18,000" },
    { id: 6, image: require("@/assets/images/product-6.png"), name: "Smart Light", price: "₦10,000" },
];

type OrderTransaction = {
    id: string;
    orderNumber: string;
    items: { productId: number; quantity: number }[];
    total: string;
    date: string;
    status: "Completed" | "Pending" | "Failed";
};

const allOrders: OrderTransaction[] = [
    { id: "1", orderNumber: "ORD-1001", items: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }], total: "₦59,000", date: "Dec 10, 2025", status: "Completed" },
    { id: "2", orderNumber: "ORD-1002", items: [{ productId: 3, quantity: 1 }], total: "₦20,000", date: "Dec 09, 2025", status: "Pending" },
    { id: "3", orderNumber: "ORD-1003", items: [{ productId: 4, quantity: 1 }], total: "₦40,000", date: "Dec 08, 2025", status: "Failed" },
    { id: "4", orderNumber: "ORD-1004", items: [{ productId: 5, quantity: 2 }], total: "₦36,000", date: "Dec 07, 2025", status: "Completed" },
];

const tabs = ["All", "Completed", "Pending", "Failed"] as const;

const Transactions = () => {
    const router = useRouter(); // for navigation
    const [filter, setFilter] = useState<typeof tabs[number]>("All");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(4);
    const [loadingMore, setLoadingMore] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(10)).current;

    const filteredOrders = allOrders.filter((order) => {
        const matchesFilter = filter === "All" || order.status === filter;
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            order.items.some((item) => {
                const prod = products.find((p) => p.id === item.productId);
                return prod?.name.toLowerCase().includes(search.toLowerCase());
            });
        return matchesFilter && matchesSearch;
    });

    const visibleOrders = filteredOrders.slice(0, visibleCount);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        ]).start();
    }, [filter, search]);

    const loadMore = () => {
        if (loadingMore || visibleCount >= filteredOrders.length) return;
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 4);
            setLoadingMore(false);
        }, 600);
    };

    const getStatusColor = (status: OrderTransaction["status"]) => {
        switch (status) {
            case "Completed": return "#16a34a";
            case "Pending": return "#eab308";
            case "Failed": return "#dc2626";
        }
    };

    return (
        <ThemedView>
            <View style={styles.container}>
                <Text style={styles.title}>My Orders</Text>

                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color="#777" />
                    <TextInput
                        placeholder="Search orders"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <View style={styles.tabsRow}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, filter === tab && styles.activeTab]}
                            onPress={() => { setFilter(tab); setVisibleCount(4); }}
                        >
                            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }} onScrollEndDrag={loadMore}>
                    {visibleOrders.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="file-tray-outline" size={70} color="#bbb" />
                            <Text style={styles.emptyText}>No orders found</Text>
                        </View>
                    )}

                    {visibleOrders.map((order) => {
                        const firstItem = products.find((p) => p.id === order.items[0].productId);
                        return (
                            <TouchableOpacity
                                key={order.id}
                                onPress={() => router.push(`/order-detail/${order.id}`)}
                            >
                                <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                                    <View style={styles.leftRow}>
                                        {firstItem && <Image source={firstItem.image} style={styles.productImage} />}
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.txTitle}>
                                                {order.items.map(i => {
                                                    const prod = products.find(p => p.id === i.productId);
                                                    return `${prod?.name}${i.quantity > 1 ? ` x${i.quantity}` : ""}`;
                                                }).join(", ")}
                                            </Text>
                                            <Text style={styles.txDate}>Order ID: {order.orderNumber}</Text>
                                            <Text style={styles.txDate}>{order.date}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.rightRow}>
                                        <Text style={styles.txAmount}>{order.total}</Text>
                                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + "22" }]}>
                                            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}

                    {loadingMore && <ActivityIndicator size="small" color="#D91339" style={{ marginTop: 15 }} />}
                </ScrollView>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20, backgroundColor: "#f8f8f8", paddingHorizontal: 20 },
    title: { fontSize: 26, fontWeight: "700", color: "#111", marginBottom: 25 },
    searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 20, borderWidth: 1, borderColor: "#eee" },
    searchInput: { marginLeft: 8, fontSize: 15, flex: 1, color: "#222" },
    tabsRow: { flexDirection: "row", marginBottom: 18 },
    tab: { marginRight: 12, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: "#eee" },
    activeTab: { backgroundColor: "#D91339" },
    tabText: { fontSize: 14, fontWeight: "600", color: "#444" },
    activeTabText: { color: "#fff" },
    card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
    leftRow: { flexDirection: "row", alignItems: "center", flex: 1 },
    productImage: { width: 60, height: 60, borderRadius: 10, resizeMode: "cover" },
    txTitle: { fontSize: 16, fontWeight: "600", color: "#222", marginBottom: 2 },
    txDate: { fontSize: 13, color: "#777" },
    rightRow: { alignItems: "flex-end" },
    txAmount: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 6 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: "700" },
    emptyState: { marginTop: 100, alignItems: "center" },
    emptyText: { marginTop: 10, fontSize: 15, color: "#777", fontWeight: "500" },
});

export default Transactions;
