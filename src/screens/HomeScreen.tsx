import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { MainHighlightCard } from '../components/MainHighlightCard';
import { PromoBanner } from '../components/PromoBanner';
import { ServiceCategoriesGrid } from '../components/ServiceCategoriesGrid';
import { SearchLocationBar } from '../components/SearchLocationBar';
import { TrustBadges } from '../components/TrustBadges';
import { LocationModal } from '../components/LocationModal';
import { WorkersListModal } from '../components/WorkersListModal';
import { WorkerProfileModal } from '../components/WorkerProfileModal';
import { RateWorkerModal } from '../components/RateWorkerModal';
import { ALL_25_CATEGORIES } from '../data/mockData';
import { ServiceCategory, SkillWorker } from '../types';
import { openWorkerWhatsApp, openWorkerCall } from '../utils/linking';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  workers: SkillWorker[];
  onSubmitRating: (workerId: string, rating: number, userName: string, comment: string) => void;
  onNavigateTab: (tabName: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  workers,
  onSubmitRating,
  onNavigateTab,
}) => {
  const [currentAddress, setCurrentAddress] = useState('221B Baker Street, London');
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // Modals for worker discovery and profile
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [workersListVisible, setWorkersListVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<SkillWorker | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [workerToRate, setWorkerToRate] = useState<SkillWorker | null>(null);

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

  const handlePostRequest = () => {
    Alert.alert(
      'Post Work Request',
      'Describe what you need fixed (e.g. AC cooling issue or short circuit). Local verified workers will send you quotes on WhatsApp within 15 minutes!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go to Requests', onPress: () => onNavigateTab('Requests') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* 1. Header Section matching reference image */}
      <Header
        userName="Ahmad"
        onPressProfile={() => onNavigateTab('Profile')}
        onPressNotifications={() => Alert.alert('Notifications', '1 new quotation received for your AC repair request.')}
        unreadNotificationsCount={1}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Main Highlight Dark-Green Card */}
        <MainHighlightCard
          onPressAction={handlePostRequest}
          activeProsCount="5,600+"
          cityName="London"
        />

        {/* 3. Promotional Horizontal Banner */}
        <PromoBanner
          onPress={() => onNavigateTab('Categories')}
        />

        {/* 4. Service Categories 2-Column Grid */}
        <ServiceCategoriesGrid
          categories={ALL_25_CATEGORIES}
          onSelectCategory={handleSelectCategory}
          onViewAll={() => onNavigateTab('Categories')}
        />

        {/* 5. Search / Location Bar at Bottom of Content */}
        <SearchLocationBar
          currentAddress={currentAddress}
          onPress={() => setLocationModalVisible(true)}
        />

        {/* 6. Trust Badges */}
        <TrustBadges />

        <View style={styles.footerSpacing} />
      </ScrollView>

      {/* Workers List Modal */}
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

      {/* Worker Profile Modal */}
      <WorkerProfileModal
        visible={profileModalVisible}
        worker={selectedWorker}
        onClose={() => setProfileModalVisible(false)}
        onOpenRateModal={(worker) => {
          handleOpenRateModal(worker);
        }}
      />

      {/* Rate & Review Modal */}
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
  scrollContent: {
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  footerSpacing: {
    height: 16,
  },
});
