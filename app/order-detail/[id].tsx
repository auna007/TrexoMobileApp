import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

const sampleOrders: any = {
    1: {
        id: 1,
        name: "Smart Fan",
        image: require("@/assets/images/product-1.png"),
        date: "Oct 15, 2025",
        amount: "₦35,000",
        status: "Completed",
        orderNumber: "ORD-928374921",
        paymentMethod: "Paystack",
        deliveryDate: "Oct 19, 2025",
        address: "21 Lekki Gardens Phase 4, Lagos, Nigeria",
    },
};

const OrderDetail = () => {
    const { id } = useLocalSearchParams();
    const order = sampleOrders[id as any];
    const [loadingImage, setLoadingImage] = useState(true);

    if (!order) {
        return (
            <View style={styles.emptyState}>
                <Ionicons name="file-tray-outline" size={60} color="#D91339" />

                <Text style={styles.emptyTitle}>Order Not Found</Text>

                <Text style={styles.emptyMessage}>
                    We could not find the order you are looking for. It may have been
                    removed or the link is incorrect.
                </Text>

                <TouchableOpacity style={styles.emptyBtn} onPress={() => router.back()}>
                    <Text style={styles.emptyBtnText}>Go Back</Text>
                </TouchableOpacity>
            </View>

        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#D91339" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View>
                    {loadingImage && (
                        <ActivityIndicator size="large" color="#D91339" style={styles.loader} />
                    )}
                    <Image
                        source={order.image}
                        style={styles.productImage}
                        onLoadEnd={() => setLoadingImage(false)}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.productName}>{order.name}</Text>
                        <Text style={[styles.statusBadge]}>
                            {order.status}
                        </Text>
                    </View>
                    <Text style={styles.orderAmount}>{order.amount}</Text>
                    <Text style={styles.subText}>Ordered on {order.date}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Order Number</Text>
                        <Text style={styles.infoValue}>{order.orderNumber}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Payment Method</Text>
                        <Text style={styles.infoValue}>{order.paymentMethod}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total Amount</Text>
                        <Text style={styles.infoValue}>{order.amount}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Delivered On</Text>
                        <Text style={styles.infoValue}>{order.deliveryDate}</Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.infoLabel}>Shipping Address</Text>
                        <Text style={styles.address}>{order.address}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tracking Timeline</Text>

                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <Text style={styles.timelineText}>Order Placed • {order.date}</Text>
                    </View>

                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <Text style={styles.timelineText}>Order Shipped</Text>
                    </View>

                    <View style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <Text style={styles.timelineText}>In Transit</Text>
                    </View>

                    <View style={styles.timelineItem}>
                        <View style={[styles.timelineDot, { backgroundColor: "#10B981" }]} />
                        <Text style={styles.timelineText}>
                            Delivered • {order.deliveryDate}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.helpBtn}>
                    <Feather name="help-circle" size={20} color="#fff" />
                    <Text style={styles.helpText}>Need Help?</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default OrderDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingTop: 55,
    },
    backBtn: {
        paddingLeft: 20,
        marginBottom: 10,
    },
    loader: {
        position: "absolute",
        zIndex: 10,
    },

    productImage: {
        width: "88%",
        height: 220,
        alignSelf: "center",
        borderRadius: 12,
        marginBottom: 15,
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 16,
        borderRadius: 14,
        elevation: 2,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productName: {
        fontSize: 18,
        fontWeight: "700",
    },
    statusBadge: {
        backgroundColor: "#10B98122",
        borderColor: "#10B981",
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        color: "#10B981",
        fontSize: 12,
        fontWeight: "600",
    },
    orderAmount: {
        fontSize: 17,
        fontWeight: "700",
        color: "#D91339",
        marginTop: 6,
    },
    subText: {
        color: "#777",
        fontSize: 13,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    infoLabel: {
        color: "#777",
        fontSize: 14,
    },
    infoValue: {
        color: "#111",
        fontSize: 14,
        fontWeight: "600",
    },
    address: {
        color: "#333",
        marginTop: 4,
        lineHeight: 20,
    },
    timelineItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    timelineDot: {
        width: 10,
        height: 10,
        backgroundColor: "#3B82F6",
        borderRadius: 10,
        marginRight: 10,
    },
    timelineText: {
        fontSize: 14,
        color: "#333",
    },
    helpBtn: {
        backgroundColor: "#D91339",
        marginHorizontal: 15,
        borderRadius: 25,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginBottom: 40,
    },
    helpText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
},

    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 15,
        color: "#111",
    },

    emptyMessage: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 8,
        lineHeight: 20,
    },

    emptyBtn: {
        marginTop: 20,
        backgroundColor: "#D91339",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },

    emptyBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },

});