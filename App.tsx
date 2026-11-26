import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { CategoriesScreen } from './src/screens/CategoriesScreen';
import { RequestsScreen } from './src/screens/RequestsScreen';
import { MessagesScreen } from './src/screens/MessagesScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { BottomNav } from './src/components/BottomNav';
import { WorkersListModal } from './src/components/WorkersListModal';
import { WorkerProfileModal } from './src/components/WorkerProfileModal';
import { RateWorkerModal } from './src/components/RateWorkerModal';
import { INITIAL_SKILL_WORKERS } from './src/data/mockData';
import { TabType, SkillWorker, ServiceCategory } from './src/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [workers, setWorkers] = useState<SkillWorker[]>(INITIAL_SKILL_WORKERS);

  // Global modals when triggered from Categories screen
  const [globalCategory, setGlobalCategory] = useState<ServiceCategory | null>(null);
  const [globalWorkerModalVisible, setGlobalWorkerModalVisible] = useState(false);
  const [globalWorkerProfile, setGlobalWorkerProfile] = useState<SkillWorker | null>(null);
  const [globalProfileVisible, setGlobalProfileVisible] = useState(false);
  const [workerToRate, setWorkerToRate] = useState<SkillWorker | null>(null);
  const [rateModalVisible, setRateModalVisible] = useState(false);

  // Handle rating submission dynamically across all screens
  const handleSubmitRating = (
    workerId: string,
    newRating: number,
    userName: string,
    comment: string
  ) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((w) => {
        if (w.id !== workerId) return w;

        const newReview = {
          id: `rev-${Date.now()}`,
          userName,
          rating: newRating,
          comment,
          date: 'Just now',
        };

        const totalReviews = w.reviewsCount + 1;
        const updatedRating =
          (w.rating * w.reviewsCount + newRating) / totalReviews;

        return {
          ...w,
          rating: parseFloat(updatedRating.toFixed(1)),
          reviewsCount: totalReviews,
          reviews: [newReview, ...w.reviews],
        };
      })
    );
  };

  const handleSelectCategoryFromCategories = (category: ServiceCategory) => {
    setGlobalCategory(category);
    setGlobalWorkerModalVisible(true);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <HomeScreen
            workers={workers}
            onSubmitRating={handleSubmitRating}
            onNavigateTab={setActiveTab}
          />
        );
      case 'Categories':
        return (
          <CategoriesScreen
            onSelectCategory={handleSelectCategoryFromCategories}
          />
        );
      case 'Requests':
        return <RequestsScreen />;
      case 'Messages':
        return <MessagesScreen />;
      case 'Profile':
        return <AccountScreen />;
      default:
        return (
          <HomeScreen
            workers={workers}
            onSubmitRating={handleSubmitRating}
            onNavigateTab={setActiveTab}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        <View style={styles.mainContent}>
          {renderActiveScreen()}
        </View>

        {/* Global Bottom Navigation matching Reference Image */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadMessagesCount={1}
          activeRequestsCount={1}
        />

        {/* Global Workers List Modal for Categories Screen */}
        <WorkersListModal
          visible={globalWorkerModalVisible}
          category={globalCategory}
          workers={workers}
          onClose={() => setGlobalWorkerModalVisible(false)}
          onSelectWorker={(worker) => {
            setGlobalWorkerProfile(worker);
            setGlobalProfileVisible(true);
          }}
          onRateWorker={(worker) => {
            setWorkerToRate(worker);
            setRateModalVisible(true);
          }}
        />

        {/* Global Profile Modal */}
        <WorkerProfileModal
          visible={globalProfileVisible}
          worker={globalWorkerProfile}
          onClose={() => setGlobalProfileVisible(false)}
          onOpenRateModal={(worker) => {
            setWorkerToRate(worker);
            setRateModalVisible(true);
          }}
        />

        {/* Global Rate Modal */}
        <RateWorkerModal
          visible={rateModalVisible}
          worker={workerToRate}
          onClose={() => setRateModalVisible(false)}
          onSubmitRating={handleSubmitRating}
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
