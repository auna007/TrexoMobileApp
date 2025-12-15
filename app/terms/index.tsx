import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedView from "../components/ThemedView";

const termsText = [
    {
        heading: "Introduction",
        content: "Welcome to TrexoExpress — your trusted logistics, delivery, and shipping partner. By using the TrexoExpress website or any of our services, you accept these Terms & Conditions. If you do not agree with any section, please stop using our services immediately. TrexoExpress may update these Terms occasionally. Any changes will be posted on our website, and continuing to use our services means you accept the updated version.",
        icon: "info"
    },
    {
        heading: "About TrexoExpress Services",
        content: "TrexoExpress offers logistics, delivery, warehousing, pickup, and shipment management solutions. Our platform helps individuals and businesses send, track, and manage shipments seamlessly. We work to ensure service accuracy and smooth operations, but errors or interruptions may occasionally occur. When they do, TrexoExpress will correct them promptly without obligation to give prior notice.",
        icon: "inventory"
    },
    {
        heading: "User Accounts",
        content: "To access certain TrexoExpress features, you may need to create an account. By creating an account, you agree that all information you provide is true and up-to-date, you will secure your login details, you will not share your account with anyone, and you are responsible for all activities carried out under your account. TrexoExpress may suspend or close accounts that violate our Terms.",
        icon: "person"
    },
    {
        heading: "Acceptable Use",
        content: "You agree to use TrexoExpress services only for lawful purposes. You must NOT violate any Nigerian laws or international shipping regulations, attempt to hack or disrupt our systems, upload harmful or illegal content, or misuse the platform in any way. TrexoExpress may take action, including suspension or legal enforcement, against misuse of our systems.",
        icon: "security"
    },
    {
        heading: "Shipments, Orders & Payments",
        content: "Placing a shipment, booking a pickup, or making a delivery request counts as an order. TrexoExpress may decline or cancel an order if the shipment violates our prohibited items policy, payment is incomplete or invalid, there are errors in pricing or service details, or the service is unavailable at your location. All prices are listed on the TrexoExpress website or communicated through our agents and may change without prior notice. You agree to provide accurate shipment details, pay all required fees, and follow TrexoExpress packaging and safety guidelines.",
        icon: "payment"
    },
    {
        heading: "Delivery, Handling & Delays",
        content: "TrexoExpress works to deliver shipments within the communicated timeframe; however, delivery times are estimates and may vary due to traffic, weather, customs clearance, or third-party carrier delays. TrexoExpress is not liable for delays caused by factors beyond our control. If a shipment cannot be delivered due to an incorrect address or unavailability of the receiver, TrexoExpress will contact you to arrange redelivery or pickup.",
        icon: "local-shipping"
    },
    {
        heading: "Returns, Claims & Refunds",
        content: "You may request a return, refund, or claim in line with TrexoExpress policies. Refunds may be declined if shipment details were incorrect, the customer failed to follow packaging guidelines, damage occurred due to customer negligence, or the request is made outside the allowed timeframe. Refunds are processed through the original payment method unless otherwise stated.",
        icon: "assignment-return"
    },
    {
        heading: "Prohibited Items",
        content: "TrexoExpress does NOT accept items restricted by Nigerian law or logistics regulation. Examples include weapons, explosives, illegal drugs, counterfeit items, highly perishable goods without proper packaging, and cash exceeding regulated limits. Shipping such items may lead to account suspension or legal consequences.",
        icon: "block"
    },
    {
        heading: "Intellectual Property",
        content: "All TrexoExpress branding, logos, website content, designs, and images belong to TrexoExpress. You may not reproduce or use them without permission. Viewing, downloading, or printing website content is allowed only for personal use.",
        icon: "copyright"
    },
    {
        heading: "Third-Party Services",
        content: "TrexoExpress may work with partner carriers, transport companies, and logistics providers. We are not responsible for their actions, website content, or delays caused by their operations. Using partner services is at your discretion.",
        icon: "people"
    },
    {
        heading: "Liability Limitations",
        content: "TrexoExpress is not responsible for losses resulting from improper use of our services, business losses or lost profits, delays caused by external factors, or loss of data or unauthorized access caused by user negligence. Services are provided “as available” with no guarantee of uninterrupted operation.",
        icon: "warning"
    },
    {
        heading: "Account Termination",
        content: "TrexoExpress may suspend or terminate your account if you violate our Terms or engage in fraudulent or harmful activities. You may close your account at any time by contacting TrexoExpress support.",
        icon: "cancel"
    },
    {
        heading: "Governing Law",
        content: "These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be resolved under Nigerian legal jurisdiction.",
        icon: "gavel"
    },
    {
        heading: "Contact Information",
        content: "For questions, support, or complaints, contact TrexoExpress via the contact channels listed on our website.",
        icon: "support-agent"
    }
];

const TermsAndConditions = () => {
    const router = useRouter();

    return (
        <ThemedView>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="#D91339" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>TrexoExpress Terms & Conditions</Text>

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

                <Text style={styles.footerText}>© 2025 TrexoExpress. All rights reserved.</Text>
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
        marginBottom: 30,
        textAlign: "center",
        fontSize: 13,
        color: "#999",
    },
});

export default TermsAndConditions;