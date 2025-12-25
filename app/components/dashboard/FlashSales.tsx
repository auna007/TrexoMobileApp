import { useFlashProducts } from '@/hooks/useDashboard';
import { TransformedProduct } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '../ProductCard';

const FlashSales = () => {
  const router = useRouter();
  const { data: flashProducts = [], isLoading } = useFlashProducts();

  const handleProductPress = (product: TransformedProduct) => {
      router.push({
        pathname: "/product-detail/[id]",
        params: { id: product.id.toString() },
    });
  };

  const handleViewAll = () => {
    router.push('/products?type=flash');
  };

  if (isLoading) {
    return (
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <Ionicons name="flash" size={24} color="#D91339" />
            <Text style={styles.title}>Flash Sales</Text>
          </View>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading flash sales...</Text>
        </View>
      </View>
    );
  }

  if (flashProducts.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Ionicons name="flash" size={24} color="#D91339" />
          <Text style={styles.title}>Flash Sales ⚡</Text>
        </View>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={flashProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard 
              product={item}
              type="compact"
              onPress={handleProductPress}
              showDiscount={true}
              showRating={false}
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
    marginBottom: 30 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  viewAll: { 
    color: '#D91339', 
    fontWeight: '600', 
    fontSize: 14 
  },
  cardContainer: {
    // marginRight: 16,
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

export default FlashSales;