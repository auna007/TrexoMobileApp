import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const Addresses = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: "", details: "", phone: "" });

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            label: "Home",
            details: "24 Freedom Street, Ikeja, Lagos",
            phone: "+234 810 555 9000",
            isDefault: true,
        },
        {
            id: 2,
            label: "Work",
            details: "Plot 5, Admiralty Way, Lekki Phase 1, Lagos",
            phone: "+234 810 222 1200",
            isDefault: false,
        },
    ]);

    const addAddress = () => {
        if (!newAddress.label || !newAddress.details || !newAddress.phone) return;

        const newEntry = {
            ...newAddress,
            id: addresses.length + 1,
            isDefault: addresses.length === 0,
        };
        setAddresses([...addresses, newEntry]);
        setNewAddress({ label: "", details: "", phone: "" });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>My Addresses</Text>

                {addresses.map((addr) => (
                    <View key={addr.id} style={styles.addressCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardLabel}>{addr.label}</Text>
                            {addr.isDefault && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.cardDetails}>{addr.details}</Text>
                        <Text style={styles.cardPhone}>{addr.phone}</Text>

                        <View style={styles.cardActions}>
                            <TouchableOpacity>
                                <Feather name="edit" size={20} color="#555" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather name="trash-2" size={20} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add-circle-outline" size={22} color="#fff" />
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Add New Address</Text>

                                <Text style={styles.inputLabel}>Label</Text>
                                <TextInput
                                    placeholder="Home, Work, etc."
                                    style={styles.input}
                                    value={newAddress.label}
                                    onChangeText={(text) =>
                                        setNewAddress({ ...newAddress, label: text })
                                    }
                                />

                                <Text style={styles.inputLabel}>Address Details</Text>
                                <TextInput
                                    placeholder="Street, City, State"
                                    style={styles.input}
                                    value={newAddress.details}
                                    onChangeText={(text) =>
                                        setNewAddress({ ...newAddress, details: text })
                                    }
                                />

                                <Text style={styles.inputLabel}>Phone Number</Text>
                                <TextInput
                                    placeholder="+234 810 123 4567"
                                    style={styles.input}
                                    value={newAddress.phone}
                                    onChangeText={(text) =>
                                        setNewAddress({ ...newAddress, phone: text })
                                    }
                                    keyboardType="phone-pad"
                                />

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.modalBtn, { backgroundColor: "#D91339" }]}
                                        onPress={addAddress}
                                    >
                                        <Text style={styles.modalBtnText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalBtn, { backgroundColor: "#777" }]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.modalBtnText}>Cancel</Text>
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
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingTop: 40,
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 12,
    },
    addressCard: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: "600",
    },
    defaultBadge: {
        backgroundColor: "#D91339",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    defaultBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    cardDetails: {
        marginTop: 6,
        fontSize: 15,
        color: "#555",
    },
    cardPhone: {
        marginTop: 4,
        fontSize: 14,
        color: "#777",
    },
    cardActions: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "flex-end",
        gap: 18,
    },
    addButton: {
        backgroundColor: "#D91339",
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    inputLabel: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    modalBtnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default Addresses;