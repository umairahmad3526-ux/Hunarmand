# Hunarmand (هنرمند) - Verified Skill Worker Platform

**Hunarmand** is a modern React Native (Expo) mobile application connecting customers directly with verified skilled workers and local technicians (AC repair, home cleaning, plumbing, electrical, washing machines, refrigeration, microwave ovens, etc.).

---

## 🌟 Key Features & Workflow

### 1. Direct Skill Worker Discovery
- Clean **Services Grid** displaying core trades:
  - **House Cleaning**
  - **AC Repair**
  - **Plumbing**
  - **Electrical**
  - **Washing Machine**
  - **Refrigerator**
  - **Microwave Oven**
  - **More Services**
- Real-time search by technician name, shop address, or specific skill.

### 2. Direct WhatsApp Connectivity 💬
- Each verified worker has a dedicated **WhatsApp Connect** action button.
- Clicking the WhatsApp button launches WhatsApp directly (`https://wa.me/<number>`) with an automated greeting and service inquiry.
- Direct phone call dialer button included.

### 3. Transparent Shop Location & Address 📍
- Every worker's card and profile displays:
  - Exact **Shop Address** (e.g. *Shop #14, Main Commercial Market, Baker Street*).
  - Proximity indicator (*e.g. 0.8 km away*).
  - Working hours.
  - Interactive **Open in Google Maps** navigation link.

### 4. Customer Ratings & Reviews ⭐
- View authentic ratings and reviews left by other customers.
- Customers can tap **Rate Worker** to give a 1 to 5 star rating, their name, and detailed feedback.
- Updates the worker's average score and review count in real-time.

### 5. Streamlined 3-Tab Experience
- **Services (Home)**: Search and browse local verified technicians.
- **Support**: 24/7 help assistant, emergency helpline, and contact channels.
- **Account**: User profile, saved addresses, wallet balance, and "Join as Pro" registration.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React Native 0.88 + Expo SDK 58 (TypeScript)
- **Icons**: `@expo/vector-icons` (Ionicons & MaterialCommunityIcons)
- **Safe Area**: `react-native-safe-area-context`
- **SVG Support**: `react-native-svg`
- **Web Preview**: `react-dom` + `react-native-web`

---

## 🚀 Running the Project

```bash
cd Hunarmand

# Run in Web Browser
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 📁 Project Architecture

```
Hunarmand/
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Location picker & top bar
│   │   ├── SearchBar.tsx          # Real-time search input
│   │   ├── PopularServices.tsx    # 8-service category grid
│   │   ├── WorkersListModal.tsx   # Verified workers list with WhatsApp buttons
│   │   ├── WorkerProfileModal.tsx # Full profile, shop address & reviews
│   │   ├── RateWorkerModal.tsx    # 5-star customer rating modal
│   │   ├── TrustBadges.tsx        # 4 trust & transparency badges
│   │   ├── LocationModal.tsx      # Saved address selector
│   │   └── BottomNav.tsx          # 3-tab navigation (Services, Support, Account)
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Main services hub
│   │   ├── SupportScreen.tsx      # 24/7 customer support
│   │   └── AccountScreen.tsx      # Profile & pro onboarding
│   ├── utils/
│   │   └── linking.ts             # Direct WhatsApp, phone call & map openers
│   ├── data/
│   │   └── mockData.ts            # Verified workers with shop addresses & WhatsApp numbers
│   ├── theme/
│   │   └── colors.ts              # Emerald green & mint design tokens
│   └── types/
│       └── index.ts               # TypeScript data definitions
├── App.tsx
├── app.json
└── package.json
```
