import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { BookingsScreen } from './src/screens/BookingsScreen';
import { SupportScreen } from './src/screens/SupportScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { BottomNav } from './src/components/BottomNav';
import { MOCK_BOOKINGS } from './src/data/mockData';
import { TabType, Booking } from './src/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [cartCount, setCartCount] = useState<number>(1);

  const handleAddBooking = (details: any) => {
    const newBooking: Booking = {
      id: `HN-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceTitle: details.service.title,
      category: details.service.category,
      date: details.date,
      timeSlot: details.slot,
      status: 'in_progress',
      price: details.service.price,
      currency: details.service.currency,
      technicianName: 'Muhammad Rashid',
      technicianPhone: '+92 301 555 0192',
      technicianRating: 4.9,
      address: details.address,
    };

    setBookings([newBooking, ...bookings]);
    setCartCount((prev) => Math.max(0, prev - 1));
    setActiveTab('Bookings');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onAddBooking={handleAddBooking} cartCount={cartCount} />;
      case 'Bookings':
        return <BookingsScreen bookings={bookings} />;
      case 'Support':
        return <SupportScreen />;
      case 'Account':
        return <AccountScreen />;
      default:
        return <HomeScreen onAddBooking={handleAddBooking} cartCount={cartCount} />;
    }
  };

  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'in_progress' || b.status === 'confirmed'
  ).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        <View style={styles.mainContent}>
          {renderActiveScreen()}
        </View>

        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          bookingBadgeCount={activeBookingsCount}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
  },
});
