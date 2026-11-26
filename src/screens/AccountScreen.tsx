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
    { id: '2', title: 'WhatsApp Direct Preferences', subtitle: 'Auto-message & contact settings', icon: 'logo-whatsapp' },
    { id: '3', title: 'Saved Favorite Technicians', subtitle: 'Quick access to trusted pros', icon: 'bookmark-outline' },
    { id: '4', title: 'Refer & Earn', subtitle: 'Invite neighbors and earn service credits', icon: 'gift-outline' },
    { id: '5', title: 'Push Notifications', subtitle: 'Quotation alerts & pro messages', icon: 'notifications-outline' },
    { id: '6', title: 'App Language', subtitle: 'English (UK)', icon: 'globe-outline' },
    { id: '7', title: 'Privacy & Terms', subtitle: 'Skill Worker Code of Conduct', icon: 'document-text-outline' },
    { id: '8', title: 'About Hunarmand', subtitle: 'Version 2.0 • Skill Marketplace', icon: 'information-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AH</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>Ahmad</Text>
            <Text style={styles.userPhone}>+44 7911 123456</Text>
            <View style={styles.badgeWrapper}>
              <Ionicons name="shield-checkmark" size={13} color={colors.primaryLight} />
              <Text style={styles.badgeText}>Hunarmand Verified Customer</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => Alert.alert('Edit Profile', 'Profile editor')}
          >
            <Ionicons name="create-outline" size={18} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>

        {/* Worker Mode Switch Banner matching the reference dark green aesthetic */}
        <View style={styles.workerSwitchBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.workerTitle}>Are you a skilled technician?</Text>
            <Text style={styles.workerSubtitle}>
              Join Hunarmand as a service professional. Get direct WhatsApp leads with 0% platform commission.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.joinBtn}
            onPress={() => Alert.alert('Join Hunarmand Pro', 'Redirecting to Skilled Worker Partner verification.')}
            activeOpacity={0.85}
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
                <Ionicons name={item.icon as any} size={19} color={colors.primaryLight} />
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
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>Hunarmand Skill Worker Marketplace • 2026</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 19,
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
    backgroundColor: colors.mintBanner,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerSwitchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 20,
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
    backgroundColor: colors.primaryAccent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 20,
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.mintBanner,
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
    marginHorizontal: 20,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
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
