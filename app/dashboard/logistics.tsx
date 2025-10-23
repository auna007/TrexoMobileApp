import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Logistics = () => {
    const [activeTab, setActiveTab] = useState<"local" | "foreign">("local");

    const localData = [
        {
            id: 1,
            customer: "Jane Doe",
            phone: "08123456789",
            trexoId: "TXL-00123",
            externalId: "DHL-77632",
            warehouse: "Lagos",
            type: "Express",
            status: "In Transit",
            payment: "Paid",
            date: "Oct 20, 2025",
        },
        {
            id: 2,
            customer: "John Smith",
            phone: "07098765432",
            trexoId: "TXL-00124",
            externalId: "GIG-34211",
            warehouse: "Abuja",
            type: "Standard",
            status: "Delivered",
            payment: "Paid",
            date: "Oct 18, 2025",
        },
    ];

    const foreignData = [
        {
            id: 1,
            customer: "Alice Brown",
            phone: "09055667788",
            trexoId: "TXF-00901",
            externalId: "UPS-123456",
            warehouse: "Houston, USA",
            type: "Air Freight",
            status: "Pending",
            payment: "Unpaid",
            date: "Oct 22, 2025",
        },
        {
            id: 2,
            customer: "Michael Lee",
            phone: "08122334455",
            trexoId: "TXF-00902",
            externalId: "FedEx-77889",
            warehouse: "London, UK",
            type: "Sea Freight",
            status: "In Transit",
            payment: "Paid",
            date: "Oct 19, 2025",
        },
    ];

    const tableHeaders = [
        "Customer",
        "Phone",
        "Trexo Tracking ID",
        "External Tracking ID",
        "Warehouse",
        "Shipping Type",
        "Status",
        "Payment",
        "Date",
    ];

    const currentData = activeTab === "local" ? localData : foreignData;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Trexo Logistics 🚚</Text>
                <TouchableOpacity style={styles.refreshBtn}>
                    <Ionicons name="refresh" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "local" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("local")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "local" && styles.activeTabText,
                        ]}
                    >
                        Local Logistics
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "foreign" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("foreign")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "foreign" && styles.activeTabText,
                        ]}
                    >
                        Foreign Logistics
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={[styles.tableRow, styles.tableHeaderRow]}>
                        {tableHeaders.map((header, index) => (
                            <Text key={index} style={[styles.cell, styles.headerCell]}>
                                {header}
                            </Text>
                        ))}
                    </View>

                    {currentData.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.cell}>{item.customer}</Text>
                            <Text style={styles.cell}>{item.phone}</Text>
                            <Text style={styles.cell}>{item.trexoId}</Text>
                            <Text style={styles.cell}>{item.externalId}</Text>
                            <Text style={styles.cell}>{item.warehouse}</Text>
                            <Text style={styles.cell}>{item.type}</Text>
                            <Text
                                style={[
                                    styles.cell,
                                    item.status === "Delivered"
                                        ? styles.statusDelivered
                                        : item.status === "Pending"
                                        ? styles.statusPending
                                        : styles.statusInTransit,
                                ]}
                            >
                                {item.status}
                            </Text>
                            <Text
                                style={[
                                    styles.cell,
                                    item.payment === "Paid"
                                        ? styles.paid
                                        : styles.unpaid,
                                ]}
                            >
                                {item.payment}
                            </Text>
                            <Text style={styles.cell}>{item.date}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#D91339",
    },
    refreshBtn: {
        backgroundColor: "#D91339",
        padding: 8,
        borderRadius: 8,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 25,
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#D91339",
    },
    tabText: {
        fontSize: 14,
        color: "#555",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "700",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 10,
        alignItems: "center",
    },
    tableHeaderRow: {
        backgroundColor: "#fff5f5",
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    cell: {
        minWidth: 120,
        textAlign: "center",
        color: "#333",
        fontSize: 13,
    },
    headerCell: {
        fontWeight: "700",
        color: "#D91339",
    },
    statusDelivered: {
        color: "green",
        fontWeight: "600",
    },
    statusPending: {
        color: "#FFB300",
        fontWeight: "600",
    },
    statusInTransit: {
        color: "#1E90FF",
        fontWeight: "600",
    },
    paid: {
        color: "green",
        fontWeight: "600",
    },
    unpaid: {
        color: "red",
        fontWeight: "600",
    },
});

export default Logistics;