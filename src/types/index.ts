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
  categoryId: string; // e.g., 'ac-repair'
  categoryTitle: string; // e.g., 'AC Repair'
  avatar: string;
  shopName: string;
  shopAddress: string;
  city: string;
  whatsappNumber: string; // international format e.g. '923015550192'
  displayPhone: string; // formatted e.g. '+92 301 555 0192'
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
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons' | 'Feather';
  workerCount: number;
  description: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
}

export type TabType = 'Home' | 'Support' | 'Account';
