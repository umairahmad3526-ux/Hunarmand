import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { PopularServices } from '../components/PopularServices';
import { TrustBadges } from '../components/TrustBadges';
import { LocationModal } from '../components/LocationModal';
import { WorkersListModal } from '../components/WorkersListModal';
import { WorkerProfileModal } from '../components/WorkerProfileModal';
import { RateWorkerModal } from '../components/RateWorkerModal';
import { POPULAR_SERVICES } from '../data/mockData';
import { ServiceCategory, SkillWorker } from '../types';
import { openWorkerWhatsApp, openWorkerCall } from '../utils/linking';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  workers: SkillWorker[];
  onSubmitRating: (workerId: string, rating: number, userName: string, comment: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  workers,
  onSubmitRating,
}) => {
  const [currentAddress, setCurrentAddress] = useState('221B Baker Street, London');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // Modal states for worker list, profile, and rating
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [workersListVisible, setWorkersListVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<SkillWorker | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [workerToRate, setWorkerToRate] = useState<SkillWorker | null>(null);

  // When user taps a service category from the 4x2 grid
  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setWorkersListVisible(true);
  };

  const handleOpenWorkerProfile = (worker: SkillWorker) => {
    setSelectedWorker(worker);
    setProfileModalVisible(true);
  };

  const handleOpenRateModal = (worker: SkillWorker) => {
    setWorkerToRate(worker);
    setRateModalVisible(true);
  };

  // Real-time search matches across all workers
  const matchingWorkers = searchQuery.trim().length > 0
    ? workers.filter((w) => {
        const q = searchQuery.toLowerCase();
        return (
          w.name.toLowerCase().includes(q) ||
          w.categoryTitle.toLowerCase().includes(q) ||
          w.shopName.toLowerCase().includes(q) ||
          w.shopAddress.toLowerCase().includes(q) ||
          w.skills.some((s) => s.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <Header
        currentAddress={currentAddress}
        onPressLocation={() => setLocationModalVisible(true)}
        onPressNotifications={() => Alert.alert('Notifications', 'No new notifications right now.')}
        onPressCart={() => Alert.alert('Hunarmand Support', 'Connect directly with verified skilled workers via WhatsApp.')}
        cartCount={0}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilter={() => Alert.alert('Filter', 'Filter technicians by highest rating, proximity, or service type.')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* If Search is Active, show direct worker search results */}
        {searchQuery.trim().length > 0 ? (
          <View style={styles.searchResultsSection}>
            <View style={styles.resultsHeaderRow}>
              <Text style={styles.resultsTitle}>
                Search Results ({matchingWorkers.length})
              </Text>
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearSearchText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {matchingWorkers.length === 0 ? (
              <View style={styles.noResultsBox}>
                <Ionicons name="search" size={36} color="#9CA3AF" />
                <Text style={styles.noResultsText}>No technician found for "{searchQuery}"</Text>
                <Text style={styles.noResultsSub}>Try searching for "AC", "Cleaning", "Plumber", or "Electrician"</Text>
              </View>
            ) : (
              matchingWorkers.map((worker) => (
                <View key={worker.id} style={styles.searchWorkerCard}>
                  <TouchableOpacity
                    style={styles.searchWorkerTop}
                    onPress={() => handleOpenWorkerProfile(worker)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: worker.avatar }} style={styles.searchAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.searchWorkerName}>{worker.name}</Text>
                      <Text style={styles.searchShopName}>{worker.shopName}</Text>
                      <View style={styles.searchMetaRow}>
                        <View style={styles.searchRatingBox}>
                          <Ionicons name="star" size={13} color="#F59E0B" />
                          <Text style={styles.searchRatingText}> {worker.rating.toFixed(1)} ({worker.reviewsCount})</Text>
                        </View>
                        <Text style={styles.searchCategoryBadge}>{worker.categoryTitle}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Address */}
                  <View style={styles.searchAddressRow}>
                    <Ionicons name="location" size={14} color={colors.primaryLight} />
                    <Text style={styles.searchAddressText} numberOfLines={1}>{worker.shopAddress}</Text>
                    <Text style={styles.searchDistanceText}>• {worker.distance}</Text>
                  </View>

                  {/* Actions */}
                  <View style={styles.searchActionsRow}>
                    <TouchableOpacity
                      style={styles.searchWhatsAppBtn}
                      onPress={() => openWorkerWhatsApp(worker)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.searchWhatsAppText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.searchCallBtn}
                      onPress={() => openWorkerCall(worker)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="call" size={15} color={colors.primaryLight} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.searchProfileBtn}
                      onPress={() => handleOpenWorkerProfile(worker)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.searchProfileBtnText}>View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : null}

        {/* Section Header */}
        <View style={styles.servicesHeader}>
          <Text style={styles.sectionHeading}>Services & Skilled Workers</Text>
          <Text style={styles.sectionSubtitle}>
            Tap any service to view verified technicians, their shop address & direct WhatsApp contact.
          </Text>
        </View>

        {/* Popular Services Grid (8 Services) */}
        <PopularServices
          services={POPULAR_SERVICES}
          onSelectCategory={handleSelectCategory}
          onSeeAll={() => handleSelectCategory(POPULAR_SERVICES[0])}
        />

        {/* Direct Connect Assurance Banner */}
        <View style={styles.assuranceBanner}>
          <View style={styles.whatsappIconCircle}>
            <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.assuranceTitle}>Direct WhatsApp Connectivity</Text>
            <Text style={styles.assuranceDesc}>
              No middleman or booking commissions. Contact verified local workers directly with your home service requirements.
            </Text>
          </View>
        </View>

        {/* Trust Badges */}
        <TrustBadges />

        <View style={styles.footerSpacing} />
      </ScrollView>

      {/* Workers List Modal for Selected Category */}
      <WorkersListModal
        visible={workersListVisible}
        category={selectedCategory}
        workers={workers}
        onClose={() => setWorkersListVisible(false)}
        onSelectWorker={(worker) => {
          handleOpenWorkerProfile(worker);
        }}
        onRateWorker={(worker) => {
          handleOpenRateModal(worker);
        }}
      />

      {/* Full Worker Profile Modal with Location & Reviews */}
      <WorkerProfileModal
        visible={profileModalVisible}
        worker={selectedWorker}
        onClose={() => setProfileModalVisible(false)}
        onOpenRateModal={(worker) => {
          handleOpenRateModal(worker);
        }}
      />

      {/* Rate & Review Worker Modal */}
      <RateWorkerModal
        visible={rateModalVisible}
        worker={workerToRate}
        onClose={() => setRateModalVisible(false)}
        onSubmitRating={onSubmitRating}
      />

      {/* Location Modal */}
      <LocationModal
        visible={locationModalVisible}
        selectedAddress={currentAddress}
        onSelectAddress={setCurrentAddress}
        onClose={() => setLocationModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  servicesHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 2,
    backgroundColor: '#FFFFFF',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 3,
    lineHeight: 17,
  },
  assuranceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 16,
    marginVertical: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    gap: 12,
  },
  whatsappIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  assuranceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  assuranceDesc: {
    fontSize: 11.5,
    color: '#374151',
    marginTop: 2,
    lineHeight: 16,
  },
  searchResultsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  clearSearchText: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  noResultsBox: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
  },
  noResultsText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 8,
  },
  noResultsSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  searchWorkerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchWorkerTop: {
    flexDirection: 'row',
    gap: 10,
  },
  searchAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
  },
  searchWorkerName: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  searchShopName: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 1,
  },
  searchMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  searchRatingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchRatingText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  searchCategoryBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryLight,
    backgroundColor: colors.mintLight,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  searchAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  searchAddressText: {
    fontSize: 11.5,
    color: '#4B5563',
    flex: 1,
  },
  searchDistanceText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '600',
  },
  searchActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  searchWhatsAppBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchWhatsAppText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  searchCallBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.mintLight,
    borderWidth: 1,
    borderColor: '#D8ECDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchProfileBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  searchProfileBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  footerSpacing: {
    height: 20,
  },
});
