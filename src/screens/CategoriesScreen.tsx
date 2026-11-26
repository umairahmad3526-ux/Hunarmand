import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_25_CATEGORIES } from '../data/mockData';
import { ServiceCategory } from '../types';
import { colors } from '../theme/colors';

interface CategoriesScreenProps {
  onSelectCategory: (category: ServiceCategory) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ALL_25_CATEGORIES.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>All 25 Trades & Skills</Text>
        <Text style={styles.subtitle}>Select a category to view background-checked professionals</Text>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search electrician, plumber, carpenter..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 2-Column Grid */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filtered.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.card, { backgroundColor: cat.bgColor }]}
              onPress={() => onSelectCategory(cat)}
              activeOpacity={0.85}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: cat.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {cat.title}
                </Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>
                  {cat.shortDesc}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.workerCount}>{cat.workerCount} pros</Text>
                <View style={[styles.arrowCircle, { backgroundColor: cat.arrowColor }]}>
                  <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
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
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  workerCount: {
    fontSize: 10.5,
    color: '#4B5563',
    fontWeight: '600',
  },
  arrowCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
