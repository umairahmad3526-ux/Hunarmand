import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { SupportScreen } from './src/screens/SupportScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { BottomNav } from './src/components/BottomNav';
import { INITIAL_SKILL_WORKERS } from './src/data/mockData';
import { TabType, SkillWorker } from './src/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [workers, setWorkers] = useState<SkillWorker[]>(INITIAL_SKILL_WORKERS);

  // Handle customer rating submission
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

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <HomeScreen
            workers={workers}
            onSubmitRating={handleSubmitRating}
          />
        );
      case 'Support':
        return <SupportScreen />;
      case 'Account':
        return <AccountScreen />;
      default:
        return (
          <HomeScreen
            workers={workers}
            onSubmitRating={handleSubmitRating}
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

        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
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
