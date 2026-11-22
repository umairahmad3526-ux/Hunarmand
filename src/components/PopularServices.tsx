import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ServiceCategory } from '../types';
import { colors } from '../theme/colors';

interface PopularServicesProps {
  services: ServiceCategory[];
  onSelectCategory: (category: ServiceCategory) => void;
  onSeeAll?: () => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({
  services,
  onSelectCategory,
  onSeeAll,
}) => {
  const renderIcon = (service: ServiceCategory) => {
    const iconColor = colors.primaryLight;
    const iconSize = 28;

    if (service.iconType === 'Ionicons') {
      return <Ionicons name={service.iconName as any} size={iconSize} color={iconColor} />;
    }
    return <MaterialCommunityIcons name={service.iconName as any} size={iconSize} color={iconColor} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See all</Text>
          <Ionicons name="chevron-forward" size={14} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Grid: 4 columns */}
      <View style={styles.grid}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.gridItem}
            onPress={() => onSelectCategory(service)}
            activeOpacity={0.75}
          >
            <View style={styles.iconContainer}>
              {renderIcon(service)}
            </View>
            <Text style={styles.serviceTitle} numberOfLines={2}>
              {service.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 14,
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
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: colors.mintLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2EFE6',
    shadowColor: '#1A593A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  serviceTitle: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 15,
  },
});
