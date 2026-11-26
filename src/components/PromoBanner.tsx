import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface PromoBannerProps {
  onPress?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.banner}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {/* Left Side: Icon, Headline & Subtitle */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.chevronPill}>
              <Ionicons name="chevron-forward" size={13} color={colors.primaryLight} />
            </View>
            <Text style={styles.headline}>Fix anything, anywhere</Text>
          </View>
          <Text style={styles.subtitle}>Electrician, Plumber or AC Master</Text>
        </View>

        {/* Right Side: Composite illustration of workers/tools */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=350&q=80',
          }}
          style={styles.illustration}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.mintBanner,
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.mintBorder,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    zIndex: 2,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chevronPill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#4B5563',
    marginTop: 3,
    fontWeight: '500',
    paddingLeft: 26,
  },
  illustration: {
    width: 86,
    height: 60,
    borderRadius: 12,
  },
});
