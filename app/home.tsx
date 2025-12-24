import {
  useNewArrivals,
  useSummerProducts,
  useTrendingProducts
} from "@/hooks/useProducts";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTASection from "./components/home/CTASection";
import DealBanner from "./components/home/DealBanner";
import HeaderAuth from "./components/home/HeaderAuth";
import HeroCarousel from "./components/home/HeroCarousel";
import ProductGrid from "./components/home/ProductGrid";
import SearchBar from "./components/home/SearchBar";
import SectionTitle from "./components/home/SectionTitle";
import SellerList from "./components/home/SellerList";
import TrackingSection from "./components/home/TrackingSection";
import ProductSkeleton from "./components/Skeleton/ProductSkeleton";
  
  export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
  
    // Use separate hooks for different product types
    const { 
      data: newArrivals, 
      isLoading: isLoadingNewArrivals, 
      refetch: refetchNewArrivals 
    } = useNewArrivals(4);
  
    const { 
      data: trendingProducts, 
      isLoading: isLoadingTrending, 
      refetch: refetchTrending 
    } = useTrendingProducts(4);
  
    const { 
      data: summerProducts, 
      isLoading: isLoadingSummer, 
      refetch: refetchSummer 
    } = useSummerProducts(4);
  
    const sellers = [
      { id: 1, name: "TechWorld", rating: "4.9⭐" },
      { id: 2, name: "Naija Gadgets", rating: "4.8⭐" },
      { id: 3, name: "Smart Deals", rating: "4.7⭐" },
    ];
  
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      try {
        // Refetch all product queries in parallel
        await Promise.all([
          refetchNewArrivals(),
          refetchTrending(),
          refetchSummer(),
        ]);
      } finally {
        setRefreshing(false);
      }
    }, [refetchNewArrivals, refetchTrending, refetchSummer]);
  
    const handleProductPress = (product: any) => {
      // Navigate to product detail screen
      console.log('Product pressed:', product);
      // router.push(`/products/${product.id}`);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HeaderAuth />
          <HeroCarousel />
          <DealBanner />
          <SearchBar placeholder="Search for products, brands, or sellers..." />
          
          {/* New Arrivals */}
          <SectionTitle title="New Arrivals" showMore={true} />
          {isLoadingNewArrivals ? (
            <ProductSkeleton count={4} />
          ) : newArrivals && newArrivals.length > 0 ? (
            <ProductGrid 
              products={newArrivals} 
              onProductPress={handleProductPress}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No new arrivals available</Text>
            </View>
          )}
          
          {/* Top Verified Sellers */}
          <SectionTitle title="Top Verified Sellers" />
          <SellerList sellers={sellers} />
          
          {/* Track Your Goods */}
          <SectionTitle title="Track Your Goods" />
          <TrackingSection />
          
          {/* Trending Now */}
          <SectionTitle title="Trending Now" showMore={true} />
          {isLoadingTrending ? (
            <ProductSkeleton count={4} />
          ) : trendingProducts && trendingProducts.length > 0 ? (
            <ProductGrid 
              products={trendingProducts} 
              onProductPress={handleProductPress}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No trending products available</Text>
            </View>
          )}
  
          {/* Summer Collection */}
          <SectionTitle title="Summer Collection" showMore={true} />
          {isLoadingSummer ? (
            <ProductSkeleton count={4} />
          ) : summerProducts && summerProducts.length > 0 ? (
            <ProductGrid 
              products={summerProducts} 
              onProductPress={handleProductPress}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No summer products available</Text>
            </View>
          )}
          
          <CTASection />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    scrollView: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff"
    },
    emptyState: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 30,
    },
    emptyStateText: {
      color: '#6B7280',
      fontSize: 14,
      textAlign: 'center',
    },
  });