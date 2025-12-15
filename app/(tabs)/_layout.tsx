import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#D91339",
                tabBarInactiveTintColor: "#555",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderColor: "#eee",
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom || 10,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="orders/index"
                options={{
                    title: "My Orders",
                    tabBarIcon: ({ color }) => <MaterialIcons name="shopping-bag" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="trexo-mall/index"
                options={{
                    title: "Trexo Mall",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="store" size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="logistics/index"
                options={{
                    title: "Logistics",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="truck" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}