import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Modal,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const currencies = ["USD", "EUR", "GBP", "NGN", "KES", "GHS", "CAD"];

const fakeRates: Record<string, Record<string, number>> = {
    USD: { NGN: 1600, EUR: 0.92, GBP: 0.78, KES: 145, GHS: 11, CAD: 1.36 },
    NGN: { USD: 0.00063, EUR: 0.00057, GBP: 0.00049, KES: 0.091, GHS: 0.0068, CAD: 0.00085 },
    EUR: { USD: 1.08, NGN: 1740, GBP: 0.85, KES: 158, GHS: 12, CAD: 1.48 },
    GBP: { USD: 1.26, NGN: 2000, EUR: 1.18, KES: 185, GHS: 14, CAD: 1.74 },
};

const CurrencyConverter = () => {
    const [amount, setAmount] = useState<string>("");
    const [from, setFrom] = useState<string>("USD");
    const [to, setTo] = useState<string>("NGN");
    const [converted, setConverted] = useState<string | null>(null);

    const [pickerVisible, setPickerVisible] = useState<"from" | "to" | null>(null);

    const fade = useRef(new Animated.Value(0)).current;

    const convert = () => {
        if (!amount) return;
        const rate = fakeRates[from]?.[to] ?? 1;
        const result = parseFloat(amount) * rate;
        setConverted(result.toFixed(2));
        fade.setValue(0);
        Animated.timing(fade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const swapCurrencies = () => {
        const a = from;
        setFrom(to);
        setTo(a);
        setConverted(null);
        fade.setValue(0);
    };

    const selectCurrency = (currency: string) => {
        if (pickerVisible === "from") setFrom(currency);
        else if (pickerVisible === "to") setTo(currency);
        setPickerVisible(null);
        setConverted(null);
        fade.setValue(0);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Currency Converter</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    placeholderTextColor="#6B7280"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <View style={styles.row}>
                    <TouchableOpacity style={styles.pickerBox} onPress={() => setPickerVisible("from")}>
                        <Text style={styles.label}>From</Text>
                        <Text style={styles.pickerText}>{from}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.swap} onPress={swapCurrencies}>
                        <Ionicons name="swap-vertical" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pickerBox} onPress={() => setPickerVisible("to")}>
                        <Text style={styles.label}>To</Text>
                        <Text style={styles.pickerText}>{to}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={convert}>
                    <Text style={styles.buttonText}>Convert</Text>
                </TouchableOpacity>

                {converted && (
                    <Animated.View style={{ opacity: fade, marginTop: 25 }}>
                        <Text style={styles.resultText}>
                            {amount} {from} = {converted} {to}
                        </Text>
                    </Animated.View>
                )}

                {/* Picker Modal */}
                <Modal visible={!!pickerVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={() => setPickerVisible(null)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <ScrollView>
                                    {currencies.map((cur) => (
                                        <TouchableOpacity
                                            key={cur}
                                            style={styles.modalItem}
                                            onPress={() => selectCurrency(cur)}
                                        >
                                            <Text style={styles.modalText}>{cur}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20,
        paddingTop: 60,
    },
    title: {
        color: "#111827",
        fontWeight: "bold",
        fontSize: 26,
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        color: "#111827",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    pickerBox: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    label: {
        color: "#6B7280",
        fontSize: 12,
        marginBottom: 4,
    },
    pickerText: {
        fontSize: 16,
        color: "#111827",
    },
    swap: {
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "#EF4444",
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#EF4444",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    resultText: {
        color: "#111827",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalBox: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        borderRadius: 12,
        maxHeight: 300,
        paddingVertical: 10,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        color: "#111827",
    },
});

export default CurrencyConverter;