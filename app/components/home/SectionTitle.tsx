import React from "react";
import { Text, StyleSheet } from "react-native";

const SectionTitle = ({ title }: { title: string }) => (
    <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#D91339",
        marginBottom: 15,
    },
});

export default SectionTitle;