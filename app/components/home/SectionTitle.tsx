import React from "react";
import { StyleSheet, Text } from "react-native";

const SectionTitle = ({ title, showMore = false }: { title: string, showMore?: boolean }) => (
    <Text style={styles.title}>
        {title} {showMore ? "›" : ""}
    </Text>
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