import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function TrendingSection({ trending }: any) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
                <Text style={styles.seeAll}>See all</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {trending.map((item: any) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginBottom: 25 },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold" },
    seeAll: { color: "#D91339", fontWeight: "600" },
    card: {
        width: 130,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        elevation: 2,
    },
    image: { width: "100%", height: 100, resizeMode: "contain" },
    name: { textAlign: "center", marginTop: 5, fontWeight: "600" },
});