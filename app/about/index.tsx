import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../components/ThemedView";

const About = () => {
    return (
        <ThemedView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="information-circle-outline" size={60} color="#D91339" />
                    <Text style={styles.appName}>Trexo</Text>
                    <Text style={styles.version}>Version 1.0.0</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About Trexo</Text>
                    <Text style={styles.sectionText}>
                        Trexo is a cutting-edge e-commerce platform designed to simplify
                        your shopping experience. Discover a wide range of products, track
                        your orders, and manage your account seamlessly, all in one place.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Mission</Text>
                    <Text style={styles.sectionText}>
                        Our mission is to provide a fast, reliable, and enjoyable
                        shopping experience while prioritizing customer satisfaction
                        and convenience.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.sectionText}>
                        Email: support@trexo.com{"\n"}
                        Phone: +234 810 555 9000{"\n"}
                        Address: 24 Freedom Street, Ikeja, Lagos
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Follow Us</Text>
                    <Text style={styles.sectionText}>
                        Stay connected with us on social media for updates, offers, and more.
                    </Text>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f8f8",
        paddingBottom: 40,
        flexGrow: 1,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    appName: {
        fontSize: 28,
        fontWeight: "700",
        color: "#D91339",
        marginTop: 12,
    },
    version: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    section: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
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
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
});

export default About;