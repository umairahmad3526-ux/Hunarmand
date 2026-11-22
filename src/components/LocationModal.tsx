import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SAVED_LOCATIONS } from '../data/mockData';
import { colors } from '../theme/colors';

interface LocationModalProps {
  visible: boolean;
  selectedAddress: string;
  onSelectAddress: (address: string) => void;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  selectedAddress,
  onSelectAddress,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.indicator} />
            <View style={styles.titleRow}>
              <Text style={styles.title}>Choose Location</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.body}>
            {/* Current GPS button */}
            <TouchableOpacity
              style={styles.gpsButton}
              onPress={() => {
                onSelectAddress('221B Baker Street, London');
                onClose();
              }}
              activeOpacity={0.8}
            >
              <View style={styles.gpsIconCircle}>
                <Ionicons name="locate-outline" size={20} color={colors.primaryLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gpsTitle}>Use Current Location</Text>
                <Text style={styles.gpsSubtitle}>Using GPS (Baker Street, London)</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>Saved Addresses</Text>

            {SAVED_LOCATIONS.map((loc) => {
              const isSelected = selectedAddress === loc.address;
              return (
                <TouchableOpacity
                  key={loc.id}
                  style={[styles.addressItem, isSelected && styles.selectedAddressItem]}
                  onPress={() => {
                    onSelectAddress(loc.address);
                    onClose();
                  }}
                  activeOpacity={0.75}
                >
                  <View style={styles.addressIconWrap}>
                    <Ionicons
                      name={loc.title === 'Home' ? 'home-outline' : loc.title === 'Office' ? 'briefcase-outline' : 'location-outline'}
                      size={20}
                      color={isSelected ? colors.primaryLight : '#6B7280'}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.addressTitle, isSelected && { color: colors.primaryLight }]}>
                      {loc.title}
                    </Text>
                    <Text style={styles.addressDesc} numberOfLines={2}>
                      {loc.address}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primaryLight} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
  },
  indicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 18,
    gap: 12,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mintLight,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8ECDF',
  },
  gpsIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  gpsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  gpsSubtitle: {
    fontSize: 11.5,
    color: '#4B5563',
    marginTop: 1,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  selectedAddressItem: {
    borderColor: colors.primaryLight,
    backgroundColor: '#F8FCF9',
  },
  addressIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addressDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
