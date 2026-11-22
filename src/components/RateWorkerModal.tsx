import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SkillWorker } from '../types';
import { colors } from '../theme/colors';

interface RateWorkerModalProps {
  visible: boolean;
  worker: SkillWorker | null;
  onClose: () => void;
  onSubmitRating: (workerId: string, rating: number, userName: string, comment: string) => void;
}

export const RateWorkerModal: React.FC<RateWorkerModalProps> = ({
  visible,
  worker,
  onClose,
  onSubmitRating,
}) => {
  if (!worker) return null;

  const [rating, setRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    if (!userName.trim()) {
      Alert.alert('Name Required', 'Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Review Required', 'Please write a brief review about the worker.');
      return;
    }

    onSubmitRating(worker.id, rating, userName.trim(), comment.trim());
    setUserName('');
    setComment('');
    setRating(5);
    onClose();
    Alert.alert('Thank You!', `Your ${rating}-star review for ${worker.name} has been published.`);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Rate & Review</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Worker summary */}
          <View style={styles.workerSummary}>
            <Text style={styles.workerName}>{worker.name}</Text>
            <Text style={styles.shopName}>{worker.shopName}</Text>
          </View>

          {/* Interactive Star Selection */}
          <Text style={styles.ratingPrompt}>Tap to rate your experience:</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
                style={styles.starTouch}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= rating ? '#F59E0B' : '#D1D5DB'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingScoreLabel}>
            {rating === 5 ? 'Excellent (5.0)' : rating === 4 ? 'Very Good (4.0)' : rating === 3 ? 'Average (3.0)' : 'Needs Improvement'}
          </Text>

          {/* User Name input */}
          <Text style={styles.inputLabel}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Hamza Ali"
            placeholderTextColor="#9CA3AF"
            value={userName}
            onChangeText={setUserName}
          />

          {/* Comment input */}
          <Text style={styles.inputLabel}>Your Experience & Feedback</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share how the worker performed, punctuality, pricing..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            value={comment}
            onChangeText={setComment}
          />

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.submitBtnText}>Submit Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  workerSummary: {
    backgroundColor: '#F8FAF9',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  workerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  shopName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  ratingPrompt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
  },
  starTouch: {
    padding: 4,
  },
  ratingScoreLabel: {
    textAlign: 'center',
    fontSize: 12.5,
    fontWeight: '700',
    color: '#D97706',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13.5,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  textArea: {
    height: 75,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
