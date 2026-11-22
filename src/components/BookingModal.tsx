import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RecommendedService } from '../types';
import { colors } from '../theme/colors';

interface BookingModalProps {
  visible: boolean;
  service: RecommendedService | null;
  currentAddress: string;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  service,
  currentAddress,
  onClose,
  onConfirmBooking,
}) => {
  if (!service) return null;

  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | 'dayAfter'>('today');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:30 AM');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const dates = [
    { key: 'today', label: 'Today', date: '22 Nov' },
    { key: 'tomorrow', label: 'Tomorrow', date: '23 Nov' },
    { key: 'dayAfter', label: 'Mon', date: '24 Nov' },
  ];

  const slots = [
    '09:00 AM - 10:30 AM',
    '11:00 AM - 12:30 PM',
    '02:00 PM - 03:30 PM',
    '04:30 PM - 06:00 PM',
  ];

  const handleConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBooking({
        service,
        date: selectedDate === 'today' ? 'Today, 22 Nov' : selectedDate === 'tomorrow' ? 'Tomorrow, 23 Nov' : 'Mon, 24 Nov',
        slot: selectedSlot,
        address: currentAddress,
        specialInstructions,
      });
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          {/* Header Bar */}
          <View style={styles.sheetHeader}>
            <View style={styles.dragIndicator} />
            <View style={styles.headerTitleRow}>
              <Text style={styles.sheetTitle}>Book Service</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {isSuccess ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark-circle" size={60} color={colors.success} />
              </View>
              <Text style={styles.successTitle}>Booking Confirmed!</Text>
              <Text style={styles.successSubtitle}>
                A verified professional from Hunarmand will arrive at {selectedSlot}.
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
              {/* Service summary card */}
              <View style={styles.summaryCard}>
                <View style={styles.summaryTextGroup}>
                  <Text style={styles.summaryTitle}>{service.title}</Text>
                  <View style={styles.summaryMeta}>
                    <Ionicons name="star" size={13} color={colors.ratingStar} />
                    <Text style={styles.summaryRating}> {service.rating} ({service.reviewsCount})</Text>
                    <Text style={styles.summaryDuration}> • {service.duration}</Text>
                  </View>
                  <View style={styles.badgeRow}>
                    <MaterialCommunityIcons name="shield-check" size={13} color={colors.primaryLight} />
                    <Text style={styles.badgeText}>Verified Expert Assigned</Text>
                  </View>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.priceAmount}>{service.currency}{service.price}</Text>
                </View>
              </View>

              {/* Date selection */}
              <Text style={styles.sectionHeading}>Select Date</Text>
              <View style={styles.dateRow}>
                {dates.map((item) => {
                  const isSelected = selectedDate === item.key;
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={[styles.dateChip, isSelected && styles.selectedDateChip]}
                      onPress={() => setSelectedDate(item.key as any)}
                    >
                      <Text style={[styles.dateChipLabel, isSelected && styles.selectedDateText]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.dateChipSub, isSelected && styles.selectedDateSub]}>
                        {item.date}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Time slot selection */}
              <Text style={styles.sectionHeading}>Select Time Slot</Text>
              <View style={styles.slotsGrid}>
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotChip, isSelected && styles.selectedSlotChip]}
                      onPress={() => setSelectedSlot(slot)}
                    >
                      <Ionicons
                        name="time-outline"
                        size={14}
                        color={isSelected ? '#FFFFFF' : colors.primaryLight}
                        style={{ marginRight: 6 }}
                      />
                      <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Location display */}
              <Text style={styles.sectionHeading}>Service Location</Text>
              <View style={styles.locationBox}>
                <Ionicons name="location-outline" size={20} color={colors.primaryLight} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.locationTitle}>Home</Text>
                  <Text style={styles.locationAddress}>{currentAddress}</Text>
                </View>
              </View>

              {/* Instructions */}
              <Text style={styles.sectionHeading}>Special Instructions (Optional)</Text>
              <TextInput
                style={styles.instructionInput}
                placeholder="E.g., Ring doorbell twice, AC model is inverter..."
                placeholderTextColor="#9CA3AF"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
              />

              {/* Bill Summary */}
              <View style={styles.billBox}>
                <Text style={styles.billTitle}>Price Summary</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Item Total</Text>
                  <Text style={styles.billValue}>{service.currency}{service.originalPrice}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: colors.success }]}>Instant Discount</Text>
                  <Text style={[styles.billValue, { color: colors.success }]}>
                    -{service.currency}{service.originalPrice - service.price}
                  </Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Service & Safety Fee</Text>
                  <Text style={styles.billValue}>{service.currency}0 (Free)</Text>
                </View>
                <View style={[styles.billRow, styles.billTotalRow]}>
                  <Text style={styles.totalLabel}>Total Payable</Text>
                  <Text style={styles.totalValue}>{service.currency}{service.price}</Text>
                </View>
              </View>

              {/* Book Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmButtonText}>Confirm & Book Now</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  sheetHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
  },
  dragIndicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  scrollBody: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAF9',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  summaryTextGroup: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  summaryRating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: colors.mintLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  priceAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedDateChip: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.mintLight,
  },
  dateChipLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  selectedDateText: {
    color: colors.primaryLight,
  },
  dateChipSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedDateSub: {
    color: colors.primaryLight,
    fontWeight: '500',
  },
  slotsGrid: {
    gap: 8,
  },
  slotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  selectedSlotChip: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryLight,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedSlotText: {
    color: '#FFFFFF',
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  locationAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  instructionInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    fontSize: 13,
    color: colors.textPrimary,
  },
  billBox: {
    backgroundColor: '#F8FAF9',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 14,
    gap: 6,
  },
  billTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 12.5,
    color: '#6B7280',
  },
  billValue: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  billTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 18,
    gap: 8,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  successIconCircle: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});
