<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\PlayView.vue -->
<template>
  <!-- ===== Main Container ===== -->
  <!-- 
    Full-screen gradient background matching Learn Mode
    - Mobile-first responsive design
    - Touch-optimized buttons and cards
  -->
  <div class="min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary">
    
    <!-- ===== Header Section ===== -->
    <!-- 
      Fixed header with title and back button
      - Matches Learn Mode design for consistency
      - Large touch target for back button
    -->
    <header class="sticky top-0 z-20 bg-primary/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          
          <!-- Back Button -->
          <button
            @click="navigateBack"
            class="
              flex items-center gap-2
              text-white
              font-semibold
              text-base
              transition-transform
              duration-200
              hover:scale-110
              active:scale-95
              min-w-[48px] min-h-[48px]
            "
            aria-label="Go back to options"
          >
            <i class="fas fa-arrow-left text-xl"></i>
            <span class="hidden sm:inline">Back</span>
          </button>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-bold text-white">
            Play & Practice 🎮
          </h1>
        </div>

        <!-- Subtitle -->
        <p class="text-white/90 text-sm md:text-base mt-2">
          Choose your game mode and start learning!
        </p>
      </div>
    </header>

    <!-- ===== Main Content Section ===== -->
    <!-- 
      Two large cards for mode selection
      - Skill Builder (Practice Mode)
      - Timed Challenge (Competitive Mode)
      - Shows stats from localStorage
    -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Welcome Message -->
      <div class="text-center mb-8">
        <h2 class="text-white text-xl md:text-2xl font-bold mb-2">
          Ready to Practice Math? 📚
        </h2>
        <p class="text-white/80 text-sm md:text-base">
          Choose how you want to play today
        </p>
      </div>

      <!-- ===== Mode Selection Cards ===== -->
      <!-- 
        Two cards arranged vertically on mobile, grid on larger screens
        - Large touch targets for easy selection
        - Visual feedback on tap/hover
        - Shows user stats if available
      -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- ===== Skill Builder Card ===== -->
        <!-- 
          Practice mode: No time pressure, learn at your own pace
          - Shows total problems solved
          - Relaxed, educational feel (green theme)
        -->
        <div 
          class="
            bg-white 
            rounded-2xl 
            shadow-2xl 
            overflow-hidden
            transition-all
            duration-300
            hover:shadow-3xl
            hover:scale-105
            active:scale-98
            cursor-pointer
          "
          @click="navigateToSkillBuilder"
          role="button"
          tabindex="0"
          @keydown.enter="navigateToSkillBuilder"
          @keydown.space="navigateToSkillBuilder"
          aria-label="Open Skill Builder mode"
        >
          <!-- Card Header with Icon -->
          <div class="bg-gradient-to-br from-green-500 to-green-600 p-8 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <i class="fas fa-book-reader text-4xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">
              Skill Builder
            </h3>
            <p class="text-white/90 text-sm">
              Practice at your own pace
            </p>
          </div>

          <!-- Card Body with Details -->
          <div class="p-6 space-y-4">
            
            <!-- Description -->
            <div class="text-gray-700 text-sm md:text-base leading-relaxed">
              <p class="mb-3">
                <strong>Learn without pressure!</strong> Practice math problems at your own speed with instant feedback.
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-500 mt-1"></i>
                  <span>No time limits - take your time</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-500 mt-1"></i>
                  <span>Detailed explanations for each problem</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-500 mt-1"></i>
                  <span>Choose your difficulty level</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-500 mt-1"></i>
                  <span>Track your progress and mastery</span>
                </li>
              </ul>
            </div>

            <!-- Stats Display (if available from localStorage) -->
            <div 
              v-if="skillBuilderStats.totalSolved > 0"
              class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500"
            >
              <p class="text-sm font-medium text-gray-700 mb-2">
                Your Progress:
              </p>
              <div class="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p class="text-2xl font-bold text-green-600">
                    {{ skillBuilderStats.totalSolved }}
                  </p>
                  <p class="text-xs text-gray-600">Problems Solved</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">
                    {{ skillBuilderStats.accuracy }}%
                  </p>
                  <p class="text-xs text-gray-600">Accuracy</p>
                </div>
              </div>
            </div>

            <!-- Call to Action Button -->
            <button
              class="
                w-full
                min-h-[56px]
                bg-green-500
                text-white
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:bg-green-600
                hover:shadow-xl
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Start Skill Builder"
            >
              <span>Start Practicing</span>
              <i class="fas fa-arrow-right"></i>
            </button>

          </div>
        </div>

        <!-- ===== Timed Challenge Card ===== -->
        <!-- 
          Competitive mode: Race against the clock
          - Shows high scores
          - Exciting, competitive feel (orange/red theme)
        -->
        <div 
          class="
            bg-white 
            rounded-2xl 
            shadow-2xl 
            overflow-hidden
            transition-all
            duration-300
            hover:shadow-3xl
            hover:scale-105
            active:scale-98
            cursor-pointer
          "
          @click="navigateToTimedChallenge"
          role="button"
          tabindex="0"
          @keydown.enter="navigateToTimedChallenge"
          @keydown.space="navigateToTimedChallenge"
          aria-label="Open Timed Challenge mode"
        >
          <!-- Card Header with Icon -->
          <div class="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <i class="fas fa-bolt text-4xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">
              Timed Challenge
            </h3>
            <p class="text-white/90 text-sm">
              Race against the clock!
            </p>
          </div>

          <!-- Card Body with Details -->
          <div class="p-6 space-y-4">
            
            <!-- Description -->
            <div class="text-gray-700 text-sm md:text-base leading-relaxed">
              <p class="mb-3">
                <strong>Test your speed!</strong> Solve as many problems as you can before time runs out.
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-orange-500 mt-1"></i>
                  <span>Fast-paced gameplay with timer</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-orange-500 mt-1"></i>
                  <span>Earn points for correct answers</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-orange-500 mt-1"></i>
                  <span>Beat your high scores</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-orange-500 mt-1"></i>
                  <span>Streak bonuses for multiple correct answers</span>
                </li>
              </ul>
            </div>

            <!-- High Score Display (if available from localStorage) -->
            <div 
              v-if="timedChallengeStats.highScore > 0"
              class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500"
            >
              <p class="text-sm font-medium text-gray-700 mb-2">
                Your Best:
              </p>
              <div class="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p class="text-2xl font-bold text-orange-600">
                    {{ timedChallengeStats.highScore }}
                  </p>
                  <p class="text-xs text-gray-600">High Score</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-orange-600">
                    {{ timedChallengeStats.bestStreak }}
                  </p>
                  <p class="text-xs text-gray-600">Best Streak</p>
                </div>
              </div>
            </div>

            <!-- Call to Action Button -->
            <button
              class="
                w-full
                min-h-[56px]
                bg-orange-500
                text-white
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:bg-orange-600
                hover:shadow-xl
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Start Timed Challenge"
            >
              <span>Start Challenge</span>
              <i class="fas fa-arrow-right"></i>
            </button>

          </div>
        </div>

      </div>

      <!-- ===== Motivational Section ===== -->
      <!-- 
        Encourage students to practice regularly
        - Simple, positive messaging
        - Appropriate for ages 10-16
      -->
      <div class="mt-12 text-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <i class="fas fa-lightbulb text-4xl text-yellow-300 mb-3"></i>
          <h3 class="text-xl font-bold text-white mb-2">
            Practice Makes Perfect! 💪
          </h3>
          <p class="text-white/90 text-sm md:text-base">
            The more you practice, the better you get. Try both modes and watch your skills improve!
          </p>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * User statistics for Skill Builder mode
 * Stored in localStorage for offline access
 */
interface SkillBuilderStats {
  totalSolved: number      // Total problems completed
  accuracy: number         // Overall accuracy percentage (0-100)
  lastPlayed?: number      // Timestamp of last session
}

/**
 * User statistics for Timed Challenge mode
 * Stored in localStorage for offline access
 */
interface TimedChallengeStats {
  highScore: number        // Best score achieved
  bestStreak: number       // Longest correct answer streak
  lastPlayed?: number      // Timestamp of last session
}

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====
/**
 * Stats for Skill Builder mode
 * Loaded from localStorage on mount
 * Default values if no data exists
 */
const skillBuilderStats = ref<SkillBuilderStats>({
  totalSolved: 0,
  accuracy: 0
})

/**
 * Stats for Timed Challenge mode
 * Loaded from localStorage on mount
 * Default values if no data exists
 */
const timedChallengeStats = ref<TimedChallengeStats>({
  highScore: 0,
  bestStreak: 0
})

// ===== Helper Functions =====
/**
 * Load user statistics from localStorage
 * 
 * Why localStorage:
 * - Works offline (critical for Ghana)
 * - No server dependency
 * - Instant loading
 * - Can sync to server later if needed
 * 
 * Storage keys:
 * - mathstar_skill_builder_stats
 * - mathstar_timed_challenge_stats
 */
function loadStats(): void {
  try {
    // Load Skill Builder stats
    const skillBuilderData = localStorage.getItem('mathstar_skill_builder_stats')
    if (skillBuilderData) {
      const parsed = JSON.parse(skillBuilderData)
      skillBuilderStats.value = {
        totalSolved: parsed.totalSolved || 0,
        accuracy: parsed.accuracy || 0,
        lastPlayed: parsed.lastPlayed
      }
    }

    // Load Timed Challenge stats
    const timedChallengeData = localStorage.getItem('mathstar_timed_challenge_stats')
    if (timedChallengeData) {
      const parsed = JSON.parse(timedChallengeData)
      timedChallengeStats.value = {
        highScore: parsed.highScore || 0,
        bestStreak: parsed.bestStreak || 0,
        lastPlayed: parsed.lastPlayed
      }
    }
  } catch (error) {
    console.error('Error loading stats:', error)
    // Fail silently - stats are not critical for functionality
    // User can still play without seeing previous stats
  }
}

// ===== Navigation Handlers =====
/**
 * Navigate back to Options/Home screen
 */
function navigateBack(): void {
  router.push('/')
}

/**
 * Navigate to Skill Builder mode
 * Route: /play/skill-builder
 */
function navigateToSkillBuilder(): void {
  router.push('/play/skill-builder')
}

/**
 * Navigate to Timed Challenge mode
 * Route: /play/timed-challenge
 */
function navigateToTimedChallenge(): void {
  router.push('/play/timed-challenge')
}

// ===== Lifecycle Hooks =====
/**
 * When component mounts:
 * 1. Load user statistics from localStorage
 * 2. Display stats in the cards if available
 * 
 * This happens immediately - no network call needed
 */
onMounted(() => {
  loadStats()
})
</script>

<style scoped>
/**
 * Custom styles for Play Mode
 * 
 * Note: Most styling uses Tailwind utilities
 * Only add custom CSS for:
 * - Complex hover effects
 * - Card transitions
 * - Browser-specific fixes
 */

/* ===== Card Hover Effects ===== */
/* Smooth transform and shadow transitions for cards */
.cursor-pointer {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* ===== Touch Feedback ===== */
/* Ensure cards respond to touch on mobile devices */
@media (hover: none) and (pointer: coarse) {
  /* Mobile touch devices */
  .cursor-pointer:active {
    transform: scale(0.98);
  }
}

/* ===== Smooth Scrolling ===== */
html {
  scroll-behavior: smooth;
}

/* ===== Accessibility ===== */
/* Ensure keyboard navigation is visible */
.cursor-pointer:focus-visible {
  outline: 3px solid #3B81F6;
  outline-offset: 4px;
}
</style>