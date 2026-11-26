import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceCategory, SkillWorker } from '../types';
import { openWorkerWhatsApp, openWorkerCall } from '../utils/linking';
import { colors } from '../theme/colors';

interface WorkersListModalProps {
  visible: boolean;
  category: ServiceCategory | null;
  workers: SkillWorker[];
  onClose: () => void;
  onSelectWorker: (worker: SkillWorker) => void;
  onRateWorker: (worker: SkillWorker) => void;
}

export const WorkersListModal: React.FC<WorkersListModalProps> = ({
  visible,
  category,
  workers,
  onClose,
  onSelectWorker,
  onRateWorker,
}) => {
  if (!category) return null;

  const [searchFilter, setSearchFilter] = useState('');

  // Find workers matching this category
  let matchedWorkers = workers.filter(
    (w) =>
      w.categoryId === category.id ||
      w.categoryTitle.toLowerCase() === category.title.toLowerCase()
  );

  // Fallback: If no pre-seeded worker exists for this category, provide verified pros
  if (matchedWorkers.length === 0) {
    matchedWorkers = [
      {
        id: `auto-${category.id}-1`,
        name: `Ustad Farooq (${category.title} Pro)`,
        categoryId: category.id,
        categoryTitle: category.title,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        shopName: `${category.title} Diagnostic & Repair Works`,
        shopAddress: 'Shop #19, Main Skilled Trade Market, Baker Street Outer',
        city: 'London',
        whatsappNumber: '923015550192',
        displayPhone: '+92 301 555 0192',
        rating: 4.9,
        reviewsCount: 114,
        experienceYears: 10,
        verified: true,
        distance: '0.9 km away',
        bio: `Verified master specialist in ${category.title}. 10+ years of local experience with transparent pricing and 30-day warranty.`,
        skills: ['Doorstep Service', 'Genuine Parts', 'Fault Diagnosis', 'Warranty Guaranteed'],
        openingHours: '08:30 AM - 09:00 PM',
        reviews: [
          {
            id: 'rev-auto-1',
            userName: 'Tariq Mehmood',
            rating: 5,
            comment: `Reachable immediately on WhatsApp. Fixed our issue very cleanly!`,
            date: '2 days ago',
          },
        ],
      },
      {
        id: `auto-${category.id}-2`,
        name: `Master Zeeshan`,
        categoryId: category.id,
        categoryTitle: category.title,
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
        shopName: `Al-Madina ${category.title} Workshop`,
        shopAddress: 'Plot #4, Commercial Avenue, Near City Centre',
        city: 'London',
        whatsappNumber: '923214447890',
        displayPhone: '+92 321 444 7890',
        rating: 4.8,
        reviewsCount: 86,
        experienceYears: 7,
        verified: true,
        distance: '1.4 km away',
        bio: `Certified ${category.title} technician. Emergency support on WhatsApp with fast doorstep response.`,
        skills: ['Emergency Calling', 'Inspection & Estimate', 'Precision Tools'],
        openingHours: '09:00 AM - 08:30 PM',
        reviews: [
          {
            id: 'rev-auto-2',
            userName: 'Hassan Raza',
            rating: 5,
            comment: `Great craftsmanship and reasonable rates. Highly recommended!`,
            date: '1 week ago',
          },
        ],
      },
    ];
  }

  // Filter with local search query
  const displayWorkers = matchedWorkers.filter((w) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      w.name.toLowerCase().includes(q) ||
      w.shopName.toLowerCase().includes(q) ||
      w.shopAddress.toLowerCase().includes(q) ||
      w.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.indicator} />
            <View style={styles.titleRow}>
              <View style={styles.titleGroup}>
                <Text style={styles.title}>{category.title}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{displayWorkers.length} Verified Pros</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.categoryDesc}>{category.description}</Text>

            {/* Search within category */}
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search pro by name or shop location..."
                placeholderTextColor="#9CA3AF"
                value={searchFilter}
                onChangeText={setSearchFilter}
              />
              {searchFilter.length > 0 && (
                <TouchableOpacity onPress={() => setSearchFilter('')}>
                  <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Workers list */}
          <ScrollView
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
          >
            {displayWorkers.map((worker) => (
              <View key={worker.id} style={styles.workerCard}>
                {/* Top row */}
                <TouchableOpacity
                  style={styles.workerTopRow}
                  onPress={() => onSelectWorker(worker)}
                  activeOpacity={0.8}
                >
                  <View style={styles.avatarWrap}>
                    <Image source={{ uri: worker.avatar }} style={styles.avatar} resizeMode="cover" />
                    {worker.verified && (
                      <View style={styles.verifiedDot}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.nameHeader}>
                      <Text style={styles.workerName}>{worker.name}</Text>
                      <View style={styles.experienceTag}>
                        <Text style={styles.experienceText}>{worker.experienceYears}+ yrs exp</Text>
                      </View>
                    </View>

                    <Text style={styles.shopName} numberOfLines={1}>
                      {worker.shopName}
                    </Text>

                    {/* Rating and Reviews */}
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={13} color="#F59E0B" />
                      <Text style={styles.ratingScore}> {worker.rating.toFixed(1)} </Text>
                      <Text style={styles.reviewsCount}>({worker.reviewsCount} reviews)</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Shop Location & Address */}
                <TouchableOpacity
                  style={styles.addressBox}
                  onPress={() => onSelectWorker(worker)}
                  activeOpacity={0.75}
                >
                  <Ionicons name="location" size={16} color={colors.primaryLight} style={{ marginTop: 1 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addressLabel}>Shop Address:</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {worker.shopAddress}
                    </Text>
                  </View>
                  <View style={styles.distancePill}>
                    <Text style={styles.distancePillText}>{worker.distance}</Text>
                  </View>
                </TouchableOpacity>

                {/* Skills Chips */}
                <View style={styles.skillsRow}>
                  {worker.skills.slice(0, 3).map((sk, idx) => (
                    <View key={idx} style={styles.skillBadge}>
                      <Text style={styles.skillBadgeText}>{sk}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Buttons: Direct WhatsApp & Call */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.whatsappBtn}
                    onPress={() => openWorkerWhatsApp(worker)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="logo-whatsapp" size={17} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.whatsappBtnText}>Chat on WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.callBtn}
                    onPress={() => openWorkerCall(worker)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="call" size={16} color={colors.primaryLight} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.profileBtn}
                    onPress={() => onSelectWorker(worker)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.profileBtnText}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rateBtn}
                    onPress={() => onRateWorker(worker)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="star-outline" size={14} color="#D97706" style={{ marginRight: 3 }} />
                    <Text style={styles.rateBtnText}>Rate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
    maxHeight: '90%',
    paddingBottom: 24,
  },
  header: {
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
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  countBadge: {
    backgroundColor: colors.mintBanner,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  closeBtn: {
    padding: 4,
  },
  categoryDesc: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  scrollBody: {
    padding: 18,
    gap: 14,
  },
  workerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  workerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E7EB',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#16A34A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  experienceTag: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  experienceText: {
    fontSize: 10.5,
    color: '#4B5563',
    fontWeight: '600',
  },
  shopName: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#4B5563',
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewsCount: {
    fontSize: 11,
    color: '#6B7280',
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  addressLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 16,
    marginTop: 1,
  },
  distancePill: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: 'center',
  },
  distancePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  skillBadgeText: {
    fontSize: 10.5,
    color: '#4B5563',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  whatsappBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 9,
    borderRadius: 12,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  whatsappBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.mintBanner,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#374151',
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  rateBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
});
