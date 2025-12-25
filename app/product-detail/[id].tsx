import { useCart } from "@/contexts/CartContext";
import { useProductDetail, useProducts } from "@/hooks/useProducts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { FlashCountdown } from "../components/FlashCountdown";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import ThemedView from "../components/ThemedView";

const { width } = Dimensions.get("window");

const ProductDetail: React.FC = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    
    const productId = Number(params.id);
    const { 
        data: product, 
        isLoading, 
        error, 
        refetch 
    } = useProductDetail(productId);
    
    // Get related products
    const { data: relatedProducts = [] } = useProducts({
        category_id: product?.categoryId,
        limit: 4,
        // exclude_id: productId,
    });

    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    // Handle share product
    const handleShareProduct = async () => {
        if (!product) return;
        
        try {
            await Share.share({
                message: `Check out ${product.title} on Trexo Mall: ${product.price}`,
                title: product.title,
                url: `https://trexoexpress.com/product/${product.id}`,
            });
        } catch (error) {
            console.error('Error sharing product:', error);
        }
    };

    // Handle add to cart
    const handleAddToCart = () => {
        if (!product) return;
        
        if (!product.isInStock) {
            Alert.alert("Out of Stock", "This product is currently out of stock.");
            return;
        }

        addToCart({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
            image: product.image,
            quantity,
            maxQuantity: product.quantity,
        });
        
        Alert.alert(
            "Added to Cart",
            `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${product.title}" to your cart.`,
            [
                { text: "Continue Shopping", style: "cancel" },
                { text: "View Cart", onPress: () => router.push("/cart") }
            ]
        );
    };

    // Handle buy now
    const handleBuyNow = () => {
        if (!product) return;
        
        if (!product.isInStock) {
            Alert.alert("Out of Stock", "This product is currently out of stock.");
            return;
        }

        addToCart({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
            image: product.image,
            quantity,
            maxQuantity: product.quantity,
            isFlashSale: product.isFlashSale,
            flashEndTime: product.flashEndTime,
        });
        
        router.push("/cart");
    };

    // Handle quantity change
    const increaseQuantity = () => {
        if (!product) return;
        
        if (quantity < product.quantity) {
            setQuantity(prev => prev + 1);
        } else {
            Alert.alert("Max Quantity", `Only ${product.quantity} items available in stock.`);
        }
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    // Handle image scroll
    const handleImageScroll = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / (width - 40));
        setActiveImageIndex(index);
    };

    // Navigate to related product
    const handleRelatedProductPress = (relatedProductId: number) => {
        router.push({
            pathname: "/product-detail/[id]",
            params: { id: relatedProductId.toString() },
        });
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    if (isLoading) {
        return (
            <ThemedView>
                <ScrollView contentContainerStyle={styles.loadingContainer}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={28} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/cart")} style={styles.cartBtn}>
                            <Ionicons name="cart-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ProductSkeleton count={1} type="list" />
                </ScrollView>
            </ThemedView>
        );
    }

    if (error || !product) {
        return (
            <ThemedView>
                <ScrollView contentContainerStyle={styles.errorContainer}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={28} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.errorContent}>
                        <Ionicons name="sad-outline" size={64} color="#D91339" />
                        <Text style={styles.errorTitle}>Product Not Found</Text>
                        <Text style={styles.errorMessage}>
                            The product you're looking for doesn't exist or has been removed.
                        </Text>
                        <TouchableOpacity 
                            style={styles.retryButton}
                            onPress={() => refetch()}
                        >
                            <Text style={styles.retryText}>Try Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.backText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ThemedView>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    const discountPercentage = product.discount || 0;
    const originalPrice = product.oldPrice || `₦${product.originalPrice.toLocaleString('en-NG')}`;

    return (
        <ThemedView>
            <ScrollView 
                ref={scrollViewRef}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="arrow-back" size={28} color="#333" />
                    </TouchableOpacity>
                    
                    <View style={styles.topBarActions}>
                        <TouchableOpacity 
                            style={[styles.iconButton, styles.shareButton]}
                            onPress={handleShareProduct}
                        >
                            <Ionicons name="share-outline" size={22} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.iconButton, styles.wishlistButton]}
                            onPress={() => {/* Add to wishlist */}}
                        >
                            <Ionicons name="heart-outline" size={22} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.iconButton, styles.cartBtn]}
                            onPress={() => router.push("/cart")}
                        >
                            <Ionicons name="cart-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Flash Sale Timer */}
                {/* product.isFlashSale && */}
                {product.flashEndTime && (
                    <View style={styles.flashSaleContainer}>
                        <FlashCountdown 
                            endTime={product.flashEndTime} 
                            size="medium"
                            showIcon
                            showLabels
                            showDays
                        />
                        <Text style={styles.flashSaleText}>🔥 Flash Sale Ends In</Text>
                    </View>
                )}

                {/* Product Images Carousel */}
                <View style={styles.carouselContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleImageScroll}
                        decelerationRate="fast"
                        snapToInterval={width - 40}
                        snapToAlignment="center"
                    >
                        {images.map((img, idx) => (
                            <View key={idx} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: img }}
                                    style={styles.image}
                                    resizeMode="contain"
                                    defaultSource={{ uri: 'https://via.placeholder.com/150' }}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Image Indicators */}
                    <View style={styles.imageIndicatorContainer}>
                        {images.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.imageIndicator,
                                    i === activeImageIndex && styles.activeImageIndicator,
                                ]}
                            />
                        ))}
                    </View>

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{discountPercentage}%</Text>
                        </View>
                    )}

                    {/* Stock Status Badge */}
                    {!product.isInStock && (
                        <View style={styles.outOfStockBadge}>
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    
                    {/* Rating & Category */}
                    <View style={styles.metaContainer}>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={18} color="#FFD700" />
                            <Text style={styles.ratingText}>{product.averageRating.toFixed(1)}</Text>
                            <Text style={styles.reviewCount}>({Math.floor(Math.random() * 100) + 1} reviews)</Text>
                        </View>
                        <View style={styles.categoryContainer}>
                            <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                            <Text style={styles.categoryText}>{product.category}</Text>
                        </View>
                    </View>

                    {/* Price Section */}
                    <View style={styles.priceContainer}>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{product.price}</Text>
                            {discountPercentage > 0 && (
                                <Text style={styles.oldPrice}>{originalPrice}</Text>
                            )}
                        </View>
                        {product.isFlashSale && (
                            <View style={styles.flashBadge}>
                                <Ionicons name="flash" size={14} color="#fff" />
                                <Text style={styles.flashBadgeText}>FLASH SALE</Text>
                            </View>
                        )}
                    </View>

                    {/* Stock Status */}
                    <View style={styles.stockContainer}>
                        <Ionicons 
                            name={product.isInStock ? "checkmark-circle" : "close-circle"} 
                            size={18} 
                            color={product.isInStock ? "#10B981" : "#EF4444"} 
                        />
                        <Text style={[
                            styles.stockText,
                            { color: product.isInStock ? "#10B981" : "#EF4444" }
                        ]}>
                            {product.isInStock 
                                ? `${product.quantity} items available in stock` 
                                : 'Currently out of stock'
                            }
                        </Text>
                    </View>
                </View>

                {/* Description Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>

                {/* Specifications Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Specifications</Text>
                    <View style={styles.specsGrid}>
                        <View style={styles.specItem}>
                            <Ionicons name="cube-outline" size={18} color="#6B7280" />
                            <Text style={styles.specLabel}>Product ID:</Text>
                            <Text style={styles.specValue}>{product.id}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Ionicons name="layers-outline" size={18} color="#6B7280" />
                            <Text style={styles.specLabel}>Category:</Text>
                            <Text style={styles.specValue}>{product.category}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <MaterialIcons name="category" size={18} color="#6B7280" />
                            <Text style={styles.specLabel}>Type:</Text>
                            <Text style={styles.specValue}>{product.type}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                            <Text style={styles.specLabel}>Added:</Text>
                            <Text style={styles.specValue}>
                                {new Date(product.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Related Products</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.relatedProductsContainer}
                        >
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <TouchableOpacity 
                                    key={relatedProduct.id}
                                    style={styles.relatedProductCard}
                                    onPress={() => handleRelatedProductPress(relatedProduct.id)}
                                    activeOpacity={0.8}
                                >
                                    <Image 
                                        source={{ uri: relatedProduct.image }} 
                                        style={styles.relatedProductImage}
                                        defaultSource={{ uri: 'https://via.placeholder.com/150' }}
                                    />
                                    <Text style={styles.relatedProductTitle} numberOfLines={1}>
                                        {relatedProduct.title}
                                    </Text>
                                    <Text style={styles.relatedProductPrice}>{relatedProduct.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Quantity Selector */}
                <View style={styles.quantitySection}>
                    <Text style={styles.quantityLabel}>Quantity:</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity 
                            onPress={decreaseQuantity} 
                            style={styles.qtyBtn}
                            disabled={quantity === 1}
                        >
                            <Ionicons 
                                name="remove-outline" 
                                size={28} 
                                color={quantity === 1 ? "#9CA3AF" : "#D91339"} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity 
                            onPress={increaseQuantity} 
                            style={styles.qtyBtn}
                            disabled={!product.isInStock || quantity >= product.quantity}
                        >
                            <Ionicons 
                                name="add-outline" 
                                size={28} 
                                color={(!product.isInStock || quantity >= product.quantity) ? "#9CA3AF" : "#D91339"} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.addToCartButton,
                            !product.isInStock && styles.disabledButton
                        ]}
                        onPress={handleAddToCart}
                        disabled={!product.isInStock}
                        activeOpacity={0.8}
                    >
                        <Ionicons 
                            name="cart" 
                            size={20} 
                            color="#fff" 
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.addToCartText}>
                            {product.isInStock ? 'Add to Cart' : 'Out of Stock'}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.buyNowButton,
                            !product.isInStock && styles.disabledButton
                        ]}
                        onPress={handleBuyNow}
                        disabled={!product.isInStock}
                        activeOpacity={0.8}
                    >
                        <Ionicons 
                            name="flash" 
                            size={20} 
                            color="#fff" 
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buyNowText}>
                            {product.isInStock ? 'Buy Now' : 'Unavailable'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Shipping Info */}
                <View style={styles.shippingInfo}>
                    <View style={styles.shippingItem}>
                        <Ionicons name="shield-checkmark-outline" size={18} color="#10B981" />
                        <Text style={styles.shippingText}>Verified Seller</Text>
                    </View>
                    <View style={styles.shippingItem}>
                        <Ionicons name="car-outline" size={18} color="#3B82F6" />
                        <Text style={styles.shippingText}>Free Shipping</Text>
                    </View>
                    <View style={styles.shippingItem}>
                        <Ionicons name="refresh-outline" size={18} color="#8B5CF6" />
                        <Text style={styles.shippingText}>30-Day Returns</Text>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    errorContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 20,
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#D91339',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        width: '80%',
        alignItems: 'center',
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    backText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    topBarActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    shareButton: {
        backgroundColor: '#F3F4F6',
    },
    wishlistButton: {
        backgroundColor: '#FEF2F2',
    },
    cartBtn: {
        backgroundColor: '#D91339',
    },
    flashSaleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5F5',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
    },
    flashSaleText: {
        color: '#D91339',
        fontWeight: '600',
        fontSize: 14,
    },
    carouselContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    imageWrapper: {
        width: width - 40,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        gap: 6,
    },
    imageIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
    },
    activeImageIndicator: {
        backgroundColor: '#D91339',
        width: 24,
    },
    discountBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#D91339',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    discountText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    outOfStockBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    outOfStockText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
        lineHeight: 34,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    reviewCount: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 4,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 12,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#D91339',
    },
    oldPrice: {
        fontSize: 20,
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
    },
    flashBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    flashBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    stockText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
    },
    specsGrid: {
        gap: 12,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
    },
    specLabel: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
        width: 100,
    },
    specValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
        flex: 1,
    },
    relatedProductsContainer: {
        paddingRight: 20,
        gap: 16,
    },
    relatedProductCard: {
        width: 140,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    relatedProductImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    relatedProductTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 4,
    },
    relatedProductPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D91339',
    },
    quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    qtyBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    quantity: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        minWidth: 40,
        textAlign: 'center',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D91339',
        paddingVertical: 18,
        borderRadius: 14,
        gap: 10,
        shadowColor: '#D91339',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
    },
    buyNowButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
        paddingVertical: 18,
        borderRadius: 14,
        gap: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
    },
    disabledButton: {
        backgroundColor: '#9CA3AF',
        shadowOpacity: 0,
    },
    buttonIcon: {
        marginRight: 4,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buyNowText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    shippingInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        marginTop: 8,
    },
    shippingItem: {
        alignItems: 'center',
        gap: 6,
    },
    shippingText: {
        fontSize: 12,
        color: '#6B7280',
    },
});

export default ProductDetail;