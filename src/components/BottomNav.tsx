import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../types';
import { colors } from '../theme/colors';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadMessagesCount?: number;
  activeRequestsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount = 1,
  activeRequestsCount = 1,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Home */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Home')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'Home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'Home' ? colors.primaryLight : '#9CA3AF'}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Home' && styles.activeTabLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* 2. Categories */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Categories')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'Categories' ? 'grid' : 'grid-outline'}
          size={22}
          color={activeTab === 'Categories' ? colors.primaryLight : '#9CA3AF'}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Categories' && styles.activeTabLabel,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>

      {/* 3. Requests */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Requests')}
        activeOpacity={0.8}
      >
        <View style={styles.badgeWrapper}>
          <Ionicons
            name={activeTab === 'Requests' ? 'document-text' : 'document-text-outline'}
            size={22}
            color={activeTab === 'Requests' ? colors.primaryLight : '#9CA3AF'}
          />
          {activeRequestsCount > 0 && <View style={styles.indicatorDot} />}
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Requests' && styles.activeTabLabel,
          ]}
        >
          Requests
        </Text>
      </TouchableOpacity>

      {/* 4. Messages */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Messages')}
        activeOpacity={0.8}
      >
        <View style={styles.badgeWrapper}>
          <Ionicons
            name={activeTab === 'Messages' ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
            size={22}
            color={activeTab === 'Messages' ? colors.primaryLight : '#9CA3AF'}
          />
          {unreadMessagesCount > 0 && (
            <View style={styles.messageCountBadge}>
              <Text style={styles.messageCountText}>{unreadMessagesCount}</Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Messages' && styles.activeTabLabel,
          ]}
        >
          Messages
        </Text>
      </TouchableOpacity>

      {/* 5. Profile */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onSelectTab('Profile')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'Profile' ? 'person' : 'person-outline'}
          size={22}
          color={activeTab === 'Profile' ? colors.primaryLight : '#9CA3AF'}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Profile' && styles.activeTabLabel,
          ]}
        >
          Profile
        </Text>
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
    borderTopColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabLabel: {
    color: colors.primaryLight,
    fontWeight: '700',
  },
  badgeWrapper: {
    position: 'relative',
  },
  indicatorDot: {
    position: 'absolute',
    top: -1,
    right: -2,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.primaryAccent,
  },
  messageCountBadge: {
    position: 'absolute',
    top: -3,
    right: -6,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.badgeRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  messageCountText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
