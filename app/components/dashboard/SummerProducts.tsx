import { useSummerProducts } from '@/hooks/useProducts';
import { TransformedProduct } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductCard from '../ProductCard';

const { width } = Dimensions.get('window');

const SummerProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<TransformedProduct>>(null);
  const router = useRouter();
  const { data: summerProducts = [], isLoading } = useSummerProducts();

  const nextSlide = () => {
    if (currentIndex < summerProducts.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex });
      setCurrentIndex(prevIndex);
    }
  };

  const handleProductPress = (product: TransformedProduct) => {
    router.push({
        pathname: "/product-detail/[id]",
        params: { id: product.id.toString() },
    });
  };

  if (isLoading || summerProducts.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Summer Products</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading summer products...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Summer Collection ☀️</Text>

      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={summerProducts}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <ProductCard 
                product={item}
                type="compact"
                onPress={handleProductPress}
                showRating={false}
              />
            </View>
          )}
          getItemLayout={(data, index) => ({
            length: (width * 0.5) + 16,
            offset: ((width * 0.5) + 16) * index,
            index,
          })}
        />

        {summerProducts.length > 2 && (
          <>
            <TouchableOpacity
              style={[styles.arrow, styles.leftArrow]}
              onPress={prevSlide}
              disabled={currentIndex === 0}
            >
              <Ionicons 
                name="chevron-back-circle" 
                size={40} 
                color={currentIndex === 0 ? '#ccc' : '#D91339'} 
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.arrow, styles.rightArrow]}
              onPress={nextSlide}
              disabled={currentIndex >= summerProducts.length - 2}
            >
              <Ionicons 
                name="chevron-forward-circle" 
                size={40} 
                color={currentIndex >= summerProducts.length - 2 ? '#ccc' : '#D91339'} 
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  carouselWrapper: {
    position: 'relative',
  },
  cardContainer: {
    // marginRight: 16,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
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

export default SummerProducts;