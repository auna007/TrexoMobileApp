import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DealBanner = () => {
    return (
        <LinearGradient
            colors={["#D91339", "#ff607d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>Deal of the Day</Text>
                <Text style={styles.subtitle}>Save up to 50% on summer gadgets!</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>

            <Image
                source={require("@/assets/images/product-5.png")}
                style={styles.image}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    banner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        color: "#fce4ec",
        fontSize: 14,
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "#D91339",
        fontWeight: "bold",
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: "contain",
    },
});

export default DealBanner;