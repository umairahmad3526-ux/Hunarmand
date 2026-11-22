import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const TrustBadges: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Verified Professionals */}
      <View style={styles.badgeItem}>
        <View style={styles.iconCircle}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primaryLight} />
        </View>
        <Text style={styles.badgeLabel}>Verified{'\n'}Professionals</Text>
      </View>

      {/* 2. Transparent Pricing */}
      <View style={styles.badgeItem}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="currency-inr" size={20} color={colors.primaryLight} />
        </View>
        <Text style={styles.badgeLabel}>Transparent{'\n'}Pricing</Text>
      </View>

      {/* 3. Up to 30 Days Warranty */}
      <View style={styles.badgeItem}>
        <View style={styles.warrantyBox}>
          <Text style={styles.warrantyNumber}>30</Text>
        </View>
        <Text style={styles.badgeLabel}>Up to 30 Days{'\n'}Warranty</Text>
      </View>

      {/* 4. Live Tracking */}
      <View style={styles.badgeItem}>
        <View style={styles.iconCircle}>
          <Ionicons name="navigate-outline" size={20} color={colors.primaryLight} />
        </View>
        <Text style={styles.badgeLabel}>Live{'\n'}Tracking</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  badgeItem: {
    alignItems: 'center',
    width: '23%',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F9F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2EFE6',
  },
  warrantyBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F0F9F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  warrantyNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  badgeLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 13,
  },
});
