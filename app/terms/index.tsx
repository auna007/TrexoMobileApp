import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const termsText = [
    {
        heading: "Introduction",
        content: "Welcome to our app. By using our services, you agree to comply with these Terms and Conditions. Please read them carefully.",
        icon: "info"
    },
    {
        heading: "Use of the App",
        content: "You must use the app in accordance with applicable laws and regulations. Do not misuse the app, including hacking, reverse engineering, or violating user privacy.",
        icon: "security"
    },
    {
        heading: "User Accounts",
        content: "If you create an account, you are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account.",
        icon: "person"
    },
    {
        heading: "Content",
        content: "All content provided in the app, including text, images, and media, is for informational purposes only. You may not copy, distribute, or modify any content without permission.",
        icon: "description"
    },
    {
        heading: "Limitation of Liability",
        content: "We are not liable for any damages or losses arising from your use of the app. Use it at your own risk.",
        icon: "warning"
    },
    {
        heading: "Changes to Terms",
        content: "We may update these Terms and Conditions from time to time. Continued use of the app constitutes acceptance of the updated terms.",
        icon: "update"
    },
    {
        heading: "Contact Us",
        content: "If you have any questions about these Terms, please contact our support team through the app.",
        icon: "support-agent"
    }
];

const TermsAndConditions = () => {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={20} color="#D91339" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Terms and Conditions</Text>

            {termsText.map((section, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.headingRow}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name={section.icon as any} size={24} color="#D91339" />
                        </View>
                        <Text style={styles.heading}>{section.heading}</Text>
                    </View>
                    <Text style={styles.content}>{section.content}</Text>
                </View>
            ))}

            <Text style={styles.footerText}>© 2025 YourApp. All rights reserved.</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
    },
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    backText: {
        fontSize: 16,
        color: "#D91339",
        fontWeight: "600",
        marginLeft: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
        marginBottom: 25,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#ffe8eb",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#D91339",
        flexShrink: 1,
    },
    content: {
        fontSize: 15,
        color: "#444",
        lineHeight: 22,
        marginTop: 4,
    },
    footerText: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 13,
        color: "#999",
    },
});

export default TermsAndConditions;