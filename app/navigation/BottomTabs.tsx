import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../dashboard/index";
import Orders from "../dashboard/orders";
import TrexoMall from "../dashboard/trexo-mall";
import Logistics from "../dashboard/logistics";
import Profile from "../dashboard/profile";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#D91339",
                tabBarInactiveTintColor: "#555",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderColor: "#eee",
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "Dashboard") {
                        return <Ionicons name="home" size={22} color={color} />;
                    } else if (route.name === "My Orders") {
                        return <MaterialIcons name="shopping-bag" size={22} color={color} />;
                    } else if (route.name === "Trexo Mall") {
                        return <FontAwesome5 name="store" size={20} color={color} />;
                    } else if (route.name === "Logistics") {
                        return <FontAwesome5 name="truck" size={22} color={color} />;
                    } else if (route.name === "Profile") {
                        return <Feather name="user" size={22} color={color} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="My Orders" component={Orders} />
            <Tab.Screen name="Trexo Mall" component={TrexoMall} />
            <Tab.Screen name="Logistics" component={Logistics} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default BottomTabs;