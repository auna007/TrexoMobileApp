import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const Kyc = () => {
    const [selfie, setSelfie] = useState<string | null>(null);
    const [idDocument, setIdDocument] = useState<string | null>(null);

    const pickDocument = async (
        setter: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images as any,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            setter(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!selfie || !idDocument) {
            Alert.alert("Incomplete", "Please upload both your selfie and ID document.");
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
            {uri && (
                <Image
                    source={{ uri }}
                    style={styles.previewImage}
                    resizeMode="cover"
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>KYC Verification</Text>
            <Text style={styles.subtitle}>Upload your selfie and ID to verify your account</Text>

            {renderUploadButton("Selfie/Passport Photo", selfie, setSelfie)}
            {renderUploadButton("Government ID", idDocument, setIdDocument)}

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit KYC</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
        paddingTop: 60,
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
        marginTop: 30,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});

export default Kyc;