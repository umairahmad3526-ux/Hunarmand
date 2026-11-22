import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const AccountScreen: React.FC = () => {
  const menuItems = [
    { id: '1', title: 'Manage Addresses', subtitle: '221B Baker Street, London', icon: 'location-outline' },
    { id: '2', title: 'Payment Methods', subtitle: 'Cards, UPI, Cash on Delivery', icon: 'card-outline' },
    { id: '3', title: 'Hunarmand Wallet', subtitle: '₹450 Balance Available', icon: 'wallet-outline' },
    { id: '4', title: 'Refer & Earn ₹200', subtitle: 'Invite neighbors and friends', icon: 'gift-outline' },
    { id: '5', title: 'Notifications', subtitle: 'Order status, promotional updates', icon: 'notifications-outline' },
    { id: '6', title: 'Language', subtitle: 'English (US)', icon: 'globe-outline' },
    { id: '7', title: 'Privacy & Terms', subtitle: 'Legal agreements & data safety', icon: 'document-text-outline' },
    { id: '8', title: 'About Hunarmand', subtitle: 'Version 1.0.0 (Build 240)', icon: 'information-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>UA</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>Umair Ahmad</Text>
            <Text style={styles.userPhone}>+92 300 123 4567</Text>
            <View style={styles.badgeWrapper}>
              <Ionicons name="shield-checkmark" size={13} color={colors.primaryLight} />
              <Text style={styles.badgeText}>Hunarmand Gold Member</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => Alert.alert('Edit Profile', 'Profile editor')}
          >
            <Ionicons name="create-outline" size={18} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>

        {/* Worker Mode Switch Banner */}
        <View style={styles.workerSwitchBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.workerTitle}>Are you a skilled technician?</Text>
            <Text style={styles.workerSubtitle}>Join Hunarmand as a service professional and earn up to ₹40,000/month.</Text>
          </View>
          <TouchableOpacity
            style={styles.joinBtn}
            onPress={() => Alert.alert('Join Hunarmand', 'Redirecting to Skilled Worker Partner registration.')}
          >
            <Text style={styles.joinBtnText}>Join as Pro</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Menu List */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuRow}
              onPress={() => Alert.alert(item.title, item.subtitle)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconCircle}>
                <Ionicons name={item.icon as any} size={20} color={colors.primaryLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out of Hunarmand?')}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>Hunarmand Skill Worker Platform • 2026</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userPhone: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 1,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mintLight,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
    gap: 4,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  editProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerSwitchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#124028',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  workerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  workerSubtitle: {
    fontSize: 11,
    color: '#A7F3D0',
    marginTop: 3,
    lineHeight: 15,
  },
  joinBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  joinBtnText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mintLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  menuItemSubtitle: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 16,
    marginBottom: 30,
  },
});
