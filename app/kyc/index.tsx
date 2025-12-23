import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    Platform,
    Modal,
    Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ThemedView from "../components/ThemedView";

const Kyc = () => {
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState<Date | null>(null);
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [address, setAddress] = useState("");
    const [idType, setIdType] = useState("Passport");
    const [idNumber, setIdNumber] = useState("");
    const [idImage, setIdImage] = useState<string | null>(null);
    const [passport, setPassport] = useState<string | null>(null);
    const [showIdTypePicker, setShowIdTypePicker] = useState(false);

    const pickDocument = async (
        setter: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            setter(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!fullName || !dob || !address || !idNumber || !idImage || !passport) {
            Alert.alert("Incomplete", "Please fill all fields and upload all documents.");
            return;
        }
        Alert.alert("Success", "Your KYC documents have been submitted.");
    };

    const renderUploadButton = (
        label: string,
        uri: string | null,
        setter: React.Dispatch<React.SetStateAction<string | null>>
    ) => (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(setter)}>
                <Ionicons name="cloud-upload-outline" size={28} color="#D91339" />
                <Text style={styles.uploadText}>
                    {uri ? "Change " + label : "Upload " + label}
                </Text>
            </TouchableOpacity>
            {uri && <Image source={{ uri }} style={styles.previewImage} />}
        </View>
    );

    return (
        <ThemedView>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>KYC Verification</Text>
                <Text style={styles.subtitle}>Complete the form to verify your account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDobPicker(true)}
                >
                    <Text style={{ color: dob ? "#111" : "#999" }}>
                        {dob ? dob.toDateString() : "Date of Birth"}
                    </Text>
                </TouchableOpacity>
                {showDobPicker && (
                    <DateTimePicker
                        value={dob || new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowDobPicker(false);
                            if (selectedDate) setDob(selectedDate);
                        }}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Residential Address"
                    placeholderTextColor="#999"
                    value={address}
                    onChangeText={setAddress}
                />

                {Platform.OS === "ios" ? (
                    <>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowIdTypePicker(true)}
                        >
                            <Text style={{ color: "#111" }}>{idType}</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent
                            animationType="slide"
                            visible={showIdTypePicker}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <Button title="Done" onPress={() => setShowIdTypePicker(false)} />
                                    <Picker
                                        selectedValue={idType}
                                        onValueChange={(itemValue) => setIdType(itemValue)}
                                        itemStyle={{ color: "#111", fontSize: 16 }}
                                    >
                                        <Picker.Item label="Passport" value="Passport" />
                                        <Picker.Item label="Driver's License" value="Driver's License" />
                                        <Picker.Item label="National ID" value="National ID" />
                                    </Picker>
                                </View>
                            </View>
                        </Modal>

                    </>
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={idType}
                            onValueChange={(itemValue) => setIdType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Passport" value="Passport" />
                            <Picker.Item label="Driver's License" value="Driver's License" />
                            <Picker.Item label="National ID" value="National ID" />
                        </Picker>
                    </View>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="ID Number"
                    placeholderTextColor="#999"
                    value={idNumber}
                    onChangeText={setIdNumber}
                />

                {renderUploadButton(`${idType} Image`, idImage, setIdImage)}
                {renderUploadButton("Passport/Selfie", passport, setPassport)}

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit KYC</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#D91339",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 25,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 15,
        color: "#111",
        justifyContent: "center",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: { height: 50, width: "100%" },
    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    uploadText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#111",
        fontWeight: "600",
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
    },
    submitBtn: {
        backgroundColor: "#D91339",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContent: {
        backgroundColor: "#fff",
    },
});

export default Kyc;