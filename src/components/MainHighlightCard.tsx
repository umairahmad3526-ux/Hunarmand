import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface MainHighlightCardProps {
  onPressAction?: () => void;
  activeProsCount?: string;
  cityName?: string;
}

export const MainHighlightCard: React.FC<MainHighlightCardProps> = ({
  onPressAction,
  activeProsCount = '5,600',
  cityName = 'London',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Left Side: Marketplace Stats & Info */}
        <View style={styles.textGroup}>
          <Text style={styles.cardSubtitle}>Verified Skilled Workers</Text>
          <View style={styles.numberRow}>
            <Text style={styles.numberText}>{activeProsCount}</Text>
            <Text style={styles.activeLabel}> Available</Text>
            <Ionicons name="checkmark-circle" size={17} color={colors.primaryAccent} style={{ marginLeft: 6 }} />
          </View>
          <Text style={styles.locationSubtitle}>Active technicians near {cityName}</Text>
        </View>

        {/* Right Side: Action Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressAction}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={16} color="#FFFFFF" style={{ marginRight: 2 }} />
          <Text style={styles.actionButtonText}>Post Work</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#092917',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  textGroup: {
    flex: 1,
    marginRight: 12,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A7F3D0',
    letterSpacing: -0.2,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
    marginBottom: 2,
  },
  numberText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D1FAE5',
  },
  locationSubtitle: {
    fontSize: 11,
    color: '#A7F3D0',
    fontWeight: '400',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryAccent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});
