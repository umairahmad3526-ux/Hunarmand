import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface HeaderProps {
  currentAddress?: string;
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
  onPressCart?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentAddress = '221B Baker Street, London',
  onPressLocation,
  onPressNotifications,
  onPressCart,
  cartCount = 0,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Location selection */}
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={onPressLocation}
        activeOpacity={0.7}
      >
        <View style={styles.locationPinWrapper}>
          <Ionicons name="location-sharp" size={22} color={colors.primaryLight} />
        </View>
        <View style={styles.locationTextWrapper}>
          <View style={styles.addressRow}>
            <Text style={styles.addressText} numberOfLines={1}>
              {currentAddress}
            </Text>
            <Ionicons name="chevron-down" size={15} color={colors.textPrimary} style={styles.chevron} />
          </View>
          <Text style={styles.deliverySubtext}>Delivering to your location</Text>
        </View>
      </TouchableOpacity>

      {/* Right: Actions (Notification & Cart) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onPressNotifications}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onPressCart}
          activeOpacity={0.7}
        >
          <Ionicons name="cart-outline" size={20} color={colors.textPrimary} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  locationPinWrapper: {
    marginRight: 8,
    marginTop: 2,
  },
  locationTextWrapper: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    maxWidth: '85%',
    letterSpacing: -0.2,
  },
  chevron: {
    marginLeft: 4,
  },
  deliverySubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
    fontWeight: '400',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 4,
    height: 16,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
