import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../types';
import { colors } from '../theme/colors';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  bookingBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  bookingBadgeCount = 1,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Home Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Home')}
        activeOpacity={0.8}
      >
        {activeTab === 'Home' ? (
          <View style={styles.activePill}>
            <Ionicons name="home" size={20} color={colors.primaryLight} />
            <Text style={styles.activeText}>Home</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <Ionicons name="home-outline" size={22} color="#9CA3AF" />
            <Text style={styles.inactiveText}>Home</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 2. Bookings Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Bookings')}
        activeOpacity={0.8}
      >
        {activeTab === 'Bookings' ? (
          <View style={styles.activePill}>
            <Ionicons name="calendar" size={20} color={colors.primaryLight} />
            <Text style={styles.activeText}>Bookings</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <View style={styles.badgeWrapper}>
              <Ionicons name="calendar-outline" size={22} color="#9CA3AF" />
              {bookingBadgeCount > 0 && <View style={styles.tabDot} />}
            </View>
            <Text style={styles.inactiveText}>Bookings</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 3. Support Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Support')}
        activeOpacity={0.8}
      >
        {activeTab === 'Support' ? (
          <View style={styles.activePill}>
            <Ionicons name="headset" size={20} color={colors.primaryLight} />
            <Text style={styles.activeText}>Support</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <Ionicons name="headset-outline" size={22} color="#9CA3AF" />
            <Text style={styles.inactiveText}>Support</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 4. Account Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Account')}
        activeOpacity={0.8}
      >
        {activeTab === 'Account' ? (
          <View style={styles.activePill}>
            <Ionicons name="person" size={20} color={colors.primaryLight} />
            <Text style={styles.activeText}>Account</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <Ionicons name="person-outline" size={22} color="#9CA3AF" />
            <Text style={styles.inactiveText}>Account</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mintLight,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  activeText: {
    color: colors.primaryLight,
    fontSize: 12.5,
    fontWeight: '700',
  },
  inactiveWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  inactiveText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '500',
  },
  badgeWrapper: {
    position: 'relative',
  },
  tabDot: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.primaryLight,
  },
});
