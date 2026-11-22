import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RecommendedService } from '../types';
import { colors } from '../theme/colors';

interface RecommendedServicesProps {
  services: RecommendedService[];
  onSelectService: (service: RecommendedService) => void;
  onBookNow: (service: RecommendedService) => void;
  onViewAll?: () => void;
}

export const RecommendedServices: React.FC<RecommendedServicesProps> = ({
  services,
  onSelectService,
  onBookNow,
  onViewAll,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons name="chevron-forward" size={14} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {services.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Card Image */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onSelectService(item)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              {item.isBestseller && (
                <View style={styles.bestsellerBadge}>
                  <Text style={styles.bestsellerText}>Bestseller</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Card Content */}
            <View style={styles.cardBody}>
              {/* Title */}
              <Text style={styles.serviceTitle} numberOfLines={1}>
                {item.title}
              </Text>

              {/* Rating and Duration */}
              <View style={styles.metaRow}>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={13} color={colors.ratingStar} style={{ marginRight: 3 }} />
                  <Text style={styles.ratingText}>
                    {item.rating} <Text style={styles.reviewsCount}>({item.reviewsCount})</Text>
                  </Text>
                </View>

                <View style={styles.durationBox}>
                  <Ionicons name="time-outline" size={13} color="#6B7280" style={{ marginRight: 3 }} />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>

              {/* Verified Professional Badge */}
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="shield-check-outline" size={14} color={colors.primaryLight} />
                <Text style={styles.verifiedText}>Verified Professional</Text>
              </View>

              {/* Price & Book Now button */}
              <View style={styles.footerRow}>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>
                    {item.currency}{item.price}
                  </Text>
                  <Text style={styles.originalPrice}>
                    {item.currency}{item.originalPrice}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => onBookNow(item)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 2,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 4,
  },
  card: {
    width: 215,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EBF1ED',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  imageWrapper: {
    height: 124,
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  bestsellerText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#1F2937',
  },
  cardBody: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewsCount: {
    fontWeight: '400',
    color: colors.textSecondary,
    fontSize: 11,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 11.5,
    color: '#6B7280',
    fontWeight: '500',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  bookButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 16,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
});
