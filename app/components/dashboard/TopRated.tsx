import { useTopRatedProducts } from '@/hooks/useDashboard';
import { TransformedProduct } from '@/types/product';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '../ProductCard';

const TopRated = () => {
  const router = useRouter();
  const { data: topRatedProducts = [], isLoading } = useTopRatedProducts();

  const handleProductPress = (product: TransformedProduct) => {
      router.push({
        pathname: "/product-detail/[id]",
        params: { id: product.id.toString() },
    });
  };

  const handleViewAll = () => {
    router.push('/products?sort_by=average_rating&sort_order=desc');
  };

  if (isLoading) {
    return (
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Top Rated</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading top rated products...</Text>
        </View>
      </View>
    );
  }

  if (topRatedProducts.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>⭐ Top Rated Products</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topRatedProducts.slice(0, 6)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard 
              product={item}
              type="vertical"
              onPress={handleProductPress}
              showRating={true}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewAll: {
    color: '#D91339',
    fontWeight: '600',
    fontSize: 14,
  },
  cardContainer: {
    marginRight: 16,
  },
  listContent: {
    paddingRight: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default TopRated;