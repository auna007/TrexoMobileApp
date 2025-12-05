import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const PaymentMethods = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newCard, setNewCard] = useState({ type: "", number: "", expiry: "", cvv: "", holder: "" });

    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: "Visa", number: "1234", expiry: "08/26", holder: "Ayomide Johnson", isDefault: true },
        { id: 2, type: "MasterCard", number: "5678", expiry: "12/25", holder: "Ayomide Johnson", isDefault: false },
    ]);

    const addCard = () => {
        if (!newCard.type || !newCard.number || !newCard.expiry || !newCard.cvv || !newCard.holder) return;

        const newEntry = {
            ...newCard,
            id: paymentMethods.length + 1,
            isDefault: paymentMethods.length === 0,
        };
        setPaymentMethods([...paymentMethods, newEntry]);
        setNewCard({ type: "", number: "", expiry: "", cvv: "", holder: "" });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Payment Methods</Text>

                {paymentMethods.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{card.type} **** {card.number}</Text>
                            {card.isDefault && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.cardHolder}>Card Holder: {card.holder}</Text>
                        <Text style={styles.expiry}>Expiry: {card.expiry}</Text>

                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.editBtn}>
                                <Feather name="edit" size={16} color="#fff" />
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteBtn}>
                                <Feather name="trash-2" size={16} color="#D91339" />
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle-outline" size={22} color="#fff" />
                    <Text style={styles.addButtonText}>Add New Card</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Add New Payment Method</Text>
                                <Text style={styles.modalSubtitle}>
                                    Enter your card details below. All fields are required.
                                </Text>

                                <Text style={styles.label}>Card Type</Text>
                                <TextInput
                                    placeholder="Visa, MasterCard"
                                    style={styles.input}
                                    value={newCard.type}
                                    onChangeText={(text) => setNewCard({ ...newCard, type: text })}
                                />

                                <Text style={styles.label}>Card Number</Text>
                                <TextInput
                                    placeholder="1234 5678 9012 3456"
                                    style={styles.input}
                                    value={newCard.number}
                                    onChangeText={(text) => setNewCard({ ...newCard, number: text })}
                                    keyboardType="number-pad"
                                />

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Expiry Date</Text>
                                        <TextInput
                                            placeholder="MM/YY"
                                            style={styles.input}
                                            value={newCard.expiry}
                                            onChangeText={(text) => setNewCard({ ...newCard, expiry: text })}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>CVV</Text>
                                        <TextInput
                                            placeholder="123"
                                            style={styles.input}
                                            value={newCard.cvv}
                                            onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                </View>

                                <Text style={styles.label}>Card Holder Name</Text>
                                <TextInput
                                    placeholder="John Doe"
                                    style={styles.input}
                                    value={newCard.holder}
                                    onChangeText={(text) => setNewCard({ ...newCard, holder: text })}
                                />

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.modalBtn, { backgroundColor: "#D91339" }]}
                                        onPress={addCard}
                                    >
                                        <Text style={styles.modalBtnText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={[styles.modalBtnText, { color: "#333" }]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8", paddingTop: 50 },
    scrollContainer: { padding: 20 },
    title: { fontSize: 26, fontWeight: "700", color: "#D91339", marginBottom: 20 },
    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 0.5,
        borderColor: "#eee",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111"
    },
    defaultBadge: {
        backgroundColor: "#D91339",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10
    },
    defaultBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600"
    },
    cardHolder: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4
    },
    expiry: {
        fontSize: 14,
        color: "#777"
    },
    cardActions: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "flex-end",
        gap: 10
    },
    editBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D91339",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6
    },
    editText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14
    },
    deleteBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D91339",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6
    },
    deleteText: {
        color: "#D91339",
        fontWeight: "600",
        fontSize: 14
    },
    addButton: {
        backgroundColor: "#D91339",
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center" 
    },
    modalSubtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontSize: 14,
        color: "#555",
        fontWeight: "600",
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5
    },
    modalBtnText: {
        color: "#fff",
        fontWeight: "600"
    },
});

export default PaymentMethods;