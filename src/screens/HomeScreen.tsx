import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { HeroBanner } from '../components/HeroBanner';
import { PopularServices } from '../components/PopularServices';
import { RecommendedServices } from '../components/RecommendedServices';
import { TrustBadges } from '../components/TrustBadges';
import { BookingModal } from '../components/BookingModal';
import { LocationModal } from '../components/LocationModal';
import {
  POPULAR_SERVICES,
  RECOMMENDED_SERVICES,
} from '../data/mockData';
import { RecommendedService, ServiceCategory } from '../types';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  onAddBooking: (newBooking: any) => void;
  cartCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onAddBooking, cartCount }) => {
  const [currentAddress, setCurrentAddress] = useState('221B Baker Street, London');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<RecommendedService | null>(null);

  // Filter recommended services based on search query
  const filteredRecommended = RECOMMENDED_SERVICES.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = (service: RecommendedService) => {
    setSelectedService(service);
    setBookingModalVisible(true);
  };

  const handleSelectPopularCategory = (category: ServiceCategory) => {
    // Find matching recommended or create an entry for booking
    const matching = RECOMMENDED_SERVICES.find((s) =>
      s.title.toLowerCase().includes(category.title.toLowerCase())
    );
    if (matching) {
      handleBookNow(matching);
    } else {
      setSelectedService({
        id: `cat-${category.id}`,
        title: category.title,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewsCount: '1.5K',
        duration: '1 - 2 hrs',
        price: 549,
        originalPrice: 749,
        currency: '₹',
        verified: true,
        category: category.title,
        description: `Professional and verified ${category.title} service provided by expert technicians at Hunarmand.`,
        features: ['30-day service warranty', 'Verified background check', 'Safe & contactless execution'],
      });
      setBookingModalVisible(true);
    }
  };

  const handleInstantService = () => {
    const acService = RECOMMENDED_SERVICES.find((s) => s.id === 'rec-2') || RECOMMENDED_SERVICES[0];
    setSelectedService(acService);
    setBookingModalVisible(true);
  };

  const handleScheduleService = () => {
    handleInstantService();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <Header
        currentAddress={currentAddress}
        onPressLocation={() => setLocationModalVisible(true)}
        onPressNotifications={() => Alert.alert('Notifications', 'No new notifications right now.')}
        onPressCart={() => Alert.alert('Hunarmand Cart', `You have ${cartCount} services ready to checkout.`)}
        cartCount={cartCount}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilter={() => Alert.alert('Filter', 'Filter by price, speed (30 mins), and top-rated professionals.')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Hero Banner with Instant Service / Schedule Service */}
        <HeroBanner
          onInstantService={handleInstantService}
          onScheduleService={handleScheduleService}
        />

        {/* Popular Services Grid */}
        <PopularServices
          services={POPULAR_SERVICES}
          onSelectCategory={handleSelectPopularCategory}
          onSeeAll={() => Alert.alert('All Services', 'Browsing all 50+ home repair & maintenance services.')}
        />

        {/* Recommended for you horizontal cards */}
        <RecommendedServices
          services={filteredRecommended}
          onSelectService={handleBookNow}
          onBookNow={handleBookNow}
          onViewAll={() => Alert.alert('Recommended', 'Viewing all top-rated recommendations.')}
        />

        {/* Trust Badges / Warranty strip */}
        <TrustBadges />

        {/* Extra bottom space for bottom dock */}
        <View style={styles.footerSpacing} />
      </ScrollView>

      {/* Booking Modal */}
      <BookingModal
        visible={bookingModalVisible}
        service={selectedService}
        currentAddress={currentAddress}
        onClose={() => setBookingModalVisible(false)}
        onConfirmBooking={(bookingDetails) => {
          onAddBooking(bookingDetails);
        }}
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
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  footerSpacing: {
    height: 16,
  },
});
