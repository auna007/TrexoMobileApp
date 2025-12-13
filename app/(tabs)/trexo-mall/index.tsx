import React from "react";
import { FlatList } from "react-native";

import TrexoHeader from "../../components/trexo-mall/TrexoHeader";
import TrendingSection from "../../components/trexo-mall/TrendingSection";
import ProductGrid from "../../components/trexo-mall/ProductGrid";

import { products as productData } from "@/data/products";

const TrexoMall = () => {

    const trending = productData
        .filter(item => item.popularity === "trending" || item.popularity === "hot")
        .slice(0, 4)
        .map(item => ({
            id: Number(item.id),
            name: item.name,
            image: item.images[0],
        }));

    const products = productData.map(item => ({
        id: Number(item.id),
        name: item.name,
        price: `₦${item.price.toLocaleString()}`,
        image: item.images[0],
    }));

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
};

export default TrexoMall;