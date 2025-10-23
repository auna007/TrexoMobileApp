import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type Slide = {
    id: string;
    title: string;
    subtitle: string;
    iconName: string;
    iconFamily: "MaterialIcons" | "Ionicons" | "FontAwesome5";
};

const slides: Slide[] = [
    {
        id: "1",
        title: "Electronics Mega Sale",
        subtitle: "Top gadgets at unbeatable prices",
        iconName: "devices",
        iconFamily: "MaterialIcons",
    },
    {
        id: "2",
        title: "Fresh Fashion Drop",
        subtitle: "New arrivals — limited stock",
        iconName: "shirt-outline",
        iconFamily: "Ionicons",
    },
    {
        id: "3",
        title: "Smart Home Picks",
        subtitle: "Comfort & convenience for your home",
        iconName: "home",
        iconFamily: "FontAwesome5",
    },
];

const ACCENT = "#D91339";
const BACKGROUND = "#FAFAFA";
const CARD_BG = "#FFFFFF";
const TEXT = "#111";
const SUBTEXT = "#6B7280";

const CARD_WIDTH = width * 0.92;

const HeroCarousel: React.FC = () => {
    const flatRef = useRef<FlatList<any> | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (active + 1) % slides.length;
            flatRef.current?.scrollToIndex({ index: next, animated: true });
            setActive(next);
        }, 4500);
        return () => clearInterval(interval);
    }, [active]);

    const onMomentum = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
        setActive(index);
    };

    const renderIcon = (slide: Slide) => {
        if (slide.iconFamily === "MaterialIcons") {
            return <MaterialIcons name={slide.iconName as any} size={40} color="#fff" />;
        }
        if (slide.iconFamily === "Ionicons") {
            return <Ionicons name={slide.iconName as any} size={42} color="#fff" />;
        }
        return <FontAwesome5 name={slide.iconName as any} size={36} color="#fff" />;
    };

    return (
        <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
            <Animated.FlatList
                ref={flatRef}
                data={slides}
                horizontal
                pagingEnabled={false}
                snapToInterval={CARD_WIDTH}
                decelerationRate="fast"
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={onMomentum}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{
                    paddingLeft: 0,
                    paddingRight: width - CARD_WIDTH,
                }}
                renderItem={({ item }) => (
                    <View style={[styles.slideWrapper, { width: CARD_WIDTH }]}>
                        <View style={styles.card}>
                            <View style={styles.accentColumn}>
                                <View style={styles.iconWrapper}>{renderIcon(item)}</View>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>

                                <View style={styles.ctaRow}>
                                    <TouchableOpacity style={styles.ctaButton}>
                                        <Text style={styles.ctaText}>Shop Deals</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.smallNote}>Ends soon</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.paginationContainer}>
                {slides.map((_, i) => {
                    const widthInterpolate = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * CARD_WIDTH,
                            i * CARD_WIDTH,
                            (i + 1) * CARD_WIDTH,
                        ],
                        outputRange: [8, 22, 8],
                        extrapolate: "clamp",
                    });

                    const opacityInterpolate = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * CARD_WIDTH,
                            i * CARD_WIDTH,
                            (i + 1) * CARD_WIDTH,
                        ],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    width: widthInterpolate,
                                    opacity: opacityInterpolate,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 18,
    },
    slideWrapper: {
        alignItems: "flex-start",
    },
    card: {
        flexDirection: "row",
        backgroundColor: CARD_BG,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 6,
    },
    accentColumn: {
        width: 120,
        backgroundColor: ACCENT,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 18,
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "rgba(255,255,255,0.12)",
        justifyContent: "center",
        alignItems: "center",
    },
    textArea: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: TEXT,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: SUBTEXT,
        marginBottom: 12,
        lineHeight: 18,
    },
    ctaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 12,
    },
    ctaButton: {
        backgroundColor: ACCENT,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    ctaText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },
    smallNote: {
        color: SUBTEXT,
        fontSize: 12,
    },
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginLeft: 14,
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#111",
    },
});

export default HeroCarousel;