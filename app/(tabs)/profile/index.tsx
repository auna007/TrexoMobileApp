import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({
        name: "Ayomide Johnson",
        email: "ayomide.johnson@example.com",
    });

    const [editData, setEditData] = useState({ ...user });

    const handleSave = () => {
        if (!editData.name || !editData.email) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        setUser(editData);
        setModalVisible(false);
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                onPress: () => router.replace("/login"),
            },
        ]);
    };

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle-outline" size={70} color="#D91339" />
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
                    <Feather name="edit-3" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Account</Text>
                <TouchableOpacity style={styles.option} onPress={() => router.push("/orders")}>
                    <Ionicons name="bag-outline" size={20} color="#D91339" />
                    <Text style={styles.optionText}>My Orders</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/wishlist")}>
                    <MaterialIcons name="favorite-border" size={20} color="#D91339" />
                    <Text style={styles.optionText}>Wishlist</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/addresses")}>
                    <Ionicons name="location-outline" size={20} color="#D91339" />
                    <Text style={styles.optionText}>My Addresses</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/payment")}>
                    <FontAwesome5 name="wallet" size={18} color="#D91339" />
                    <Text style={styles.optionText}>Payment Methods</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <TouchableOpacity style={styles.option} onPress={() => router.push("/notifications")}>
                    <Ionicons name="notifications-outline" size={20} color="#D91339" />
                    <Text style={styles.optionText}>Notifications</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/privacy")}>
                    <Ionicons name="lock-closed-outline" size={20} color="#D91339" />
                    <Text style={styles.optionText}>Privacy & Security</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/support")}>
                    <Feather name="help-circle" size={20} color="#D91339" />
                    <Text style={styles.optionText}>Help & Support</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => router.push("/about")}>
                    <Ionicons name="information-circle-outline" size={20} color="#D91339" />
                    <Text style={styles.optionText}>About Trexo</Text>
                    <Feather name="chevron-right" size={20} color="#aaa" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Edit Profile</Text>
                                <TextInput
                                    placeholder="Full Name"
                                    style={styles.input}
                                    value={editData.name}
                                    onChangeText={(text) => setEditData({ ...editData, name: text })}
                                />
                                <TextInput
                                    placeholder="Email Address"
                                    style={styles.input}
                                    value={editData.email}
                                    onChangeText={(text) => setEditData({ ...editData, email: text })}
                                    keyboardType="email-address"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.modalBtn, { backgroundColor: "#D91339" }]}
                                        onPress={handleSave}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff5f5",
        borderRadius: 15,
        padding: 15,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    avatarContainer: {
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
    },
    email: {
        color: "#777",
        marginTop: 4,
    },
    editBtn: {
        backgroundColor: "#D91339",
        padding: 8,
        borderRadius: 10,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#D91339",
        marginBottom: 8,
        paddingHorizontal: 15,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    optionText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: "#333",
        fontWeight: "500",
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D91339",
        borderRadius: 12,
        paddingVertical: 12,
        marginTop: 20,
        gap: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
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
    },
});

export default Profile;