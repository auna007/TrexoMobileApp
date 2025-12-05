import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const Support = () => {
    const faqs = [
        {
            question: "How can I track my order?",
            answer: "Go to 'My Orders' and select the order you want to track. You will see the current status and tracking info.",
        },
        {
            question: "How do I request a refund?",
            answer: "Go to 'Returns & Cancellations' in your orders section and follow the prompts to request a refund.",
        },
        {
            question: "Can I change my delivery address?",
            answer: "Yes, go to 'My Addresses' and edit or add a new address before placing your order.",
        },
    ];

    const handleEmailPress = () => {
        Linking.openURL("mailto:support@trexo.com");
    };

    const handleCallPress = () => {
        Linking.openURL("tel:+2348105559000");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Support Center</Text>

            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Contact Us</Text>
                <TouchableOpacity style={styles.contactOption} onPress={handleEmailPress}>
                    <Feather name="mail" size={20} color="#D91339" />
                    <Text style={styles.contactText}>support@trexo.com</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactOption} onPress={handleCallPress}>
                    <Feather name="phone" size={20} color="#D91339" />
                    <Text style={styles.contactText}>+234 810 555 9000</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.faqCard}>
                <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                {faqs.map((faq, index) => (
                    <View key={index} style={styles.faqItem}>
                        <View style={styles.questionRow}>
                            <Ionicons name="help-circle-outline" size={20} color="#D91339" />
                            <Text style={styles.question}>{faq.question}</Text>
                        </View>
                        <Text style={styles.answer}>{faq.answer}</Text>
                    </View>
                ))}
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#f8f8f8",
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 20,
    },
    contactCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 12,
    },
    contactOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    contactText: {
        marginLeft: 10,
        fontSize: 15,
        color: "#555",
    },
    faqCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    faqTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 12,
    },
    faqItem: {
        marginBottom: 15,
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    question: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },
    answer: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
        paddingLeft: 28,
    },
});

export default Support;