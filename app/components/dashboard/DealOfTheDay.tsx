import { useDealOfTheDay } from '@/hooks/useDashboard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlashCountdown } from '../FlashCountdown';

const DealOfTheDay = () => {
  const deal = useDealOfTheDay();
  const router = useRouter();

  if (!deal) {
    return (
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>🔥 Deal of the Day</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Loading...</Text>
          </View>
        </View>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Loading deal of the day...</Text>
        </View>
      </View>
    );
  }

  const handleShopNow = () => {
    router.push({
      pathname: "/product-detail/[id]",
      params: { id: deal.id.toString() },
  });
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Deal of the Day</Text>
        <FlashCountdown endTime={deal.flashEndTime} size="medium" showDays />
      </View>

      <LinearGradient
        colors={["#fff0f3", "#ffe5eb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dealCard}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: deal.image }}
            style={styles.image}
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{deal.discount}% OFF</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{deal.title}</Text>
          <Text style={styles.desc} numberOfLines={1}>{deal.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{deal.price}</Text>
            <Text style={styles.oldPrice}>{deal.oldPrice}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{deal.averageRating.toFixed(1)}</Text>
            <Text style={styles.category}>• {deal.category}</Text>
          </View>
          
          <TouchableOpacity style={styles.buyButton} onPress={handleShopNow}>
            <Text style={styles.buyText}>Shop Now</Text>
            <Ionicons name="cart-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  header: {
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D91339',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  timerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#D91339',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 18,
    marginBottom: 4,
  },
  desc: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  price: {
    color: '#D91339',
    fontWeight: 'bold',
    fontSize: 20,
  },
  oldPrice: {
    color: '#9CA3AF',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  rating: {
    fontWeight: '600',
    color: '#374151',
    marginLeft: 2,
  },
  category: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D91339',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    gap: 8,
  },
  buyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default DealOfTheDay;