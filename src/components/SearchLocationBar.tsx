import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface SearchLocationBarProps {
  currentAddress?: string;
  onPress?: () => void;
}

export const SearchLocationBar: React.FC<SearchLocationBarProps> = ({
  currentAddress = '221B Baker Street, London',
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Left: Location Pin inside Circle */}
        <View style={styles.pinCircle}>
          <Ionicons name="location" size={18} color={colors.primaryLight} />
        </View>

        {/* Center: Search / Address details */}
        <View style={styles.textGroup}>
          <Text style={styles.title}>Where do you need service?</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {currentAddress} • Tap to change or search
          </Text>
        </View>

        {/* Right: Chevron */}
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    gap: 12,
  },
  pinCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.mintBanner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  addressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
    fontWeight: '400',
  },
});
