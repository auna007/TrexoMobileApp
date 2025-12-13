import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useCart } from "@/contexts/CartContext";
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
    const { cart, clearCart } = useCart();
    const total = cart.reduce((sum, item) => {
        const priceNumber =
            parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
        return sum + priceNumber * (item.quantity || 1);
    }, 0);

    const router = useRouter();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("Nigeria");
    const [shippingType, setShippingType] = useState("Sea Cargo");

    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [useSaved, setUseSaved] = useState(false);

    const handleAutoFill = () => {
        setUseSaved(!useSaved);
        if (!useSaved) {
            setName("John Doe");
            setPhone("+234 9012345678");
            setStreet("123 Main Street");
            setCity("Lagos");
            setPostalCode("100001");
            setCountry("Nigeria");
            setShippingType("Sea Cargo");
        } else {
            setName("");
            setPhone("");
            setStreet("");
            setCity("");
            setPostalCode("");
            setCountry("");
            setShippingType("Sea Cargo");
        }
    };

    const handleCheckout = () => {
        if (!name || !phone || !street || !city || !postalCode || !country) {
            Alert.alert("Please fill in all required shipping fields.");
            return;
        }

        Alert.alert("Order placed successfully!");
        clearCart();
        router.replace("/order-status");
    };

    const paymentIcons: Record<string, React.ReactNode> = {
        "Credit Card": <FontAwesome name="credit-card" size={20} color="#D91339" />,
        PayPal: <FontAwesome name="paypal" size={20} color="#D91339" />,
        Paystack: <Ionicons name="card-outline" size={20} color="#D91339" />,
        "Bank Transfer": <FontAwesome name="bank" size={20} color="#D91339" />,
        Wallet: <Ionicons name="wallet-outline" size={20} color="#D91339" />,
        "Cash on Delivery": <Ionicons name="cash-outline" size={20} color="#D91339" />,
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#f2f2f2" }}
        >
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.header}>
                    Checkout <Ionicons name="cart-outline" size={24} color="#D91339" />
                </Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Shipping Details</Text>
                    <Pressable style={styles.checkboxContainer} onPress={handleAutoFill}>
                        <Ionicons
                            name={useSaved ? "checkbox" : "square-outline"}
                            size={24}
                            color="#D91339"
                        />
                        <Text style={{ marginLeft: 8 }}>Use saved shipping details</Text>
                    </Pressable>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#888"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Street Address"
                        placeholderTextColor="#888"
                        value={street}
                        onChangeText={setStreet}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        placeholderTextColor="#888"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        placeholderTextColor="#888"
                        value={postalCode}
                        onChangeText={setPostalCode}
                        keyboardType="number-pad"
                    />

                    <View style={styles.dropdownContainer}>
                        <MaterialIcons
                            name="public"
                            size={20}
                            color="#888"
                            style={{ marginRight: 8 }}
                        />
                        <Picker
                            selectedValue={country}
                            onValueChange={(itemValue: string) => setCountry(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Nigeria" value="Nigeria" />
                            <Picker.Item label="United States" value="United States" />
                            <Picker.Item label="United Kingdom" value="United Kingdom" />
                            <Picker.Item label="Canada" value="Canada" />
                        </Picker>
                    </View>

                    <View style={styles.dropdownContainer}>
                        <Ionicons
                            name="airplane-outline"
                            size={20}
                            color="#888"
                            style={{ marginRight: 8 }}
                        />
                        <Picker
                            selectedValue={shippingType}
                            onValueChange={(itemValue: string) => setShippingType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Sea Cargo" value="Sea Cargo" />
                            <Picker.Item label="Air Cargo" value="Air Cargo" />
                        </Picker>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    {Object.keys(paymentIcons).map((method) => (
                        <Pressable
                            key={method}
                            style={styles.radioContainer}
                            onPress={() => setPaymentMethod(method)}
                        >
                            {paymentIcons[method]}
                            <Text style={{ marginLeft: 10 }}>{method}</Text>
                            <Ionicons
                                name={
                                    paymentMethod === method
                                        ? "radio-button-on"
                                        : "radio-button-off"
                                }
                                size={24}
                                color="#D91339"
                                style={{ marginLeft: "auto" }}
                            />
                        </Pressable>
                    ))}

                    <TextInput
                        style={styles.input}
                        placeholder="Delivery Notes (Optional)"
                        placeholderTextColor="#888"
                        value={deliveryNotes}
                        onChangeText={setDeliveryNotes}
                    />

                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutText}>Place Order</Text>
                        <Ionicons
                            name="arrow-forward-circle-outline"
                            size={24}
                            color="#fff"
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    {cart.map((item) => (
                        <View key={item.id} style={styles.summaryRow}>
                            <Image source={item.image} style={styles.summaryImage} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>
                                    Qty: {item.quantity} x ₦{item.price}
                                </Text>
                            </View>
                            <Text style={styles.itemPrice}>
                                ₦
                                {(
                                    parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) *
                                    (item.quantity || 1)
                                ).toLocaleString()}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <Text style={styles.summaryText}>
                        Subtotal: ₦{total.toLocaleString()}
                    </Text>
                    <Text style={styles.summaryText}>Shipping: Free</Text>
                    <Text style={styles.summaryText}>Tax: Included</Text>
                    <Text style={[styles.summaryText, { fontWeight: "bold", fontSize: 18 }]}>
                        Total: ₦{total.toLocaleString()}
                    </Text>
                    <Text style={{ marginTop: 10, color: "#27ae60" }}>
                        🎉 You saved ₦{(total * 0.1).toFixed(2)} with free shipping!
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#D91339" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    input: {
        backgroundColor: "#f2f2f2",
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 15,
    },
    checkoutButton: {
        flexDirection: "row",
        backgroundColor: "#D91339",
        padding: 16,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        elevation: 3,
    },
    checkoutText: { color: "#fff", fontSize: 18, fontWeight: "600" },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    summaryImage: { width: 60, height: 60, borderRadius: 10 },
    itemName: { fontWeight: "600", fontSize: 16 },
    itemPrice: { color: "#D91339", marginTop: 4 },
    summaryText: { fontSize: 16, marginBottom: 4 },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    dropdownContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    picker: { flex: 1, height: 50, color: "#333" },
});