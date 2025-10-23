import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchBarProps {
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search for products..." }) => (
    <View style={styles.container}>
        <Feather name="search" size={20} color="#888" />
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#888"
            style={styles.input}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#fafafa",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
    },
});

export default SearchBar;