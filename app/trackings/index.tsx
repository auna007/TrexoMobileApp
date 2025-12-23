import React, { useState } from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import ThemedView from "../components/ThemedView";

type Tab = "Package" | "Location" | "Order";

type LocationHistoryItem = { id: string; status: string; time: string };
type TrackingData = {
    packageInfo: { [key: string]: string };
    currentLocation: { [key: string]: string };
    userInfo: { [key: string]: string };
    orderInfo: { [key: string]: string };
    shippingDetails: { [key: string]: string };
    paymentInfo: { [key: string]: string };
    orderItems: { [key: string]: string }[];
    shippingAddress: { [key: string]: string };
    locationHistory: LocationHistoryItem[];
};

const TRACKING_DB: { [key: string]: TrackingData } = {
    "TRX_0001": {
        packageInfo: {
            "Tracking Number": "TRX_0001",
            "External Number": "N/A",
            "Type": "International",
            "Status": "Pending Delivery",
            "Weight": "N/A kg",
            "Size": "N/A cmb³",
            "Amount": "$0.00",
        },
        currentLocation: {
            "Shipping": "N/A",
            "Current Location": "N/A",
            "Warehouse": "N/A",
            "Warehouse Location": "N/A",
        },
        userInfo: {
            "User": "Miss Karlee Mohr",
            "Phone": "2727838332",
            "Goods From": "N/A",
            "Recent Activity": "Created: Dec 13, 2025, 06:42 PM | Last Updated: Dec 13, 2025, 06:42 PM",
        },
        orderInfo: {
            "Order #": "5JKNTDJXBW",
            "Date": "Dec 13, 2025, 06:42 PM",
            "Status": "Completed",
        },
        shippingDetails: {
            "Name": "Miss Karlee Mohr",
            "Phone": "2727838332",
            "Method": "Sea Cargo",
        },
        paymentInfo: {
            "Total": "NGN 91,264.00",
            "Method": "Paystack",
            "Items": "01 items",
        },
        orderItems: [
            {
                "Item": "New Design Crystal Chandelier Modern Holiday Hotel Lobby Corridor Decoration Lighting Club Pub Ceiling Crystal Pendant Lamp",
                "SKU": "144",
                "Price": "NGN 91,264.00 x 1",
                "Total": "NGN 91,264.00",
            },
        ],
        shippingAddress: {
            "Address": "No 15 Zannar Bukar Dipcharima Road, Old GRA, Maiduguri, Borno State, Nigeria",
            "City": "Maduguri",
            "Postal Code": "600211",
            "Country": "Nigeria",
        },
        locationHistory: [
            { id: "1", status: "Order Created", time: "Dec 13, 2025, 06:42 PM" },
            { id: "2", status: "In Transit", time: "Dec 14, 2025, 10:30 AM" },
            { id: "3", status: "Arrived at Warehouse", time: "Dec 15, 2025, 02:15 PM" },
        ],
    },
};

const Tracking = () => {
    const [trackingId, setTrackingId] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("Package");
    const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

    const handleTrack = () => {
        Keyboard.dismiss();
        if (!trackingId) return;
        const data = TRACKING_DB[trackingId];
        setTrackingData(data || null);
        if (!data) Alert.alert("Tracking ID not found");
        setActiveTab("Package");
    };

    const renderLocationItem = (item: LocationHistoryItem) => (
        <View style={styles.locationRow} key={item.id}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#D91339" />
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.locationStatus}>{item.status}</Text>
                <Text style={styles.locationTime}>{item.time}</Text>
            </View>
        </View>
    );

    const renderCard = (title: string, data: { [key: string]: string }) => (
        <View style={styles.card} key={title}>
            <View style={styles.cardRow}>
                <MaterialIcons name="inventory" size={24} color="#D91339" />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            {Object.keys(data).map((key) => (
                <View style={styles.cardItem} key={key}>
                    <Text style={styles.label}>{key}:</Text>
                    <Text style={styles.value}>{data[key]}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <ThemedView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
                    <Text style={styles.title}>Track Your Package</Text>

                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <TextInput
                            style={styles.trackingInput}
                            placeholder="Enter Tracking ID"
                            value={trackingId}
                            onChangeText={setTrackingId}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.trackBtn} onPress={handleTrack}>
                            <Text style={styles.trackBtnText}>Track Package</Text>
                        </TouchableOpacity>
                    </View>

                    {trackingData && (
                        <>
                            <View style={styles.header}>
                                <View>
                                    <Text style={styles.trackingNumber}>Tracking #{trackingId}</Text>
                                    <Text style={styles.lastUpdated}>
                                        Last updated: {trackingData.locationHistory[trackingData.locationHistory.length - 1].time}
                                    </Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <Ionicons name="time-outline" size={24} color="#fff" />
                                    <Text style={styles.statusText}>{trackingData.packageInfo["Status"]}</Text>
                                </View>
                            </View>

                            <View style={styles.tabRow}>
                                {["Package Details", "Location History", "Order Details"].map((tabLabel, idx) => {
                                    const tab: Tab = idx === 0 ? "Package" : idx === 1 ? "Location" : "Order";
                                    const isActive = activeTab === tab;
                                    return (
                                        <TouchableOpacity
                                            key={tabLabel}
                                            style={[styles.tabBtn, isActive && styles.activeTabBtn]}
                                            onPress={() => setActiveTab(tab)}
                                        >
                                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                                {tabLabel}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <ScrollView
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                keyboardShouldPersistTaps="handled"
                            >
                                {activeTab === "Package" && (
                                    <>
                                        {renderCard("Package Information", trackingData.packageInfo)}
                                        {renderCard("Current Location", trackingData.currentLocation)}
                                        {renderCard("User Information", trackingData.userInfo)}
                                    </>
                                )}

                                {activeTab === "Order" && (
                                    <>
                                        {renderCard("Order Information", trackingData.orderInfo)}
                                        {renderCard("Shipping Details", trackingData.shippingDetails)}
                                        {renderCard("Payment Information", trackingData.paymentInfo)}
                                        {trackingData.orderItems.map((item, idx) => (
                                            <View style={styles.card} key={idx}>
                                                <View style={styles.cardRow}>
                                                    <Ionicons name="cube-outline" size={24} color="#D91339" />
                                                    <Text style={styles.cardTitle}>Order Item {idx + 1}</Text>
                                                </View>
                                                {Object.keys(item).map((key) => (
                                                    <View style={styles.cardItem} key={key}>
                                                        <Text style={styles.label}>{key}:</Text>
                                                        <Text style={styles.value}>{item[key]}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                        {renderCard("Shipping Address", trackingData.shippingAddress)}
                                    </>
                                )}

                                {activeTab === "Location" && (
                                    <>
                                        {trackingData.locationHistory.map(renderLocationItem)}
                                    </>
                                )}
                            </ScrollView>
                        </>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 22, fontWeight: "700", marginBottom: 15, textAlign: "center", color: "#D91339" },
    trackingInput: { flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 12, fontSize: 16, borderColor: "#d9d9d9", borderWidth: 1 },
    trackBtn: { marginLeft: 10, backgroundColor: "#D91339", paddingHorizontal: 20, borderRadius: 12, justifyContent: "center" },
    trackBtnText: { color: "#fff", fontWeight: "600" },
    header: { backgroundColor: "#D91339", padding: 20, borderRadius: 12, marginBottom: 15 },
    trackingNumber: { color: "#fff", fontWeight: "700", fontSize: 16 },
    lastUpdated: { color: "#fff", marginTop: 4 },
    statusContainer: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 8 },
    statusText: { color: "#fff", fontWeight: "600" },
    tabRow: { flexDirection: "row", marginBottom: 15, justifyContent: "space-between" },
    tabBtn: { flex: 1, paddingVertical: 10, backgroundColor: "#fff", borderRadius: 8, marginHorizontal: 4, alignItems: "center" },
    activeTabBtn: { backgroundColor: "#D91339" },
    tabText: { color: "#333", fontWeight: "600" },
    activeTabText: { color: "#fff" },
    card: { backgroundColor: "#fff", borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },
    cardRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 },
    cardTitle: { fontWeight: "700", fontSize: 16, color: "#111" },
    cardItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
    label: { fontWeight: "500", color: "#555", flex: 1 },
    value: { fontWeight: "600", color: "#111", flex: 1, textAlign: "right" },
    locationRow: { flexDirection: "row", alignItems: "flex-start", backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10 },
    locationStatus: { fontWeight: "600", color: "#111" },
    locationTime: { color: "#666", fontSize: 12 },
});

export default Tracking;