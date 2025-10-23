import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CTASection = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Join Us Today!</Text>
        <Text style={styles.text}>
            Get the best deals from verified sellers and track your goods easily.
        </Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up Now</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D91339",
        padding: 25,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 50,
    },
    title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    text: { color: "#fff", textAlign: "center", marginVertical: 10 },
    button: { backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    buttonText: { color: "#D91339", fontWeight: "bold" },
});

export default CTASection;