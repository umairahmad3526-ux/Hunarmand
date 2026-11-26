import React, { useState } from 'react';
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
import { MOCK_WORK_REQUESTS } from '../data/mockData';
import { WorkRequest } from '../types';
import { colors } from '../theme/colors';

export const RequestsScreen: React.FC = () => {
  const [requests, setRequests] = useState<WorkRequest[]>(MOCK_WORK_REQUESTS);

  const handleCreateRequest = () => {
    Alert.alert(
      'Post New Job Request',
      'What service do you need? (Electrician, Plumber, AC Repair etc.)',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit Request',
          onPress: () => {
            const newReq: WorkRequest = {
              id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
              title: 'Emergency Electrical Wiring Inspection',
              categoryTitle: 'Electrician',
              description: 'Circuit breaker tripped twice today. Need urgent checkup.',
              status: 'in_review',
              date: 'Just now',
              budgetEstimate: '₹1,000 - ₹1,500',
              address: '221B Baker Street, London',
              proposalsCount: 1,
            };
            setRequests([newReq, ...requests]);
            Alert.alert('Posted!', 'Your work request is live. Local technicians are being notified.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Work Requests</Text>
          <Text style={styles.subtitle}>Direct quotes from verified local workers</Text>
        </View>

        <TouchableOpacity
          style={styles.newRequestBtn}
          onPress={handleCreateRequest}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={16} color="#FFFFFF" style={{ marginRight: 2 }} />
          <Text style={styles.newRequestBtnText}>Post Work</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {requests.map((item) => {
          const isPending = item.status === 'in_review' || item.status === 'pending';
          const isConnected = item.status === 'connected';

          return (
            <View key={item.id} style={styles.requestCard}>
              {/* Header row */}
              <View style={styles.cardTopRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{item.categoryTitle}</Text>
                </View>

                <View
                  style={[
                    styles.statusPill,
                    isPending
                      ? styles.statusPending
                      : isConnected
                      ? styles.statusConnected
                      : styles.statusCompleted,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusPillText,
                      isPending
                        ? styles.statusPendingText
                        : isConnected
                        ? styles.statusConnectedText
                        : styles.statusCompletedText,
                    ]}
                  >
                    {isPending ? '● AWAITING QUOTES' : isConnected ? '✓ CONNECTED' : '✓ COMPLETED'}
                  </Text>
                </View>
              </View>

              {/* Title & Description */}
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>

              {/* Budget & Meta */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="cash-outline" size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{item.budgetEstimate}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{item.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={14} color={colors.primaryLight} />
                  <Text style={[styles.metaText, { color: colors.primaryLight, fontWeight: '700' }]}>
                    {item.proposalsCount} proposals
                  </Text>
                </View>
              </View>

              {/* Location */}
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                <Text style={styles.locationText} numberOfLines={1}>{item.address}</Text>
              </View>

              {/* Actions */}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.whatsappActionBtn}
                  onPress={() => Alert.alert('WhatsApp Proposals', `You have ${item.proposalsCount} verified technicians ready to chat on WhatsApp.`)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.whatsappActionText}>View Worker Quotes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => Alert.alert('Manage Request', 'Edit request details or close listing.')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="ellipsis-horizontal" size={16} color="#4B5563" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAF8',
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
  newRequestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  newRequestBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  scrollBody: {
    padding: 18,
    gap: 14,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.mintBanner,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  statusPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusConnected: {
    backgroundColor: '#E0F2FE',
  },
  statusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusPillText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  statusPendingText: {
    color: '#92400E',
  },
  statusConnectedText: {
    color: '#0369A1',
  },
  statusCompletedText: {
    color: '#15803D',
  },
  cardTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 12.5,
    color: '#4B5563',
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 11.5,
    color: '#9CA3AF',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  whatsappActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 14,
  },
  whatsappActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  cancelBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
