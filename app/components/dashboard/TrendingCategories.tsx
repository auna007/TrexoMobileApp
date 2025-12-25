import { useCategories } from '@/hooks/useCategories';
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const TrendingCategories = () => {
  const router = useRouter();
  const { data: categories = [], isLoading } = useCategories();

  // Map category names to icons
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    
    if (name.includes('electronics') || name.includes('computer')) {
      return <MaterialIcons name="devices" size={20} color="#D91339" />;
    }
    if (name.includes('fashion') || name.includes('apparel')) {
      return <Ionicons name="shirt-outline" size={20} color="#D91339" />;
    }
    if (name.includes('home') || name.includes('kitchen') || name.includes('furniture')) {
      return <MaterialIcons name="kitchen" size={20} color="#D91339" />;
    }
    if (name.includes('gadgets') || name.includes('mobile')) {
      return <FontAwesome5 name="mobile-alt" size={18} color="#D91339" />;
    }
    if (name.includes('accessories') || name.includes('bags') || name.includes('cases')) {
      return <Feather name="watch" size={20} color="#D91339" />;
    }
    if (name.includes('beauty') || name.includes('health')) {
      return <Ionicons name="rose-outline" size={20} color="#D91339" />;
    }
    if (name.includes('auto') || name.includes('motor')) {
      return <Ionicons name="car-outline" size={20} color="#D91339" />;
    }
    if (name.includes('art') || name.includes('craft')) {
      return <MaterialCommunityIcons name="palette" size={20} color="#D91339" />;
    }
    if (name.includes('packaging') || name.includes('printing')) {
      return <MaterialIcons name="local-shipping" size={20} color="#D91339" />;
    }
    
    return <Ionicons name="grid-outline" size={20} color="#D91339" />;
  };

  if (isLoading) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>🔥 Trending Categories</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
        <Text style={styles.title}>🔥 Trending Categories</Text>
        <View style={styles.categoryGrid}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    style={styles.categoryCard}
                    onPress={() => router.push(`/categories/${item.id}`)}
                >
                    <View style={styles.iconContainer}>{getCategoryIcon(item.name)}</View>
                    <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#111",
      marginBottom: 15,
  },
  categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 12,
  },
  categoryCard: {
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      width: "48%",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 0.5,
      borderColor: "#f5f5f5",
  },
  iconContainer: {
      backgroundColor: "#ffe8eb",
      padding: 8,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
  },
  categoryText: {
      color: "#333",
      fontWeight: "600",
      fontSize: 14,
      textOverflow: "ellipsis",
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

export default TrendingCategories;