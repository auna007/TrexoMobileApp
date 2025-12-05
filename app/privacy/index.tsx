import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Privacy = () => {
    const [locationAccess, setLocationAccess] = useState(true);
    const [personalizedAds, setPersonalizedAds] = useState(false);
    const [dataCollection, setDataCollection] = useState(true);
    const [searchHistory, setSearchHistory] = useState(true);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Privacy</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Permissions</Text>

                <View style={styles.option}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="location-outline" size={22} color="#D91339" />
                        <Text style={styles.optionText}>Location Access</Text>
                    </View>
                    <Switch
                        value={locationAccess}
                        onValueChange={setLocationAccess}
                        trackColor={{ true: "#D91339", false: "#ccc" }}
                        thumbColor={locationAccess ? "#fff" : "#eee"}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Data & Personalization</Text>

                <View style={styles.option}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="person-circle-outline" size={22} color="#D91339" />
                        <Text style={styles.optionText}>Personalized Ads</Text>
                    </View>
                    <Switch
                        value={personalizedAds}
                        onValueChange={setPersonalizedAds}
                        trackColor={{ true: "#D91339", false: "#ccc" }}
                        thumbColor={personalizedAds ? "#fff" : "#eee"}
                    />
                </View>

                <View style={styles.option}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="document-text-outline" size={22} color="#D91339" />
                        <Text style={styles.optionText}>Allow Data Collection</Text>
                    </View>
                    <Switch
                        value={dataCollection}
                        onValueChange={setDataCollection}
                        trackColor={{ true: "#D91339", false: "#ccc" }}
                        thumbColor={dataCollection ? "#fff" : "#eee"}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Search & Browsing</Text>

                <View style={styles.option}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="search-outline" size={22} color="#D91339" />
                        <Text style={styles.optionText}>Save Search History</Text>
                    </View>
                    <Switch
                        value={searchHistory}
                        onValueChange={setSearchHistory}
                        trackColor={{ true: "#D91339", false: "#ccc" }}
                        thumbColor={searchHistory ? "#fff" : "#eee"}
                    />
                </View>
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={22} color="#555" />
                <Text style={styles.infoText}>
                    You can manage how your data is collected and used. Disabling certain settings may
                    affect your personalized experience.
                </Text>
            </View>

            <View style={{ height: 80 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 18,
        paddingTop: 55,
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
    infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        marginBottom: 30,
    },
    infoText: {
        flex: 1,
        color: "#444",
        fontSize: 14,
        lineHeight: 20,
    },
});

export default Privacy;