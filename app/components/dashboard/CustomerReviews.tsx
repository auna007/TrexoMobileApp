import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent quality! Fast delivery. Will definitely shop again!',
      product: 'Wireless Headset',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2 days ago',
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      comment: 'Good value for money. Packaging could be better.',
      product: 'Smart Watch',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '1 week ago',
    },
    {
      id: 3,
      name: 'Amina Bello',
      rating: 5,
      comment: 'Love my new laptop! Perfect for work and gaming.',
      product: 'Gaming Laptop',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      date: '3 days ago',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>💬 Customer Reviews</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image 
                source={{ uri: review.image }} 
                style={styles.avatar}
              />
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.starsContainer}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            
            <Text style={styles.reviewComment}>"{review.comment}"</Text>
            
            <View style={styles.productInfo}>
              <Text style={styles.productLabel}>Product:</Text>
              <Text style={styles.productName}>{review.product}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All Reviews</Text>
        <Ionicons name="arrow-forward" size={16} color="#D91339" />
      </TouchableOpacity>
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
  scrollContent: {
    paddingRight: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  reviewComment: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginRight: 6,
  },
  productName: {
    color: '#D91339',
    fontSize: 14,
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 8,
  },
  seeAllText: {
    color: '#D91339',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CustomerReviews;