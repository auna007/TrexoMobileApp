import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProductSkeletonProps {
  count?: number;
  type?: 'grid' | 'list';
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ 
  count = 4, 
  type = 'grid' 
}) => {
  const isGrid = type === 'grid';
  
  const SkeletonItem = () => (
    <View style={isGrid ? styles.gridCard : styles.listCard}>
      <View style={isGrid ? styles.gridImage : styles.listImage} />
      <View style={styles.content}>
        <View style={styles.titleLine} />
        <View style={styles.descriptionLine} />
        <View style={styles.priceLine} />
        {isGrid && <View style={styles.statusLine} />}
      </View>
    </View>
  );

  return (
    <View style={isGrid ? styles.gridContainer : styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  listContainer: {
    marginBottom: 30,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  gridImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  listImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  titleLine: {
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 6,
    width: '70%',
  },
  descriptionLine: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 6,
    width: '90%',
  },
  priceLine: {
    height: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
    width: '40%',
  },
  statusLine: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: 60,
  },
});

export default ProductSkeleton;