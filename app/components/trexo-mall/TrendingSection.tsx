import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ImageSourcePropType
} from "react-native";

type TrendingItem = {
    id: number;
    name: string;
    image: ImageSourcePropType;
};

export default function TrendingSection({ trending }: { trending: TrendingItem[] }) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {trending.map((item) => (
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