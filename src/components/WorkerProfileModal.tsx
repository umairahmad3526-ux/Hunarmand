import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SkillWorker } from '../types';
import { openWorkerWhatsApp, openWorkerCall, openShopMap } from '../utils/linking';
import { colors } from '../theme/colors';

interface WorkerProfileModalProps {
  visible: boolean;
  worker: SkillWorker | null;
  onClose: () => void;
  onOpenRateModal: (worker: SkillWorker) => void;
}

export const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({
  visible,
  worker,
  onClose,
  onOpenRateModal,
}) => {
  if (!worker) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.indicator} />
            <View style={styles.titleRow}>
              <Text style={styles.title}>Technician Profile</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Worker Top Profile Card */}
            <View style={styles.profileTopCard}>
              <Image source={{ uri: worker.avatar }} style={styles.avatar} resizeMode="cover" />
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.workerName}>{worker.name}</Text>
                  {worker.verified && (
                    <MaterialCommunityIcons name="check-decagram" size={18} color="#16A34A" />
                  )}
                </View>
                <Text style={styles.shopName}>{worker.shopName}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{worker.categoryTitle}</Text>
                </View>
              </View>
            </View>

            {/* Quick Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <View style={styles.starRow}>
                  <Ionicons name="star" size={15} color="#F59E0B" />
                  <Text style={styles.statValue}> {worker.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.statLabel}>{worker.reviewsCount} Reviews</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <Text style={styles.statValue}>{worker.experienceYears}+ Years</Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <View style={styles.verifiedRow}>
                  <MaterialCommunityIcons name="shield-check" size={16} color={colors.primaryLight} />
                  <Text style={styles.statValue}> 100%</Text>
                </View>
                <Text style={styles.statLabel}>Verified Pro</Text>
              </View>
            </View>

            {/* Contact Actions: WhatsApp & Call */}
            <View style={styles.contactActions}>
              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => openWorkerWhatsApp(worker)}
                activeOpacity={0.85}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.callButton}
                onPress={() => openWorkerCall(worker)}
                activeOpacity={0.85}
              >
                <Ionicons name="call" size={18} color={colors.primaryLight} style={{ marginRight: 6 }} />
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>

            {/* Shop & Location Section */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionTitleGroup}>
                  <Ionicons name="location" size={18} color={colors.primaryLight} />
                  <Text style={styles.sectionTitle}>Shop Location & Address</Text>
                </View>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{worker.distance}</Text>
                </View>
              </View>

              <Text style={styles.shopAddressText}>{worker.shopAddress}</Text>
              <Text style={styles.cityText}>{worker.city}</Text>

              {/* Map Preview Simulation */}
              <TouchableOpacity
                style={styles.mapPreview}
                onPress={() => openShopMap(worker)}
                activeOpacity={0.85}
              >
                <View style={styles.mapOverlay}>
                  <Ionicons name="navigate-circle" size={28} color={colors.primaryLight} />
                  <Text style={styles.mapOpenText}>Open Shop in Google Maps</Text>
                </View>
              </TouchableOpacity>

              {/* Opening Hours */}
              <View style={styles.hoursRow}>
                <Ionicons name="time-outline" size={15} color="#6B7280" />
                <Text style={styles.hoursText}>Working Hours: {worker.openingHours}</Text>
              </View>
            </View>

            {/* Bio & Skills */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>About Technician</Text>
              <Text style={styles.bioText}>{worker.bio}</Text>

              <Text style={[styles.sectionTitle, { marginTop: 12, marginBottom: 8 }]}>Specializations</Text>
              <View style={styles.skillsChips}>
                {worker.skills.map((skill, index) => (
                  <View key={index} style={styles.skillChip}>
                    <Ionicons name="checkmark-circle" size={13} color={colors.primaryLight} style={{ marginRight: 4 }} />
                    <Text style={styles.skillChipText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Customer Ratings & Reviews */}
            <View style={styles.sectionCard}>
              <View style={styles.reviewHeaderRow}>
                <View>
                  <Text style={styles.sectionTitle}>Customer Reviews ({worker.reviewsCount})</Text>
                  <View style={styles.overallRatingRow}>
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text style={styles.overallRatingScore}> {worker.rating.toFixed(1)} </Text>
                    <Text style={styles.overallRatingTotal}>/ 5.0</Text>
                  </View>
                </View>

                {/* Rate Worker Button */}
                <TouchableOpacity
                  style={styles.rateWorkerBtn}
                  onPress={() => onOpenRateModal(worker)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="star" size={14} color={colors.primaryLight} style={{ marginRight: 4 }} />
                  <Text style={styles.rateWorkerBtnText}>Rate Worker</Text>
                </TouchableOpacity>
              </View>

              {/* Reviews List */}
              <View style={styles.reviewsList}>
                {worker.reviews.map((rev) => (
                  <View key={rev.id} style={styles.reviewItem}>
                    <View style={styles.reviewItemHeader}>
                      <View style={styles.reviewUserWrap}>
                        <View style={styles.reviewAvatar}>
                          <Text style={styles.reviewAvatarText}>{rev.userName[0]}</Text>
                        </View>
                        <View>
                          <Text style={styles.reviewUserName}>{rev.userName}</Text>
                          <Text style={styles.reviewDate}>{rev.date}</Text>
                        </View>
                      </View>
                      <View style={styles.reviewStars}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Ionicons
                            key={s}
                            name={s <= rev.rating ? 'star' : 'star-outline'}
                            size={12}
                            color={s <= rev.rating ? '#F59E0B' : '#D1D5DB'}
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{rev.comment}</Text>
                  </View>
                ))}
              </View>
            </View>
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
  scrollBody: {
    padding: 16,
    gap: 14,
  },
  profileTopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workerName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  shopName: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: colors.mintLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statBox: {
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  whatsappButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 13,
    borderRadius: 14,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mintLight,
    borderWidth: 1,
    borderColor: '#D8ECDF',
    paddingVertical: 13,
    borderRadius: 14,
  },
  callButtonText: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  distanceBadge: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  shopAddressText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  cityText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  mapPreview: {
    height: 70,
    backgroundColor: '#EDF7EE',
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D8ECDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapOpenText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  hoursText: {
    fontSize: 12,
    color: '#4B5563',
  },
  bioText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
    marginTop: 6,
  },
  skillsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 8,
  },
  skillChipText: {
    fontSize: 11.5,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  overallRatingScore: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  overallRatingTotal: {
    fontSize: 12,
    color: '#6B7280',
  },
  rateWorkerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mintLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8ECDF',
  },
  rateWorkerBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  reviewsList: {
    gap: 10,
  },
  reviewItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  reviewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewUserWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewUserName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewDate: {
    fontSize: 10.5,
    color: '#9CA3AF',
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewComment: {
    fontSize: 12.5,
    color: '#4B5563',
    lineHeight: 17,
  },
});
