import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ThemedView from "../components/ThemedView";

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

type ChatMessage = {
    id: number;
    text: string;
    sender: "user" | "support";
};

const Support = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState("");
    const [chatVisible, setChatVisible] = useState(false);
    const scrollRef = useRef<ScrollView>(null);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now(),
            text: inputText,
            sender: "user",
        };
        setChatMessages((prev) => [...prev, userMsg]);
        setInputText("");

        setTimeout(() => {
            const supportMsg: ChatMessage = {
                id: Date.now() + 1,
                text: "Thanks for reaching out! Our support team will get back to you shortly.",
                sender: "support",
            };
            setChatMessages((prev) => [...prev, supportMsg]);
        }, 1000);
    };

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [chatMessages, chatVisible]);

    return (
        <ThemedView>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: "#f8f8f8" }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    ref={scrollRef}
                >
                    <Text style={styles.title}>Support Center</Text>

                    <View style={styles.contactCard}>
                        <Text style={styles.contactTitle}>Contact Us</Text>
                        <TouchableOpacity style={styles.contactOption} onPress={() => {}}>
                            <Feather name="mail" size={20} color="#D91339" />
                            <Text style={styles.contactText}>support@trexo.com</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactOption} onPress={() => {}}>
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
                </ScrollView>

                {chatVisible && (
                    <View style={styles.chatContainer}>
                        <Text style={styles.chatTitle}>Live Chat</Text>
                        <ScrollView
                            style={styles.chatMessages}
                            ref={scrollRef}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            {chatMessages.length === 0 && (
                                <Text style={styles.chatHint}>Start typing below to chat with support...</Text>
                            )}
                            {chatMessages.map((msg) => (
                                <View
                                    key={msg.id}
                                    style={[
                                        styles.chatMessage,
                                        msg.sender === "user" ? styles.userMsg : styles.supportMsg,
                                    ]}
                                >
                                    <Text style={[styles.chatText, msg.sender === "support" && { color: "#111" }]}>{msg.text}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type your message..."
                                placeholderTextColor="#9CA3AF"
                                value={inputText}
                                onChangeText={setInputText}
                            />
                            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                                <Feather name="send" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.floatingBtn}
                    onPress={() => setChatVisible(!chatVisible)}
                >
                    <Feather name="message-circle" size={28} color="#fff" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 20,
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
        marginBottom: 20,
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
    floatingBtn: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#D91339",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    chatContainer: {
        position: "absolute",
        bottom: 90,
        right: 20,
        left: 20,
        height: 400,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 6,
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 12,
    },
    chatMessages: {
        flex: 1,
        marginBottom: 10,
    },
    chatHint: {
        fontSize: 14,
        color: "#999",
        fontStyle: "italic",
        marginBottom: 10,
    },
    chatMessage: {
        padding: 10,
        borderRadius: 12,
        marginBottom: 8,
        maxWidth: "80%",
    },
    userMsg: {
        backgroundColor: "#D91339",
        alignSelf: "flex-end",
    },
    supportMsg: {
        backgroundColor: "#f2f2f2",
        alignSelf: "flex-start",
    },
    chatText: {
        color: "#fff",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        fontSize: 15,
        color: "#111",
        marginRight: 10,
    },
    sendBtn: {
        backgroundColor: "#D91339",
        padding: 12,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Support;