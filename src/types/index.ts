export interface WorkerReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SkillWorker {
  id: string;
  name: string;
  categoryId: string;
  categoryTitle: string;
  avatar: string;
  shopName: string;
  shopAddress: string;
  city: string;
  whatsappNumber: string; // e.g. '923015550192'
  displayPhone: string; // e.g. '+92 301 555 0192'
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  verified: boolean;
  distance: string; // e.g. '0.8 km away'
  bio: string;
  skills: string[];
  openingHours: string;
  reviews: WorkerReview[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons' | 'Feather';
  imageUrl: string;
  bgColor: string;
  arrowColor: string;
  workerCount: number;
}

export interface WorkRequest {
  id: string;
  title: string;
  categoryTitle: string;
  description: string;
  status: 'pending' | 'in_review' | 'connected' | 'completed';
  date: string;
  budgetEstimate: string;
  address: string;
  proposalsCount: number;
}

export interface ChatThread {
  id: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  categoryTitle: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  whatsappNumber: string;
  displayPhone: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
}

export type TabType = 'Home' | 'Categories' | 'Requests' | 'Messages' | 'Profile';
