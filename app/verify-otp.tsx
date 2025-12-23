import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import ThemedView from "./components/ThemedView";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleVerify = () => {
        if (otp.length !== 4) {
            Alert.alert("Error", "Please enter a 4-digit OTP");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            const success = Math.random() > 0.5;

            if (success) {
                Alert.alert("Success", "OTP verified successfully!", [
                    { text: "OK", onPress: () => router.push("/login") },
                ]);
            } else {
                Alert.alert("Error", "Invalid OTP. Please try again.");
            }
        }, 1500);
    };

    return (
        <ThemedView>
           <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Verify OTP</Text>
                    <Text style={styles.subtitle}>
                        Enter the 4-digit code sent to your email or phone number
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                        maxLength={4}
                        value={otp}
                        onChangeText={setOtp}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && { opacity: 0.7 }]}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.resendText}>
                        Didn't receive the code?{" "}
                        <Text style={styles.resendLink} onPress={() => Alert.alert("Info", "OTP resent!")}>
                            Resend
                        </Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#111827",
        paddingHorizontal: 20,
        paddingVertical: 60,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        backgroundColor: "#1F2937",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        letterSpacing: 10,
    },
    button: {
        backgroundColor: "#EF4444",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    resendText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
    },
    resendLink: {
        color: "#FFC0CB",
        fontWeight: "bold",
    },
});

export default VerifyOTP;