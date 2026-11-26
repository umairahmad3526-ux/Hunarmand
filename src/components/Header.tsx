import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
  onPressProfile?: () => void;
  onPressNotifications?: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Ahmad',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  onPressProfile,
  onPressNotifications,
  unreadNotificationsCount = 1,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: User Avatar & Greeting */}
      <TouchableOpacity
        style={styles.profileRow}
        onPress={onPressProfile}
        activeOpacity={0.75}
      >
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.greetingWrapper}>
          <Text style={styles.greetingSub}>Good morning,</Text>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.waveEmoji}> 👋</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Right: Circular Notification Bell */}
      <TouchableOpacity
        style={styles.notificationBtn}
        onPress={onPressNotifications}
        activeOpacity={0.75}
      >
        <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
        {unreadNotificationsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadNotificationsCount}</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  greetingWrapper: {
    justifyContent: 'center',
  },
  greetingSub: {
    fontSize: 12.5,
    color: '#6B7280',
    fontWeight: '400',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  waveEmoji: {
    fontSize: 16,
  },
  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.badgeRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
