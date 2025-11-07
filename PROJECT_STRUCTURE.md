# 📁 MathStar v2 - Project Structure

**Version:** 2.0.0  
**Last Updated:** November 2, 2025  
**Framework:** Vue 3 + TypeScript + Vite + Tailwind CSS

---

## 🎯 Project Overview

MathStar is a mobile-first educational math game designed for Ghanaian students. It features offline-capable gameplay, progress tracking, and multiple game modes optimized for low-bandwidth conditions.

---

## 📂 Root Directory Structure

```
math_star_v2/
├── src/                      # Source code (main application)
├── public/                   # Static assets (icons, lessons JSON)
├── node_modules/            # Dependencies (not tracked in git)
├── index.html               # Entry HTML file
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration (root)
├── tsconfig.app.json        # TypeScript configuration (app)
├── eslint.config.js         # ESLint configuration
└── vercel.json              # Vercel deployment config
```

---

## 📦 `/src` Directory - Main Application Code

```
src/
├── main.ts                  # App entry point
├── App.vue                  # Root Vue component
├── style.css                # Global styles
├── config.ts                # App configuration constants
├── assets/                  # Images, icons, sounds
├── components/              # Reusable Vue components
├── composables/             # Vue composition functions
├── layouts/                 # Layout wrapper components
├── plugins/                 # Vue plugins (FontAwesome, Toast)
├── router/                  # Vue Router configuration
├── services/                # External services (Web Vitals)
├── stores/                  # State management (Pinia)
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
└── views/                   # Page-level components (routes)
```

---

## 🧩 `/src/components` - Reusable Components

### **Base Components** (`/components/base/`)
Foundation components used throughout the app:

```
base/
├── AppButton.vue            # Reusable button component
├── AppForm.vue              # Form wrapper component
├── AppInput.vue             # Input field component
├── Divider.vue              # Visual separator
├── FloatingAddButton.vue    # Floating action button
├── LoadingSpinner.vue       # Loading indicator
├── MathStarLogo.vue         # App logo component
└── OfflineIndicator.vue     # Offline status indicator
```

**Usage Example:**
```vue
<template>
  <AppButton variant="primary" @click="handleClick">
    Submit Answer
  </AppButton>
</template>
```

---

### **Layout Components** (`/components/layout/`)
Page structure and navigation:

```
layout/
├── ActionHub.vue            # Quick action buttons
├── Footer.vue               # App footer
├── Navigation.vue           # Main navigation bar
└── mathstar/                # Skill Builder game components
    ├── AnswerButton.vue     # Answer selection button
    ├── GameHeader.vue       # Game header with score
    ├── GameOverModal.vue    # End game modal
    ├── QuestionCard.vue     # Problem display card
    └── ...                  # Other game-specific components
```

---

### **Network Components** (`/components/network/`)
Network status and optimization:

```
network/
├── DataUsageWarning.vue     # Low bandwidth warning
├── NetworkAwareImage.vue    # Optimized image loader
├── NetworkSpeedGauge.vue    # Connection speed indicator
└── RetryMechanism.vue       # Retry failed requests
```

**Purpose:** Handles Ghana-specific network conditions (2G/3G optimization)

---

### **Timed Challenge Components** (`/components/TimedChallenges/`)
Timer and game controls:

```
TimedChallenges/
├── AnalogClock.vue          # SVG-based analog clock (120px)
├── DigitalTimer.vue         # Digital countdown display
└── TimerToggle.vue          # Switch between timer styles
```

**Key Features:**
- Compact design (120px analog clock)
- Color-coded urgency (green → yellow → red)
- User preference saved to localStorage

---

### **System Components** (`/components/system/`)
Error handling and monitoring:

```
system/
├── ErrorBoundary.vue        # Catches Vue errors gracefully
└── ...
```

---

### **Analytics Components** (`/components/analytics/`)
Performance monitoring:

```
analytics/
└── WebVitalsMonitor.vue     # Core Web Vitals tracking
```

---

### **Payment Components** (`/components/payment/`)
(Future feature - currently placeholder)

```
payment/
└── MobileMoneyPaymentForm.vue  # Ghana mobile money integration
```

---

### **PWA Components** (`/components/pwa tools/`)
Progressive Web App features:

```
pwa tools/
├── OptimizedLoading.vue         # Lazy loading optimization
└── PWAUpdateNotification.vue    # App update prompt
```

---

## 📄 `/src/views` - Page Components (Routes)

Each view corresponds to a route in the app:

```
views/
├── HomeView.vue             # Splash screen / Initial landing
├── OptionsView.vue          # Main menu (Learn, Play, Settings)
├── LearnView.vue            # Topic selection for Learn Mode
├── LessonView.vue           # Individual lesson content
├── PlayView.vue             # Game mode selection (Skill Builder, Timed)
├── SkillBuilderView.vue     # Practice mode (no timer)
├── TimedChallengeView.vue   # Timed game mode (with clock)
├── SettingsView.vue         # App settings and preferences
├── ProgressView.vue         # User progress dashboard (placeholder)
└── NotFoundView.vue         # 404 error page
```

### **View Details:**

#### **HomeView.vue**
- **Route:** `/`
- **Purpose:** Splash screen / initial landing page
- **Features:** App logo, loading animation, auto-redirect to Options

#### **OptionsView.vue**
- **Route:** `/options`
- **Purpose:** Main navigation hub
- **Features:** Three cards (Learn, Play, Settings)

#### **LearnView.vue**
- **Route:** `/learn`
- **Purpose:** Choose math topic to learn
- **Features:** 8 topic cards (Addition, Subtraction, etc.)

#### **LessonView.vue**
- **Route:** `/learn/:topicId`
- **Purpose:** Display lesson content for selected topic
- **Features:** Topic explanation, examples, practice problems

#### **PlayView.vue**
- **Route:** `/play`
- **Purpose:** Choose game mode
- **Features:** Skill Builder card, Timed Challenge card

#### **SkillBuilderView.vue** ⭐ (Major Component)
- **Route:** `/play/skill-builder`
- **Purpose:** Practice mode without time pressure
- **Stages:** 
  1. Topic Selection (8 topics)
  2. Difficulty Selection (Easy, Medium, Hard)
  3. Problem Solving (10-20 problems)
  4. Feedback (instant with explanations)
  5. Results Summary (score, accuracy, stats)
- **Features:**
  - Client-side problem generation
  - Streak bonuses
  - localStorage stats tracking
  - Offline-capable

#### **TimedChallengeView.vue** ⭐ (Major Component)
- **Route:** `/play/timed-challenge`
- **Purpose:** Competitive timed mode
- **Stages:**
  1. Time Limit Selection (1, 3, 5 minutes)
  2. Countdown (3-2-1-GO!)
  3. Active Gameplay (solve problems against clock)
  4. Results (score, accuracy, high score)
- **Features:**
  - Analog/Digital timer toggle
  - Random problem generation
  - Streak system with bonuses
  - High score tracking
  - Urgency color coding (green → yellow → red)

#### **SettingsView.vue**
- **Route:** `/settings`
- **Purpose:** App configuration
- **Features:**
  - Sound effects toggle
  - Default difficulty preference
  - Timer style preference
  - App information (version, about)

---

## 🛠️ `/src/utils` - Utility Functions

```
utils/
└── problemGenerator.ts      # Math problem generation engine
```

### **problemGenerator.ts** ⭐ (Core Logic)

**Exports:**
```typescript
// Types
type Difficulty = 'easy' | 'medium' | 'hard'
type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'
interface Problem { id, operation, difficulty, operand1, operand2, correctAnswer, displayText, points }

// Functions
generateProblem(operation?, difficulty?) → Problem
generateProblems(count, operation?, difficulty?) → Problem[]
checkAnswer(problem, userAnswer) → boolean
calculateStreakBonus(streakCount) → number
getStreakMessage(streakCount) → string
getRandomDifficulty() → Difficulty
getRandomOperation() → Operation
```

**Features:**
- ✅ Client-side generation (offline-capable)
- ✅ 4 operations (addition, subtraction, multiplication, division)
- ✅ 3 difficulty levels with appropriate number ranges
- ✅ Streak bonus calculation (2-15+ correct in a row)
- ✅ Positive results only (no negative answers)
- ✅ Whole number division (no remainders)

**Problem Generation Logic:**

| Difficulty | Number Range | Points | Example Problems |
|------------|--------------|--------|------------------|
| Easy       | 1-10         | 10     | `5 + 3`, `8 - 2` |
| Medium     | 10-50        | 15     | `25 + 17`, `12 × 5` |
| Hard       | 50-100       | 20     | `87 - 45`, `144 ÷ 12` |

---

## 🧭 `/src/router` - Routing Configuration

```
router/
└── index.ts                 # Vue Router setup and routes
```

### **Route Structure:**

```typescript
const routes = [
  { path: '/', component: HomeView },
  { path: '/options', component: OptionsView },
  { path: '/learn', component: LearnView },
  { path: '/learn/:topicId', component: LessonView },
  { path: '/play', component: PlayView },
  { path: '/play/skill-builder', component: SkillBuilderView },
  { path: '/play/timed-challenge', component: TimedChallengeView },
  { path: '/settings', component: SettingsView },
  { path: '/progress', component: ProgressView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]
```

**Features:**
- ✅ Lazy loading (code splitting per route)
- ✅ Route validation (checks valid topicId)
- ✅ Meta tags (title, description for SEO)
- ✅ Navigation guards (page title setting)
- ✅ Scroll behavior (scroll to top on navigation)

---

## 🎨 `/src/layouts` - Layout Wrappers

```
layouts/
├── default.vue              # Default page layout
├── AuthLayout.vue           # Authentication layout (future)
└── ErrorLayout.vue          # Error page layout
```

**Purpose:** Provides consistent structure across pages (header, main, footer)

---

## 🔌 `/src/composables` - Vue Composition Functions

```
composables/
├── useNetworkStatus.ts      # Network connectivity state
├── useOfflineStorage.ts     # localStorage wrapper
├── usePWA.ts                # PWA install prompt
├── useQuestions.ts          # Question management
├── useToast.ts              # Toast notification system
└── useMobileMoneyPayment.ts # Payment integration (future)
```

**Example Usage:**
```typescript
import { useNetworkStatus } from '@/composables/useNetworkStatus'

const { isOnline, connectionType } = useNetworkStatus()
```

---

## 🎛️ `/src/plugins` - Vue Plugins

```
plugins/
├── fontawesome.ts           # FontAwesome icon setup
└── toast.ts                 # Toast notification plugin
```

---

## 🗄️ `/src/stores` - State Management (Pinia)

```
stores/
└── root.ts                  # Root store
```

---

## 🌐 `/src/services` - External Services

```
services/
└── WebVitalsService.ts      # Performance monitoring
```

---

## 📊 `/public` - Static Assets

```
public/
├── manifest.json            # PWA manifest
├── offline.html             # Offline fallback page
├── icons/                   # App icons (various sizes)
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── ...
├── lessons/                 # Lesson content (JSON)
│   ├── addition.json
│   ├── subtraction.json
│   ├── multiplication.json
│   ├── division.json
│   ├── fractions.json
│   ├── decimals.json
│   ├── algebra-basics.json
│   └── geometry.json
└── screenshots/             # App screenshots
```

---

## 🎮 Game Flow Architecture

### **Learn Mode Flow:**
```
HomeView → OptionsView → LearnView → LessonView
   ↓           ↓            ↓             ↓
Splash    Main Menu    Topic Grid    Lesson Content
Screen    (3 cards)    (8 topics)    (Explain + Practice)
```

### **Skill Builder Flow:**
```
OptionsView → PlayView → SkillBuilderView
     ↓           ↓              ↓
Main Menu   Game Mode     1. Topic Selection
(3 cards)   Selection      ↓
            (2 cards)      2. Difficulty Selection
                          ↓
                          3. Problem Solving (10-20 problems)
                          ↓
                          4. Instant Feedback (after each answer)
                          ↓
                          5. Results Summary (score, stats)
```

### **Timed Challenge Flow:**
```
OptionsView → PlayView → TimedChallengeView
     ↓           ↓              ↓
Main Menu   Game Mode     1. Timer Style Toggle
(3 cards)   Selection      ↓
            (2 cards)      2. Time Limit Selection (1/3/5 min)
                          ↓
                          3. Countdown (3-2-1-GO!)
                          ↓
                          4. Active Gameplay (race against clock)
                          ↓
                          5. Results Summary (score, high score)
```

---

## 💾 localStorage Structure

### **Settings:**
```json
// Key: "mathstar_settings"
{
  "soundEnabled": true,
  "defaultDifficulty": "medium",
  "defaultTimerStyle": "digital"
}
```

### **Skill Builder Stats:**
```json
// Key: "mathstar_skill_builder_stats"
{
  "totalSolved": 150,
  "accuracy": 87,
  "lastPlayed": 1730220000000
}

// Key: "mathstar_skill_builder_history" (array)
[
  {
    "topicId": "addition",
    "difficulty": "medium",
    "score": 280,
    "totalProblems": 15,
    "correctAnswers": 14,
    "accuracy": 93,
    "timestamp": 1730220000000
  }
]

// Key: "mathstar_topic_addition" (per topic)
{
  "attempted": 50,
  "accuracy": 92
}
```

### **Timed Challenge High Scores:**
```json
// Key: "mathstar_highscore_60" (1 minute)
"450"

// Key: "mathstar_highscore_180" (3 minutes)
"1250"

// Key: "mathstar_highscore_300" (5 minutes)
"2100"
```

### **Timer Preference:**
```json
// Key: "mathstar_timer_preference"
"digital" // or "analog"
```

---

## 🎨 Design System

### **Colors (Tailwind):**
```javascript
// Primary: Blue shades
primary: {
  DEFAULT: '#1F3A8A',
  light: '#3651A5',
  dark: '#152970',
  hover: '#18307A'
}

// Secondary: Lighter blue
secondary: {
  DEFAULT: '#3B81F6',
  light: '#5C97F8',
  dark: '#2A6BD7',
  hover: '#2A70E5'
}

// Game Mode Colors:
// Learn Mode: Blue (#3B82F6)
// Skill Builder: Green (#10B981)
// Timed Challenge: Orange/Red (#F59E0B → #EF4444)
// Settings: Gray (#6B7280)
```

### **Touch Targets:**
- Minimum: **48px × 48px** (mobile-friendly)
- Comfortable: **56px × 56px** (recommended)

### **Typography:**
```css
/* Headings */
h1: 2xl (24px) md:3xl (30px)
h2: xl (20px) md:2xl (24px)

/* Body Text */
base: 16px
sm: 14px
xs: 12px

/* Problem Display */
4xl-6xl: 36-60px (large, clear numbers)
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First (Default) */
base: 0px - 639px

/* Tablet */
sm: 640px+

/* Desktop */
md: 768px+
lg: 1024px+
```

---

## 🚀 Performance Optimizations

### **Ghana-Specific:**
1. **Offline-First:** All game logic runs client-side
2. **Lazy Loading:** Routes loaded on-demand
3. **Code Splitting:** Each route is a separate chunk
4. **Bundle Size:** Target < 300KB initial load
5. **Image Optimization:** Compressed, responsive images
6. **No External APIs:** Zero network calls during gameplay

### **Build Output:**
```
dist/
├── index.html (< 5KB)
├── assets/
│   ├── index-[hash].js (< 150KB gzipped)
│   ├── vendor-[hash].js (< 100KB gzipped)
│   └── [route]-[hash].js (each < 50KB)
└── ...
```

---

## 🧪 Component Testing Strategy

### **Key Components to Test:**
1. **problemGenerator.ts** - Core logic (most critical)
2. **SkillBuilderView.vue** - Complete game flow
3. **TimedChallengeView.vue** - Timer accuracy
4. **AnalogClock.vue** - Rotation calculation
5. **DigitalTimer.vue** - Countdown accuracy

### **Test Scenarios:**
- ✅ Problem generation (all operations, all difficulties)
- ✅ Answer validation
- ✅ Streak bonus calculation
- ✅ Score accumulation
- ✅ localStorage persistence
- ✅ Timer countdown (start, pause, end)
- ✅ Offline functionality

---

## 📦 Dependencies

### **Core:**
- `vue@^3.4.0` - Frontend framework
- `vue-router@^4.3.0` - Routing
- `typescript@~5.4.0` - Type safety

### **UI:**
- `tailwindcss@^3.4.1` - Utility CSS
- `@fortawesome/fontawesome-free` - Icons

### **Build Tools:**
- `vite@^6.0.0` - Build tool
- `@vitejs/plugin-vue@^5.0.0` - Vue plugin

---

## 🎯 Key Features Summary

### **✅ Implemented:**
1. **Learn Mode** - 8 math topics with lessons
2. **Skill Builder** - Practice mode with instant feedback
3. **Timed Challenge** - Competitive mode with timer
4. **Settings** - Sound, difficulty, timer preferences
5. **Offline Support** - 100% client-side gameplay
6. **Progress Tracking** - localStorage-based stats
7. **Mobile-First** - Optimized for touch devices
8. **Analog/Digital Timer** - User preference toggle
9. **Streak System** - Bonus points for consecutive correct answers
10. **High Scores** - Per-time-limit leaderboards

### **🚧 Future Enhancements:**
1. Progress Dashboard (placeholder exists)
2. User Authentication
3. Mobile Money Payments
4. Sound Effects (toggle exists, sounds not implemented)
5. WhatsApp Sharing
6. Multiplayer Mode
7. Cloud Sync (when online)

---

## 📈 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint (3G) | < 2s | ✅ |
| Time to Interactive (3G) | < 5s | ✅ |
| Initial Bundle Size | < 300KB | ✅ |
| Lighthouse Score | > 90 | ✅ |
| Offline Functionality | 100% | ✅ |

---

## 🔒 Security & Privacy

- ✅ No user data collection
- ✅ All data stored locally (localStorage)
- ✅ No external API calls
- ✅ No tracking or analytics (Web Vitals only, local)
- ✅ GDPR compliant (no cookies, no tracking)

---

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🌍 Deployment

**Platform:** Vercel  
**URL:** `https://mathstar-v2.vercel.app` (example)  
**Build Command:** `npm run build`  
**Output Directory:** `dist`

**Vercel Config:** See `vercel.json`

---

## 📞 Support

**Built by:** Stratonea  
**For:** Ghanaian Students  
**Version:** 2.0.0  
**Last Updated:** November 2, 2025

---

## 🎓 Learning Outcomes

Students using MathStar will:
1. Practice basic arithmetic operations
2. Build mental math speed
3. Learn through instant feedback
4. Track their progress over time
5. Develop problem-solving skills
6. Gain confidence in mathematics

---

**End of Project Structure Documentation**
