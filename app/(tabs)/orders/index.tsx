import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const TABS = [
    { key: "Pending", icon: "time-outline" },
    { key: "To Ship", icon: "cube-outline" },
    { key: "To Receive", icon: "car-outline" },
    { key: "To Review", icon: "chatbubbles-outline" },
    { key: "Returns & Cancellations", icon: "return-down-back-outline" },
];

const sampleOrders = [
    { id: 1, name: "Samsung Galaxy S23 Ultra", date: "Oct 22, 2025", amount: "₦920,000", status: "Pending" },
    { id: 2, name: "Bluetooth Earbuds", date: "Oct 20, 2025", amount: "₦18,000", status: "To Ship" },
    { id: 3, name: "Gaming Keyboard", date: "Oct 18, 2025", amount: "₦30,000", status: "To Receive" },
    { id: 4, name: "Nike Air Max 270", date: "Oct 17, 2025", amount: "₦75,000", status: "To Review" },
    { id: 5, name: "HP Pavilion Laptop", date: "Oct 14, 2025", amount: "₦480,000", status: "Pending" },
    { id: 6, name: "LED Ring Light", date: "Oct 12, 2025", amount: "₦15,000", status: "To Ship" },
    { id: 7, name: "Backpack", date: "Oct 11, 2025", amount: "₦12,000", status: "To Receive" },
    { id: 8, name: "Smart Watch", date: "Oct 9, 2025", amount: "₦45,000", status: "To Review" },
    { id: 9, name: "Wireless Speaker", date: "Oct 8, 2025", amount: "₦25,000", status: "Completed" },
    { id: 10, name: "Power Bank 30,000mAh", date: "Oct 6, 2025", amount: "₦20,000", status: "Returns & Cancellations" },
    { id: 11, name: "Office Chair", date: "Oct 5, 2025", amount: "₦65,000", status: "Pending" },
    { id: 12, name: "iPad Mini 6", date: "Oct 4, 2025", amount: "₦410,000", status: "Completed" },
    { id: 13, name: "4K Android TV 55\"", date: "Oct 3, 2025", amount: "₦310,000", status: "Pending" },
    { id: 14, name: "Smart Home Camera", date: "Oct 2, 2025", amount: "₦45,000", status: "To Ship" },
    { id: 15, name: "Rechargeable Blender", date: "Oct 1, 2025", amount: "₦18,500", status: "To Receive" },
    { id: 16, name: "Mechanical Gaming Mouse", date: "Sept 30, 2025", amount: "₦14,000", status: "To Review" },
    { id: 17, name: "USB-C Fast Charger", date: "Sept 29, 2025", amount: "₦7,500", status: "Pending" },
    { id: 18, name: "Electric Kettle", date: "Sept 29, 2025", amount: "₦10,500", status: "To Ship" },
    { id: 19, name: "VR Headset", date: "Sept 28, 2025", amount: "₦150,000", status: "Returns & Cancellations" },
    { id: 20, name: "Smart Air Fryer", date: "Sept 27, 2025", amount: "₦55,000", status: "To Receive" },
    { id: 21, name: "Portable Solar Power Bank", date: "Sept 26, 2025", amount: "₦22,000", status: "To Review" },
    { id: 22, name: "Laptop Backpack", date: "Sept 25, 2025", amount: "₦16,000", status: "Pending" },
];

const Orders = () => {
    const [selectedTab, setSelectedTab] = useState("Pending");
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const filteredOrders = sampleOrders.filter((o) => o.status === selectedTab);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "#F59E0B";
            case "To Ship":
                return "#3B82F6";
            case "To Receive":
                return "#10B981";
            case "To Review":
                return "#8B5CF6";
            case "Returns & Cancellations":
                return "#EF4444";
            default:
                return "#6B7280";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
                    <Feather name="refresh-cw" size={20} color="#D91339" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabsContainer}
            >
                {TABS.map((tab) => {
                    const isActive = selectedTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => setSelectedTab(tab.key)}
                            style={[styles.tab, isActive && styles.activeTab]}
                        >
                            <Ionicons
                                name={tab.icon as any}
                                size={18}
                                color={isActive ? "#fff" : "#555"}
                            />
                            <Text
                                style={[
                                    styles.tabText,
                                    isActive && styles.activeTabText,
                                ]}
                            >
                                {tab.key}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {filteredOrders.length ? (
                    filteredOrders.map((order) => (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderCard}
                            onPress={() => {
                                router.push({
                                    pathname: "/order-detail/[id]",
                                    params: { id: order.id.toString() },
                                });
                            }}
                        >
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderName}>{order.name}</Text>
                                <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + "22", borderColor: getStatusColor(order.status) }]}>
                                    {order.status}
                                </Text>
                            </View>
                            <Text style={styles.orderDate}>
                                Ordered on {order.date}
                            </Text>
                            <View style={styles.orderFooter}>
                                <Text style={styles.amount}>{order.amount}</Text>
                                <TouchableOpacity style={styles.detailsBtn}>
                                    <MaterialIcons name="receipt-long" size={16} color="#fff" />
                                    <Text style={styles.detailsText}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="cart-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyText}>No orders found here</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingTop: 55,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#D91339",
    },
    refreshButton: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    tab: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    activeTab: {
        backgroundColor: "#D91339",
        borderColor: "#D91339",
    },
    tabText: {
        marginLeft: 6,
        fontSize: 13,
        color: "#555",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "600",
    },
    orderCard: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 14,
        borderRadius: 14,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    orderName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 12,
        color: "#111",
        borderWidth: 1,
    },
    orderDate: {
        color: "#777",
        fontSize: 13,
        marginBottom: 10,
    },
    orderFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    amount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
    },
    detailsBtn: {
        backgroundColor: "#D91339",
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    detailsText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 80,
    },
    emptyText: {
        marginTop: 10,
        color: "#888",
        fontSize: 15,
    },
});

export default Orders;