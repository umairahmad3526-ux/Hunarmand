import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CHAT_THREADS } from '../data/mockData';
import { ChatThread } from '../types';
import { colors } from '../theme/colors';

export const MessagesScreen: React.FC = () => {
  const handleOpenWhatsAppChat = (thread: ChatThread) => {
    const cleanNumber = thread.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Unable to open WhatsApp', `Please contact ${thread.workerName} at ${thread.displayPhone}`);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Direct Chats</Text>
          <Text style={styles.subtitle}>Direct WhatsApp conversations with technicians</Text>
        </View>
        <View style={styles.whatsappBrandPill}>
          <Ionicons name="logo-whatsapp" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.whatsappBrandText}>WhatsApp Sync</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {MOCK_CHAT_THREADS.map((thread) => (
          <TouchableOpacity
            key={thread.id}
            style={styles.chatCard}
            onPress={() => handleOpenWhatsAppChat(thread)}
            activeOpacity={0.75}
          >
            {/* Avatar & Verified Badge */}
            <View style={styles.avatarWrap}>
              <Image source={{ uri: thread.workerAvatar }} style={styles.avatar} />
              <View style={styles.verifiedDot}>
                <Ionicons name="checkmark" size={9} color="#FFFFFF" />
              </View>
            </View>

            {/* Chat info */}
            <View style={styles.chatInfo}>
              <View style={styles.topRow}>
                <Text style={styles.workerName}>{thread.workerName}</Text>
                <Text style={styles.timeText}>{thread.time}</Text>
              </View>

              <View style={styles.tradeBadgeRow}>
                <Text style={styles.tradeBadgeText}>{thread.categoryTitle}</Text>
              </View>

              <Text style={styles.lastMessage} numberOfLines={1}>
                {thread.lastMessage}
              </Text>
            </View>

            {/* Right Action */}
            <View style={styles.rightAction}>
              <View style={styles.waIconCircle}>
                <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
              </View>
              {thread.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{thread.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Info card */}
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primaryLight} />
          <Text style={styles.infoText}>
            All chats are conducted securely on WhatsApp with verified technicians. Your personal number is never shared with unverified 3rd parties.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  whatsappBrandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  whatsappBrandText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollBody: {
    padding: 18,
    gap: 12,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#16A34A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatInfo: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerName: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  timeText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  tradeBadgeRow: {
    alignSelf: 'flex-start',
    backgroundColor: colors.mintBanner,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 4,
  },
  tradeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  lastMessage: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
  },
  rightAction: {
    alignItems: 'center',
    gap: 4,
  },
  waIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  unreadBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.badgeRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
    flex: 1,
  },
});
