import { useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import ThemedView from "./components/ThemedView";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        router.push("/(tabs)");
    };

    return (
        <ThemedView>
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>Please sign in to continue</Text>

                    <Text style={styles.signupText}>
                        Don't have an account?{" "}
                        <Text
                            style={styles.signupLink}
                            onPress={() => router.push("/register")}
                        >
                            Signup here
                        </Text>
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.termsText}>
                        By logging in, you agree to our{" "}
                        <Text
                            style={styles.termsLink}
                            onPress={() => router.push("/terms")}
                        >
                            Terms and Conditions
                        </Text>
                    </Text>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <Image
                            source={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                            }}
                            style={styles.googleIcon}
                        />
                        <Text style={styles.googleText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <Text style={styles.helpText}>Get help signing in</Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#111827",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 30,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 8,
        textAlign: "left",
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 14,
        marginBottom: 8,
        textAlign: "left",
    },
    signupText: {
        color: "#fff",
        marginBottom: 20,
        textAlign: "left",
    },
    signupLink: {
        color: "#ffc0cb",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        backgroundColor: "#1F2937",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        color: "#fff",
    },
    button: {
        backgroundColor: "#EF4444",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    termsText: {
        color: "#9CA3AF",
        fontSize: 13,
        textAlign: "center",
        marginVertical: 15,
    },
    termsLink: {
        color: "#ffc0cb",
        fontWeight: "bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#374151",
    },
    dividerText: {
        color: "#9CA3AF",
        marginHorizontal: 10,
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#374151",
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleText: {
        color: "#fff",
        fontSize: 16,
    },
    helpText: {
        color: "#ffc0cb",
        textAlign: "center",
    },
});

export default Login;