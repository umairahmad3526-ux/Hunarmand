export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons' | 'Feather';
}

export interface RecommendedService {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  reviewsCount: string;
  duration: string;
  price: number;
  originalPrice: number;
  currency: string;
  isBestseller?: boolean;
  verified: boolean;
  description: string;
  category: string;
  features: string[];
}

export interface TrustBadge {
  id: string;
  title: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
  subtitle?: string;
}

export interface Booking {
  id: string;
  serviceTitle: string;
  category: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  technicianName: string;
  technicianPhone: string;
  technicianRating: number;
  address: string;
}

export type TabType = 'Home' | 'Bookings' | 'Support' | 'Account';
