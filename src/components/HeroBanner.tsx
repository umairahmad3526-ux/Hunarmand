import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface HeroBannerProps {
  onInstantService?: () => void;
  onScheduleService?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onInstantService,
  onScheduleService,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={styles.container}>
      {/* Promotional Card Container */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={['#144C32', '#1C6745', '#247F57']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          {/* Background Technician Image */}
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80',
            }}
            style={styles.technicianImage}
            resizeMode="cover"
          />

          {/* Semi-transparent overlay to ensure text contrast */}
          <LinearGradient
            colors={['rgba(20, 76, 50, 0.95)', 'rgba(28, 103, 69, 0.75)', 'transparent']}
            start={{ x: 0.45, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientOverlay}
          />

          {/* Left Content */}
          <View style={styles.content}>
            <Text style={styles.subheading}>AC not cooling?</Text>
            <Text style={styles.headline}>We'll fix it fast.</Text>

            {/* Feature points */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="flash" size={13} color="#FDE047" style={styles.featureIcon} />
                <Text style={styles.featureText}>Instant service in 30 mins</Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="shield-check" size={13} color="#A7F3D0" style={styles.featureIcon} />
                <Text style={styles.featureText}>Expert technicians • Genuine parts</Text>
              </View>
            </View>

            {/* Buttons Row */}
            <View style={styles.buttonsRow}>
              {/* Instant Service Button */}
              <TouchableOpacity
                style={styles.instantButton}
                onPress={onInstantService}
                activeOpacity={0.85}
              >
                <Ionicons name="flash" size={14} color={colors.primaryDark} style={{ marginRight: 4 }} />
                <Text style={styles.instantButtonText}>Instant Service</Text>
              </TouchableOpacity>

              {/* Schedule Service Button */}
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={onScheduleService}
                activeOpacity={0.8}
              >
                <Ionicons name="calendar-outline" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.scheduleButtonText}>Schedule Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Pagination Dots */}
      <View style={styles.paginationDots}>
        <TouchableOpacity
          onPress={() => setActiveSlide(0)}
          style={[styles.dot, activeSlide === 0 && styles.activeDot]}
        />
        <TouchableOpacity
          onPress={() => setActiveSlide(1)}
          style={[styles.dot, activeSlide === 1 && styles.activeDot]}
        />
        <TouchableOpacity
          onPress={() => setActiveSlide(2)}
          style={[styles.dot, activeSlide === 2 && styles.activeDot]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  cardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientCard: {
    height: 195,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  technicianImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '48%',
    opacity: 0.95,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    width: '68%',
    zIndex: 2,
    justifyContent: 'space-between',
    height: '100%',
  },
  subheading: {
    fontSize: 15,
    fontWeight: '500',
    color: '#D1FAE5',
    letterSpacing: -0.2,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginTop: -2,
  },
  featuresList: {
    marginVertical: 4,
    gap: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 6,
  },
  featureText: {
    fontSize: 11.5,
    color: '#F0FDF4',
    fontWeight: '500',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  instantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  instantButtonText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '600',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    width: 18,
    backgroundColor: colors.primaryLight,
  },
});
