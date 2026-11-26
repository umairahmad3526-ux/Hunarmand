# Hunarmand (هنرمند) - Skill Worker Marketplace

**Hunarmand** is a modern, high-performance React Native (Expo) mobile application designed as a **Skill Worker Marketplace** that connects customers directly with background-verified skilled professionals (electricians, plumbers, carpenters, painters, AC mechanics, construction masons, and 19+ more specialized trades).

Designed with inspiration from modern card-based mobile interfaces featuring an elegant dark green (`#0D3B22`) and clean white palette, soft pastel category cards, and direct WhatsApp connectivity.

---

## 🎨 Visual Design Structure (Inspired by Reference)

1. **Header Section**
   - User profile avatar.
   - Personalized greeting: `"Good morning, Ahmad 👋"`.
   - Circular notification button with unread count badge.

2. **Main Highlight Card (Dark Green)**
   - Elegant dark forest green container (`#0D3B22`) with smooth 22px corner radius.
   - Skill worker marketplace statistics: **5,600+ Verified Skilled Workers Available**.
   - Subtitle: *Active background-checked technicians near your location*.
   - Vibrant green action button: **+ Post Work** to submit job requests directly to local pros.

3. **Promotional Banner (Soft Mint)**
   - Soft mint pastel background (`#EAF7EE`) with subtle green border.
   - Heading: **"Fix anything, anywhere"** with trade highlights (*Electrician, Plumber or AC Master*).
   - High-quality cutout graphic of technicians and tools.

4. **"What do you need today?" 2-Column Category Grid**
   - Displays all **25 professional categories** in a 2-column card grid.
   - Soft pastel backgrounds for distinct visual hierarchy:
     - 🌿 Mint Green (`#EBF7EE`)
     - 🍑 Warm Peach / Sand (`#FEF7EB`)
     - 🔮 Soft Lavender (`#F4ECFB`)
     - 🌊 Ice Blue (`#EDF5FE`)
     - 🌸 Soft Rose (`#FDF2F4`)
     - 🪨 Slate & Teal tints
   - Centered high-resolution visual of the trade.
   - Category name & concise service description.
   - Circular action button with matching arrow color (`→`).
   - Verified technician count per trade.

5. **Search & Location Bar**
   - Clean rounded card at the bottom: `"Where do you need service? • 221B Baker Street, London"`.
   - Tap to change address or search skills.

6. **All 25 Skill Worker Categories Included**:
   1. **Electrician** (Wiring, breakers, circuits, lighting)
   2. **Plumber** (Sanitary fittings, leakage, water pumps, pipes)
   3. **Carpenter** (Custom furniture, doors, modular cabinets)
   4. **AC & HVAC** (Gas recharge, inverter repair, jet cleaning)
   5. **Painter & Polish** (Interior/exterior, texture, lacquer)
   6. **Mason & Builder** (Bricklaying, plaster, floor renovation)
   7. **Welder & Grills** (Main gates, safety grills, steel sheds)
   8. **Auto Mechanic** (Car EFI diagnostics, brakes, suspension)
   9. **House Cleaning** (Deep cleaning, sofa shampoo, kitchen sanitization)
   10. **Washing Machine** (Automatic/manual washer drum & motor fix)
   11. **Refrigerator** (Compressors, nitrogen test, deep freezers)
   12. **Microwave Oven** (Magnetrons, diodes, touch keypads)
   13. **Roof & Seepage** (Chemical bitumen, dampness proofing)
   14. **Gardener** (Lawn mowing, tree trimming, plant nutrition)
   15. **Locksmith** (24/7 door locks, key duplication, safes)
   16. **Glass & Aluminum** (Sliding windows, office partitions, showers)
   17. **Marble & Tiles** (Diamond grinding, crystallization polish)
   18. **CCTV & Security** (IP cameras, biometric, smart doorbells)
   19. **Solar Energy** (Hybrid inverters, panel mounting, net metering)
   20. **Pest Control** (Termite drilling, bedbugs, fumigation)
   21. **Ceiling & POP** (Gypsum boards, hidden LED profiles)
   22. **Water Filter / RO** (Membrane replacement, TDS calibration)
   23. **Geyser & Heater** (Gas boilers, instant heating elements)
   24. **Handyman** (TV mounting, drilling, furniture assembly)
   25. **Home Appliances** (Blenders, vacuum cleaners, irons)

7. **Direct WhatsApp Connectivity**
   - Clicking on any trade displays verified technicians.
   - Each worker card provides:
     - Worker Name & Avatar with green verification badge.
     - **Exact Shop Name & Physical Address** (e.g. *Shop #14, Main Commercial Market, Baker Street*).
     - Proximity indicator (e.g. *0.8 km away*).
     - Star ratings & customer reviews.
     - **Chat on WhatsApp Button** (launches `https://wa.me/<number>` directly).
     - Direct Phone Call button.
     - **Open Shop in Google Maps** navigation link.

8. **Customer Rating & Review System**
   - Customers can tap **Rate Worker** to submit:
     - 1 to 5 star rating.
     - Customer name.
     - Review text and feedback.
   - Dynamically updates the technician's score and adds the review in real time.

9. **Bottom Navigation (5 Tabs)**
   - **Home**: Main storefront matching the reference image.
   - **Categories**: Full search and filter directory of all 25 trades.
   - **Requests**: Customer job posts, quotes, and worker proposals.
   - **Messages**: Direct WhatsApp chat history and contacts.
   - **Profile**: Account management, saved addresses, and "Join as Pro" registration.

---

## 🛠️ Tech Stack

- **Framework**: React Native 0.88 + Expo SDK 58 (TypeScript)
- **Icons**: `@expo/vector-icons` (Ionicons & MaterialCommunityIcons)
- **Safe Area**: `react-native-safe-area-context`
- **SVG Support**: `react-native-svg`
- **Web Preview**: `react-dom` + `react-native-web`

---

## 🚀 Running the App

```bash
cd Hunarmand

# Run in Web Browser
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```
