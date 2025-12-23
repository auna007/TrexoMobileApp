import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../components/ThemedView";

const AccountSettings = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string>("Ayomide Johnson");
    const [email, setEmail] = useState<string>("ayomide.johnson@example.com");
    const [phone, setPhone] = useState<string>("08105559000");
    const [address, setAddress] = useState<string>("123 Main Street");
    const [city, setCity] = useState<string>("Maiduguri");
    const [postalCode, setPostalCode] = useState<string>("600001");
    const [country, setCountry] = useState<string>("Nigeria");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!fullName || !email || !phone || !address || !city || !postalCode || !country) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        Alert.alert("Success", "Your account details have been updated");
    };

    return (
        <ThemedView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Account Settings</Text>

                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={100} color="#D91339" />
                        )}
                        <Text style={styles.changeText}>
                            {profileImage ? "Change Profile Picture" : "Upload Profile Picture"}
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        value={postalCode}
                        onChangeText={setPostalCode}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                    />

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveText}>Save Changes</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 30,
        textAlign: "center",
    },
    imagePicker: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeText: {
        marginTop: 10,
        color: "#D91339",
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#eee",
    },
    saveBtn: {
        backgroundColor: "#D91339",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});

export default AccountSettings;