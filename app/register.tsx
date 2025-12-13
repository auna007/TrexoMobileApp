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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            return;
        }
        if (password !== confirmPassword) {
            return;
        }
        router.push("/verify-otp");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Image
                    source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                    Sign up to start shopping on Trexo Mall
                </Text>
                <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text
                        style={styles.loginLink}
                        onPress={() => router.push("/login")}
                    >
                        Login here
                    </Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons
                            name={showConfirmPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
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
                <Text style={styles.helpText}>Need help signing up?</Text>
            </ScrollView>
        </TouchableWithoutFeedback>
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
    loginText: {
        color: "#fff",
        marginBottom: 20,
        textAlign: "left",
    },
    loginLink: {
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
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F2937",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        color: "#fff",
        paddingVertical: 12,
        fontSize: 16,
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

export default Register;