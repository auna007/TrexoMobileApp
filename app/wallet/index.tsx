import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    Alert,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from 'expo-clipboard';

type WalletTransaction = {
    id: string;
    type: "Credit" | "Debit";
    amount: string;
    date: string;
};

const walletTransactions: WalletTransaction[] = [
    { id: "1", type: "Credit", amount: "+₦20,000", date: "Dec 12, 2025" },
    { id: "2", type: "Debit", amount: "-₦5,000", date: "Dec 10, 2025" },
    { id: "3", type: "Credit", amount: "+₦10,000", date: "Dec 08, 2025" },
    { id: "4", type: "Debit", amount: "-₦3,500", date: "Dec 05, 2025" },
];

const invoices = [
    { id: "INV-001", amount: "₦25,000", status: "Paid", date: "Dec 01, 2025" },
    { id: "INV-002", amount: "₦40,000", status: "Pending", date: "Nov 28, 2025" },
    { id: "INV-003", amount: "₦15,500", status: "Paid", date: "Nov 25, 2025" },
    { id: "INV-004", amount: "₦32,000", status: "Cancelled", date: "Nov 20, 2025" },
    { id: "INV-005", amount: "₦50,000", status: "Paid", date: "Nov 15, 2025" },
];

const Wallet = () => {
    const [activeTab, setActiveTab] = useState<"wallet" | "invoices">("wallet");
    const [currency, setCurrency] = useState("NGN");
    const [fundModalVisible, setFundModalVisible] = useState(false);
    const [fundAmount, setFundAmount] = useState("");
    const [fundMethod, setFundMethod] = useState("Flutterwave");
    const [convertAmount, setConvertAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState<"NGN" | "USD">("NGN");
    const [toCurrency, setToCurrency] = useState<"NGN" | "USD">("USD");
    const [convertedAmount, setConvertedAmount] = useState("0");

    const conversionRates = { NGN_USD: 0.0024, USD_NGN: 415 };

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Alert.alert("Copied to clipboard", text);
    };

    const handleFundWallet = () => {
        Alert.alert(`Funding ${fundAmount} via ${fundMethod}`);
        setFundModalVisible(false);
        setFundAmount("");
    };

    const handleConvert = () => {
        if (!convertAmount) return;
        const amount = parseFloat(convertAmount);
        if (isNaN(amount)) return;
        let result = 0;
        if (fromCurrency === "NGN" && toCurrency === "USD") result = amount * conversionRates.NGN_USD;
        else if (fromCurrency === "USD" && toCurrency === "NGN") result = amount * conversionRates.USD_NGN;
        setConvertedAmount(result.toFixed(2));
    };

    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        setConvertedAmount("0");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Paid": return "#16a34a";
            case "Pending": return "#f59e0b";
            case "Cancelled": return "#dc2626";
            default: return "#777";
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "wallet" && styles.activeTab]}
                    onPress={() => setActiveTab("wallet")}
                >
                    <Ionicons name="wallet-outline" size={20} color={activeTab === "wallet" ? "#fff" : "#D91339"} style={{ marginRight: 6 }} />
                    <Text style={[styles.tabText, activeTab === "wallet" && styles.activeTabText]}>Wallet & Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "invoices" && styles.activeTab]}
                    onPress={() => setActiveTab("invoices")}
                >
                    <Ionicons name="document-text-outline" size={20} color={activeTab === "invoices" ? "#fff" : "#D91339"} style={{ marginRight: 6 }} />
                    <Text style={[styles.tabText, activeTab === "invoices" && styles.activeTabText]}>Invoices</Text>
                </TouchableOpacity>
            </View>

            {activeTab === "wallet" && (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <View style={[styles.balanceCard, { backgroundColor: "#fff" }]}>
                        <Text style={[styles.cardTitle, { color: "#D91339" }]}>USD Balance</Text>
                        <Text style={[styles.cardAmount, { color: "#D91339" }]}>$1,200.00</Text>
                        <Ionicons name="cash-outline" size={28} color="#D91339" style={{ marginTop: 10 }} />
                    </View>

                    <View style={styles.localBalanceCard}>
                        <View>
                            <Text style={styles.localBalanceTitle}>Local Balance</Text>
                            <Text style={styles.localBalanceAmount}>{currency === "NGN" ? "₦50,500" : "$120"}</Text>
                        </View>
                        <View style={styles.localBalanceRight}>
                            <Picker selectedValue={currency} onValueChange={(itemValue: string) => setCurrency(itemValue)} style={{ height: 50, width: 100 }}>
                                <Picker.Item label="NGN" value="NGN" />
                                <Picker.Item label="USD" value="USD" />
                            </Picker>
                            <Ionicons name="cash-outline" size={30} color="#D91339" />
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Virtual Account - Zenith Bank</Text>
                        <View style={styles.accountRow}>
                            <Text>Account Name: John Doe - Trexo</Text>
                            <TouchableOpacity onPress={() => copyToClipboard("John Doe - Trexo")}>
                                <Ionicons name="copy-outline" size={20} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accountRow}>
                            <Text>Account Number: 1234567890</Text>
                            <TouchableOpacity onPress={() => copyToClipboard("1234567890")}>
                                <Ionicons name="copy-outline" size={20} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 6 }}>Charge Rate: 1.5% | Cap Charge: NGN 5,000</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Virtual Account - GTBank</Text>
                        <View style={styles.accountRow}>
                            <Text>Account Name: John Doe - Trexo</Text>
                            <TouchableOpacity onPress={() => copyToClipboard("John Doe - Trexo")}>
                                <Ionicons name="copy-outline" size={20} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accountRow}>
                            <Text>Account Number: 0987654321</Text>
                            <TouchableOpacity onPress={() => copyToClipboard("0987654321")}>
                                <Ionicons name="copy-outline" size={20} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 6 }}>Charge Rate: 1.2% | Cap Charge: NGN 4,500</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>💱 Convert Currency</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <TextInput style={[styles.input, { flex: 1 }]} placeholder="Enter amount" keyboardType="numeric" value={convertAmount} onChangeText={setConvertAmount} />
                            <TouchableOpacity onPress={handleSwap} style={{ marginLeft: 10 }}>
                                <Ionicons name="swap-vertical-outline" size={28} color="#D91339" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "600" }}>{fromCurrency}</Text>
                            <Text style={{ fontWeight: "600" }}>{toCurrency}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleConvert}>
                            <Text style={styles.buttonText}>Convert</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, fontSize: 16 }}>
                            Converted Amount: <Text style={{ fontWeight: "700" }}>{convertedAmount} {toCurrency}</Text>
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>💳 Fund Your Wallet</Text>
                        <Text>Add funds using our secure payment gateway.</Text>
                        <TouchableOpacity style={styles.button} onPress={() => setFundModalVisible(true)}>
                            <Text style={styles.buttonText}>Fund Wallet</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Recent Transactions</Text>
                    <FlatList
                        data={walletTransactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.txCard}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Ionicons name={item.type === "Credit" ? "arrow-down-circle" : "arrow-up-circle"} size={24} color={item.type === "Credit" ? "#16a34a" : "#dc2626"} />
                                    <View style={{ marginLeft: 12 }}>
                                        <Text style={styles.txType}>{item.type}</Text>
                                        <Text style={styles.txDate}>{item.date}</Text>
                                    </View>
                                </View>
                                <Text style={{ color: item.type === "Credit" ? "#16a34a" : "#dc2626", fontWeight: "700" }}>{item.amount}</Text>
                            </View>
                        )}
                        scrollEnabled={false}
                    />

                    <Modal animationType="slide" transparent={true} visible={fundModalVisible}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.sectionTitle}>Fund Wallet</Text>
                                <TextInput placeholder="Amount" keyboardType="number-pad" style={styles.input} value={fundAmount} onChangeText={setFundAmount} />
                                <Picker selectedValue={fundMethod} onValueChange={(itemValue) => setFundMethod(itemValue)} style={{ height: 50 }}>
                                    <Picker.Item label="Flutterwave" value="Flutterwave" />
                                    <Picker.Item label="Paystack" value="Paystack" />
                                    <Picker.Item label="Monnify" value="Monnify" />
                                </Picker>
                                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleFundWallet}>
                                    <Text style={styles.buttonText}>Fund Wallet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setFundModalVisible(false)} style={{ marginTop: 10, alignSelf: "center" }}>
                                    <Text style={{ color: "#D91339" }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            )}

            {activeTab === "invoices" && (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <Text style={styles.sectionTitle}>Invoices</Text>
                    {invoices.map((invoice) => (
                        <View key={invoice.id} style={styles.invoiceCard}>
                            <Text style={{ fontWeight: "700" }}>Invoice: {invoice.id}</Text>
                            <Text>Amount: {invoice.amount}</Text>
                            <Text>Status: <Text style={{ color: getStatusColor(invoice.status), fontWeight: "700" }}>{invoice.status}</Text></Text>
                            <Text>Date: {invoice.date}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
    },
    tabButton: {
        flexDirection: "row",
        flex: 1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    tabText: { fontSize: 16, color: "#555" },
    activeTab: { backgroundColor: "#D91339" },
    activeTabText: { color: "#fff", fontWeight: "700" },
    balanceCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardTitle: { fontSize: 16, fontWeight: "600" },
    cardAmount: { fontSize: 24, fontWeight: "700", marginTop: 5 },
    localBalanceCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    localBalanceTitle: { fontSize: 16, fontWeight: "600", color: "#555" },
    localBalanceAmount: { fontSize: 26, fontWeight: "700", color: "#D91339", marginTop: 5 },
    localBalanceRight: { flexDirection: "row", alignItems: "center", gap: 10 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    accountRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
    button: { backgroundColor: "#D91339", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontWeight: "600" },
    txCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 10, elevation: 1 },
    txType: { fontWeight: "600" },
    txDate: { fontSize: 12, color: "#777" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
    modalContent: { backgroundColor: "#fff", borderRadius: 12, padding: 20 },
    input: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 16 },
    invoiceCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default Wallet;