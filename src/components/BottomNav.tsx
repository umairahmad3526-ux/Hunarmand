import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../types';
import { colors } from '../theme/colors';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Home / Services Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Home')}
        activeOpacity={0.8}
      >
        {activeTab === 'Home' ? (
          <View style={styles.activePill}>
            <Ionicons name="construct" size={19} color={colors.primaryLight} />
            <Text style={styles.activeText}>Services</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <Ionicons name="construct-outline" size={22} color="#9CA3AF" />
            <Text style={styles.inactiveText}>Services</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 2. Support Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Support')}
        activeOpacity={0.8}
      >
        {activeTab === 'Support' ? (
          <View style={styles.activePill}>
            <Ionicons name="headset" size={19} color={colors.primaryLight} />
            <Text style={styles.activeText}>Support</Text>
          </View>
        ) : (
          <View style={styles.inactiveWrapper}>
            <Ionicons name="headset-outline" size={22} color="#9CA3AF" />
            <Text style={styles.inactiveText}>Support</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 3. Account Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Account')}
        activeOpacity={0.8}
      >
        {activeTab === 'Account' ? (
          <View style={styles.activePill}>
            <Ionicons name="person" size={19} color={colors.primaryLight} />
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  activeText: {
    color: colors.primaryLight,
    fontSize: 13,
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
});
