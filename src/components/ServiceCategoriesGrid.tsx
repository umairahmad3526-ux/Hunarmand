import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceCategory } from '../types';
import { colors } from '../theme/colors';

interface ServiceCategoriesGridProps {
  categories: ServiceCategory[];
  onSelectCategory: (category: ServiceCategory) => void;
  onViewAll?: () => void;
}

export const ServiceCategoriesGrid: React.FC<ServiceCategoriesGridProps> = ({
  categories,
  onSelectCategory,
  onViewAll,
}) => {
  const [showAll, setShowAll] = useState(false);

  // By default display the primary featured trades, with toggle to expand all 25!
  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <View style={styles.container}>
      {/* Section Header matching Reference Image */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>What do you need today?</Text>
        <TouchableOpacity
          style={styles.seeAllBtn}
          onPress={() => {
            setShowAll(!showAll);
            if (onViewAll) onViewAll();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>
            {showAll ? 'Show less' : `All ${categories.length} trades >`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2-Column Grid Layout matching Reference Image */}
      <View style={styles.grid}>
        {displayedCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: category.bgColor }]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.85}
          >
            {/* Centered Image / Illustration */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: category.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>

            {/* Category Title & Subtitle */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {category.title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {category.shortDesc}
              </Text>
            </View>

            {/* Bottom Row with Worker Count & Circular Arrow Action */}
            <View style={styles.cardFooter}>
              <Text style={styles.workerCountText}>{category.workerCount} verified</Text>
              <View style={[styles.arrowCircle, { backgroundColor: category.arrowColor }]}>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  seeAllBtn: {
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 12.5,
    color: colors.primaryLight,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  card: {
    width: '48%',
    borderRadius: 22,
    padding: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  imageWrapper: {
    height: 94,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  workerCountText: {
    fontSize: 10.5,
    color: '#4B5563',
    fontWeight: '600',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
