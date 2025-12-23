import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../components/ThemedView";

const Notifications = () => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [promotions, setPromotions] = useState(false);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    return (
        <ThemedView>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Notifications</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>

                    <View style={styles.option}>
                        <View style={styles.labelContainer}>
                            <Ionicons name="notifications-outline" size={22} color="#D91339" />
                            <Text style={styles.optionText}>Push Notifications</Text>
                        </View>
                        <Switch
                            value={pushEnabled}
                            onValueChange={setPushEnabled}
                            trackColor={{ true: "#D91339", false: "#ccc" }}
                            thumbColor={pushEnabled ? "#fff" : "#eee"}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Orders</Text>

                    <View style={styles.option}>
                        <View style={styles.labelContainer}>
                            <Ionicons name="bag-outline" size={22} color="#D91339" />
                            <Text style={styles.optionText}>Order Updates</Text>
                        </View>
                        <Switch
                            value={orderUpdates}
                            onValueChange={setOrderUpdates}
                            trackColor={{ true: "#D91339", false: "#ccc" }}
                            thumbColor={orderUpdates ? "#fff" : "#eee"}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Promotions</Text>

                    <View style={styles.option}>
                        <View style={styles.labelContainer}>
                            <Ionicons name="gift-outline" size={22} color="#D91339" />
                            <Text style={styles.optionText}>Discounts & Offers</Text>
                        </View>
                        <Switch
                            value={promotions}
                            onValueChange={setPromotions}
                            trackColor={{ true: "#D91339", false: "#ccc" }}
                            thumbColor={promotions ? "#fff" : "#eee"}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security Alerts</Text>

                    <View style={styles.option}>
                        <View style={styles.labelContainer}>
                            <Ionicons name="shield-checkmark-outline" size={22} color="#D91339" />
                            <Text style={styles.optionText}>Login Alerts</Text>
                        </View>
                        <Switch
                            value={securityAlerts}
                            onValueChange={setSecurityAlerts}
                            trackColor={{ true: "#D91339", false: "#ccc" }}
                            thumbColor={securityAlerts ? "#fff" : "#eee"}
                        />
                    </View>

                    <View style={styles.hintBox}>
                        <Ionicons name="information-circle-outline" size={18} color="#555" />
                        <Text style={styles.hintText}>
                            Security alerts help protect your account by notifying you of unusual
                            activity.
                        </Text>
                    </View>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 18,
        paddingTop: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        color: "#111",
        marginBottom: 25,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 10,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    optionText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
    hintBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 12,
    },
    hintText: {
        flex: 1,
        color: "#444",
        fontSize: 13,
        lineHeight: 18,
    },
});

export default Notifications;