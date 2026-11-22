# Hunarmand (هنرمند) - Skill Worker On-Demand App

A modern, high-performance React Native (Expo) mobile application for booking verified skill workers and technicians on demand (AC repair, home cleaning, electrical, plumbing, appliance repair, and more).

Designed with pixel-level precision matching the premium on-demand service UI design with emerald green gradients, clean typography, interactive booking flows, and live tracking.

---

## 📱 Features & UI Breakdown

1. **Header & Location Picker**
   - Live location detection & address switch dropdown ("221B Baker Street, London").
   - Notification center with badge indicators.
   - Real-time shopping cart counter.

2. **Search & Smart Filtering**
   - Fast keyword search across appliances and services.
   - Quick filters for instant service (30 mins delivery), pricing, and top-rated professionals.

3. **Hero Promotional Banner**
   - Deep emerald gradient card (`#144C32` → `#247F57`) with overlay technician imagery.
   - Feature badges: **Instant service in 30 mins** & **Expert technicians • Genuine parts**.
   - Direct CTA buttons: **⚡ Instant Service** and **📅 Schedule Service**.
   - Carousel indicator pagination.

4. **Popular Services Grid (4x2)**
   - House Cleaning, AC Repair, Plumbing, Electrical, Washing Machine, Refrigerator, Microwave Oven, and More Services.
   - Custom mint-tinted icon containers (`#EBF6EE`) with high-contrast iconography.

5. **"Recommended for you" Horizontal Carousel**
   - Bestseller tags & service cover imagery.
   - Star ratings with review counts and estimated completion duration.
   - **Verified Professional** assurance badge.
   - Dynamic price comparison (discounted vs original strikethrough price) with a prominent **Book Now** action button.

6. **Trust & Warranty Bar**
   - **Verified Professionals** (background-checked experts)
   - **Transparent Pricing** (no hidden charges)
   - **Up to 30 Days Warranty** (free re-service guarantee)
   - **Live Tracking** (real-time technician GPS arrival)

7. **Interactive Booking Flow & Modals**
   - Bottom sheet for booking slot selection (Today, Tomorrow, Pick Time).
   - Price breakdown (item total, instant discount, safety fee).
   - Address confirmation & special instructions.

8. **Multi-Tab Architecture**
   - **Home**: Main storefront & recommendation feed.
   - **Bookings**: Active bookings with live status stepper (Confirmed → Assigned → On The Way → Completed), technician direct call/chat, and past invoices.
   - **Support**: 24/7 interactive assistant chat, emergency hotline, and warranty policy.
   - **Account**: User profile, saved addresses, wallet balance, and "Join as Pro" skilled worker onboarding.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React Native 0.88 + Expo SDK 58 (TypeScript)
- **Icons**: `@expo/vector-icons` (Ionicons, MaterialCommunityIcons)
- **Gradients**: `expo-linear-gradient`
- **Safe Area**: `react-native-safe-area-context`
- **SVG**: `react-native-svg`
- **Web Support**: `react-dom` + `react-native-web`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Locally
- **Start Metro Bundler**:
  ```bash
  npm start
  ```
- **Run in Web Browser**:
  ```bash
  npm run web
  ```
- **Run on Android**:
  ```bash
  npm run android
  ```
- **Run on iOS** (macOS required):
  ```bash
  npm run ios
  ```

---

## 📁 Project Structure

```
Hunarmand/
├── assets/                 # App icons, splash, and mock images
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Location picker & top actions
│   │   ├── SearchBar.tsx          # Search & filter input
│   │   ├── HeroBanner.tsx         # Emerald promotional banner
│   │   ├── PopularServices.tsx    # 8-service category grid
│   │   ├── RecommendedServices.tsx# Horizontal cards with booking
│   │   ├── TrustBadges.tsx        # 4 trust & warranty assurances
│   │   ├── BottomNav.tsx          # 4-tab elevated navigation
│   │   ├── BookingModal.tsx       # Bottom sheet booking checkout
│   │   └── LocationModal.tsx      # Saved address selector
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Main landing matching reference image
│   │   ├── BookingsScreen.tsx     # Active order tracker & history
│   │   ├── SupportScreen.tsx      # 24/7 Live chat & support
│   │   └── AccountScreen.tsx      # Profile, wallet & pro onboarding
│   ├── data/
│   │   └── mockData.ts            # Authentic service catalogs & bookings
│   ├── theme/
│   │   └── colors.ts              # Emerald, mint & neutral color tokens
│   └── types/
│       └── index.ts               # TypeScript interfaces
├── App.tsx                        # Root app component
├── app.json                       # Expo configuration (App Name: Hunarmand)
└── package.json
```
