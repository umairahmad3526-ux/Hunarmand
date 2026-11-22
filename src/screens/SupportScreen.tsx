import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const SupportScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'agent',
      text: 'Hello Umair! Welcome to Hunarmand 24/7 Support. How can we assist you with your home services today?',
      time: '12:00 PM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Hi, I wanted to confirm if the AC technician brings original spare parts.',
      time: '12:02 PM',
    },
    {
      id: '3',
      sender: 'agent',
      text: 'Yes, absolutely! All Hunarmand technicians only use 100% genuine brand-certified parts backed with our 30-day warranty guarantee.',
      time: '12:03 PM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      time: 'Just now',
    };
    setMessages([...messages, newMsg]);
    setInputMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: 'Thank you for reaching out! A dedicated Hunarmand specialist is reviewing your request.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hunarmand Support</Text>
        <Text style={styles.headerSubtitle}>Always here to help you 24/7</Text>
      </View>

      {/* Quick Help Action Cards */}
      <View style={styles.quickActionsRow}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => Alert.alert('Helpline', 'Calling Hunarmand Toll-Free: 0800-48627')}
        >
          <View style={styles.actionIconCircle}>
            <Ionicons name="call-outline" size={18} color={colors.primaryLight} />
          </View>
          <Text style={styles.actionTitle}>Call Helpline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => Alert.alert('Email Support', 'Opening email to support@hunarmand.app')}
        >
          <View style={styles.actionIconCircle}>
            <Ionicons name="mail-outline" size={18} color={colors.primaryLight} />
          </View>
          <Text style={styles.actionTitle}>Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => Alert.alert('Hunarmand Warranty', '30-Day Money-Back & Free Re-service Guarantee on all repairs.')}
        >
          <View style={styles.actionIconCircle}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.primaryLight} />
          </View>
          <Text style={styles.actionTitle}>Warranty Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView
        contentContainerStyle={styles.chatBody}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.chatSectionTitle}>Live Assistant Chat</Text>
        {messages.map((item) => {
          const isUser = item.sender === 'user';
          return (
            <View
              key={item.id}
              style={[styles.messageBubbleWrap, isUser ? styles.userWrap : styles.agentWrap]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.userBubble : styles.agentBubble,
                ]}
              >
                <Text style={[styles.messageText, isUser ? styles.userText : styles.agentText]}>
                  {item.text}
                </Text>
                <Text style={[styles.messageTime, isUser ? styles.userTime : styles.agentTime]}>
                  {item.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your question or issue..."
          placeholderTextColor="#9CA3AF"
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mintLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chatSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  chatBody: {
    padding: 16,
    paddingBottom: 20,
  },
  messageBubbleWrap: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  userWrap: {
    justifyContent: 'flex-end',
  },
  agentWrap: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: colors.primaryLight,
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  userText: {
    color: '#FFFFFF',
  },
  agentText: {
    color: colors.textPrimary,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  agentTime: {
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAF9',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 13.5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
