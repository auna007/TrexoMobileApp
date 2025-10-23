import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

const TrackingSection = () => (
    <View style={styles.container}>
        <TextInput
            placeholder="Enter tracking number..."
            placeholderTextColor="#888"
            style={styles.input}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Track</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: "row", marginBottom: 30 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
    },
    button: {
        marginLeft: 10,
        backgroundColor: "#D91339",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    text: { color: "#fff", fontWeight: "bold" },
});

export default TrackingSection;