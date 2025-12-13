import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

const HeaderAuth = () => {
    return (
        <View style={styles.header}>
            <View style={styles.brandContainer}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
            </View>

            <View style={styles.authButtons}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Feather name="user" size={18} color="#D91339" />
                    <Link href="/login" style={styles.loginText}>Login</Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerBtn}>
                    <Link href="/register" style={styles.registerText}>Register</Link>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 80,
        resizeMode: "contain",
    },
    authButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D91339",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    loginText: {
        color: "#D91339",
        fontWeight: "600",
        marginLeft: 5,
    },
    registerBtn: {
        backgroundColor: "#D91339",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#fff",
        fontWeight: "700",
    },
});

export default HeaderAuth;