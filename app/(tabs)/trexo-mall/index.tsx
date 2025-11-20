import React from "react";
import {
    FlatList,
} from "react-native";
import TrexoHeader from "../../components/trexo-mall/TrexoHeader";
import TrendingSection from "../../components/trexo-mall/TrendingSection";
import ProductGrid from "../../components/trexo-mall/ProductGrid";



const TrexoMall = () => {

    const trending = [
        { id: 1, image: require("@/assets/images/trending-1.png"), name: "Bluetooth Speaker" },
        { id: 2, image: require("@/assets/images/trending-2.png"), name: "Smart Watch" },
        { id: 3, image: require("@/assets/images/trending-3.png"), name: "Wireless Earbuds" },
        { id: 4, image: require("@/assets/images/trending-4.png"), name: "Sunglasses" },
    ];

    const products = [
        { id: 1, image: require("@/assets/images/product-1.png"), name: "Smart Fan", price: "₦35,000" },
        { id: 2, image: require("@/assets/images/product-2.jpg"), name: "Cool Shades", price: "₦12,000" },
        { id: 3, image: require("@/assets/images/product-3.png"), name: "Beach Speaker", price: "₦20,000" },
        { id: 4, image: require("@/assets/images/product-4.png"), name: "Portable Cooler", price: "₦40,000" },
        { id: 5, image: require("@/assets/images/product-5.png"), name: "Wireless Headset", price: "₦18,000" },
        { id: 6, image: require("@/assets/images/product-6.png"), name: "Smart Light", price: "₦10,000" },
    ];

    return (
        <FlatList
            data={products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ListHeaderComponent={
                <>
                    <TrexoHeader />
                    <TrendingSection trending={trending} />
                </>
            }
            renderItem={({ item }) => <ProductGrid item={item} />}
            contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 120 }}
        />
    );
}

export default TrexoMall;