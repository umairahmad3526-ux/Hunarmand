import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Booking } from '../types';
import { colors } from '../theme/colors';

interface BookingsScreenProps {
  bookings: Booking[];
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({ bookings }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'active') return b.status === 'in_progress' || b.status === 'confirmed';
    if (activeFilter === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Track upcoming & past services</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeFilter === 'all' && styles.activeTabItem]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.tabLabel, activeFilter === 'all' && styles.activeTabLabel]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeFilter === 'active' && styles.activeTabItem]}
          onPress={() => setActiveFilter('active')}
        >
          <Text style={[styles.tabLabel, activeFilter === 'active' && styles.activeTabLabel]}>
            Active (1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeFilter === 'completed' && styles.activeTabItem]}
          onPress={() => setActiveFilter('completed')}
        >
          <Text style={[styles.tabLabel, activeFilter === 'completed' && styles.activeTabLabel]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {filteredBookings.map((booking) => {
          const isActive = booking.status === 'in_progress' || booking.status === 'confirmed';

          return (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Top row */}
              <View style={styles.cardTopRow}>
                <View>
                  <Text style={styles.bookingId}>Order #{booking.id}</Text>
                  <Text style={styles.serviceName}>{booking.serviceTitle}</Text>
                </View>
                <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.completedBadge]}>
                  <Text style={[styles.statusText, isActive ? styles.activeStatusText : styles.completedStatusText]}>
                    {isActive ? '● IN PROGRESS' : '✓ COMPLETED'}
                  </Text>
                </View>
              </View>

              {/* Progress Tracker for Active Booking */}
              {isActive && (
                <View style={styles.trackerBox}>
                  <View style={styles.trackerRow}>
                    <View style={styles.stepCircleActive}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                    <View style={styles.stepLineActive} />
                    <View style={styles.stepCircleActive}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                    <View style={styles.stepLineActive} />
                    <View style={styles.stepCircleCurrent}>
                      <Ionicons name="bicycle" size={14} color="#FFFFFF" />
                    </View>
                    <View style={styles.stepLineInactive} />
                    <View style={styles.stepCircleInactive} />
                  </View>
                  <View style={styles.trackerLabelsRow}>
                    <Text style={styles.trackerStepLabel}>Confirmed</Text>
                    <Text style={styles.trackerStepLabel}>Assigned</Text>
                    <Text style={[styles.trackerStepLabel, { color: colors.primaryLight, fontWeight: '700' }]}>
                      On The Way
                    </Text>
                    <Text style={styles.trackerStepLabel}>Complete</Text>
                  </View>
                  <View style={styles.etaBox}>
                    <Ionicons name="time" size={15} color={colors.primaryLight} />
                    <Text style={styles.etaText}>Technician arriving in approx. 14 mins</Text>
                  </View>
                </View>
              )}

              {/* Technician Info */}
              <View style={styles.technicianSection}>
                <View style={styles.techAvatar}>
                  <Text style={styles.techAvatarText}>
                    {booking.technicianName.split(' ').map((n) => n[0]).join('')}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.techName}>{booking.technicianName}</Text>
                  <View style={styles.techMeta}>
                    <Ionicons name="star" size={13} color={colors.ratingStar} />
                    <Text style={styles.techRating}> {booking.technicianRating} </Text>
                    <Text style={styles.techBadge}>• Certified Hunarmand</Text>
                  </View>
                </View>

                {isActive && (
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => Alert.alert('Call Technician', `Calling ${booking.technicianName} (${booking.technicianPhone})`)}
                    >
                      <Ionicons name="call" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.chatButton}
                      onPress={() => Alert.alert('Chat', `Open chat with ${booking.technicianName}`)}
                    >
                      <Ionicons name="chatbubble-ellipses" size={16} color={colors.primaryLight} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Booking Info Row */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{booking.timeSlot}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.priceTag}>{booking.currency}{booking.price}</Text>
                </View>
              </View>

              {/* Address */}
              <View style={styles.addressLine}>
                <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                <Text style={styles.addressText} numberOfLines={1}>{booking.address}</Text>
              </View>

              {/* Bottom Card Actions */}
              <View style={styles.cardActions}>
                {isActive ? (
                  <>
                    <TouchableOpacity
                      style={styles.trackMapButton}
                      onPress={() => Alert.alert('Live Tracking', 'Technician is 2.1 km away on Baker Street.')}
                    >
                      <Ionicons name="navigate-outline" size={16} color="#FFFFFF" />
                      <Text style={styles.trackMapButtonText}>Live Tracking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rescheduleButton}
                      onPress={() => Alert.alert('Reschedule', 'Please choose a new time slot for this booking.')}
                    >
                      <Text style={styles.rescheduleText}>Reschedule</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.rebookButton}
                      onPress={() => Alert.alert('Book Again', 'Adding this service to your cart.')}
                    >
                      <Text style={styles.rebookButtonText}>Book Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.invoiceButton}
                      onPress={() => Alert.alert('Invoice', 'Downloading invoice for ' + booking.id)}
                    >
                      <Text style={styles.invoiceText}>Download Invoice</Text>
                    </TouchableOpacity>
                  </>
                )}
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
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 8,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  activeTabItem: {
    backgroundColor: colors.mintLight,
  },
  tabLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabLabel: {
    color: colors.primaryLight,
  },
  scrollBody: {
    padding: 16,
    gap: 14,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingId: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: '#FEF3C7',
  },
  completedBadge: {
    backgroundColor: '#DEF7EC',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  activeStatusText: {
    color: '#92400E',
  },
  completedStatusText: {
    color: '#03543F',
  },
  trackerBox: {
    backgroundColor: '#F0F9F3',
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D8ECDF',
  },
  trackerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLineActive: {
    flex: 1,
    height: 3,
    backgroundColor: colors.primaryLight,
  },
  stepCircleCurrent: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  stepLineInactive: {
    flex: 1,
    height: 3,
    backgroundColor: '#D1D5DB',
  },
  stepCircleInactive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  trackerLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  trackerStepLabel: {
    fontSize: 10.5,
    color: '#6B7280',
    fontWeight: '500',
  },
  etaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  technicianSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 10,
  },
  techAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  techAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  techName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  techMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  techRating: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  techBadge: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '500',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mintLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  priceTag: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  addressText: {
    fontSize: 11.5,
    color: '#6B7280',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  trackMapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  trackMapButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  rescheduleButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescheduleText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4B5563',
  },
  rebookButton: {
    flex: 1,
    backgroundColor: colors.mintLight,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rebookButtonText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  invoiceButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invoiceText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4B5563',
  },
});
