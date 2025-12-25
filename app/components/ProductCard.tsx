import { TransformedProduct } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: TransformedProduct;
  type?: 'horizontal' | 'vertical' | 'compact';
  onPress?: (product: TransformedProduct) => void;
  showDiscount?: boolean;
  showRating?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  type = 'vertical',
  onPress,
  showDiscount = true,
  showRating = true,
}) => {
  const handlePress = () => {
    onPress?.(product);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return '#10B981';
      case 'Trending': return '#F59E0B';
      case 'Summer': return '#3B82F6';
      case 'Flash Sale': return '#EF4444';
      case 'Deal': return '#D91339';
      case 'Limited': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const renderDiscountBadge = () => {
    if (!product.discount || !showDiscount) return null;
    
    return (
      <View style={[styles.discountBadge, { backgroundColor: getStatusColor(product.status) }]}>
        <Text style={styles.discountText}>{product.discount}% OFF</Text>
      </View>
    );
  };

  const renderRating = () => {
    if (!showRating || product.averageRating === 0) return null;
    
    return (
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={12} color="#F59E0B" />
        <Text style={styles.ratingText}>{product.averageRating.toFixed(1)}</Text>
      </View>
    );
  };

  const renderStatusBadge = () => {
    if (!product.status) return null;
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
        <Text style={styles.statusText}>{product.status}</Text>
      </View>
    );
  };

  if (type === 'horizontal') {
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.horizontalImageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.horizontalImage}
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
          {renderDiscountBadge()}
        </View>
        
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>{product.oldPrice}</Text>
            )}
          </View>
          
          {renderRating()}
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.compactImageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.compactImage}
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
          {renderDiscountBadge()}
        </View>
        
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>{product.title}</Text>
          <Text style={styles.price}>{product.price}</Text>
          {renderRating()}
        </View>
      </TouchableOpacity>
    );
  }

  // Default vertical card
  return (
    <TouchableOpacity
      style={styles.verticalCard}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          defaultSource={{ uri: 'https://via.placeholder.com/150' }}
        />
        {renderDiscountBadge()}
        {renderRating()}
        {renderStatusBadge()}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price}</Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>{product.oldPrice}</Text>
          )}
        </View>
        
        <View style={styles.stockContainer}>
          {product.isInStock ? (
            <Text style={styles.inStock}>In Stock</Text>
          ) : (
            <Text style={styles.outOfStock}>Out of Stock</Text>
          )}
          <Text style={styles.category}>{product.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Vertical Card Styles
  verticalCard: {
    width: (width - 48) / 2,
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
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D91339',
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inStock: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  outOfStock: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '500',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  category: {
    fontSize: 10,
    color: '#6B7280',
  },
  
  // Horizontal Card Styles
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 12,
  },
  horizontalImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  horizontalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  
  // Compact Card Styles
  compactCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
    marginRight: 12,
    width: (width - 48) / 2,
  },
  compactImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  compactImage: {
    width: '100%',
    height: 80,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  compactContent: {
    alignItems: 'flex-start',
  },
  compactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  // Common Styles
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
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
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default ProductCard;