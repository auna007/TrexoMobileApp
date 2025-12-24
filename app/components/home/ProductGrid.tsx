import { TransformedProduct } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 16px padding on each side, 16px gap

interface ProductGridProps {
  products: TransformedProduct[];
  onProductPress?: (product: TransformedProduct) => void;
  showStatus?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductPress,
  showStatus = true 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return '#10B981';
      case 'Trending': return '#F59E0B';
      case 'Summer': return '#3B82F6';
      case 'Flash Sale': return '#EF4444';
      case 'Limited': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const handlePress = (product: TransformedProduct) => {
    onProductPress?.(product);
  };

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          onPress={() => handlePress(product)}
          activeOpacity={0.8}
        >
          {/* Product Image */}
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
          
          {/* Status Badge */}
          {showStatus && product.status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
              <Text style={styles.statusText}>{product.status}</Text>
            </View>
          )}
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingText}>{product.averageRating.toFixed(1)}</Text>
          </View>
          
          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {product.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
            
            {/* Price and Stock */}
            <View style={styles.footer}>
              <Text style={styles.price}>{product.price}</Text>
              <View style={styles.stockContainer}>
                {product.isInStock ? (
                  <Text style={styles.inStock}>In Stock</Text>
                ) : (
                  <Text style={styles.outOfStock}>Out of Stock</Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    // paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
    color: '#374151',
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  stockContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inStock: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
  },
  outOfStock: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '500',
  },
});

export default ProductGrid;