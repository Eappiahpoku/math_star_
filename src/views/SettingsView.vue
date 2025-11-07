<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\SettingsView.vue -->

<!--
  SettingsView.vue
  App Settings & Configuration
  
  Features:
  - Sound effects toggle (on/off)
  - Default difficulty preference
  - App information (version, about)
  - Offline-capable (saves to localStorage)
  - Mobile-first responsive design
  - Follows Stratonea guidelines for Ghana users
-->

<template>
  <!-- ===== Main Container ===== -->
  <div class="min-h-screen bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700">
    
    <!-- ===== Header Section ===== -->
    <!--
      Fixed header with navigation
      - Back button to Home
      - Settings title
      - Clean, mobile-optimized layout
    -->
    <header class="sticky top-0 z-20 bg-gray-600/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          
          <!-- Back Button -->
          <button
            @click="navigateBack"
            class="flex items-center gap-2 text-white font-semibold text-base transition-transform duration-200 hover:scale-110 active:scale-95"
            style="min-width: 48px; min-height: 48px"
            aria-label="Go back to home"
          >
            <i class="fas fa-arrow-left text-xl"></i>
            <span class="hidden sm:inline">Back</span>
          </button>

          <!-- Title -->
          <h1 class="text-xl md:text-2xl font-bold text-white">
            Settings ⚙️
          </h1>

          <!-- Placeholder for centering -->
          <div class="w-12"></div>
        </div>
      </div>
    </header>

    <!-- ===== Main Content Section ===== -->
    <main class="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      <!-- ===== SECTION 1: Sound Settings ===== -->
      <!--
        Sound effects toggle
        - Enable/disable sound effects
        - Saves preference to localStorage
        - Shows current state clearly
      -->
      <div class="bg-white rounded-xl shadow-2xl p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-volume-up text-gray-600"></i>
          Sound Effects
        </h2>
        
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-700 font-medium mb-1">
              Enable Sound Effects
            </p>
            <p class="text-sm text-gray-500">
              Play sounds for correct answers, wrong answers, and time-up alerts
            </p>
          </div>
          
          <!-- Toggle Switch -->
          <button
            @click="toggleSoundEffects"
            :class="[
              'relative inline-flex items-center rounded-full transition-colors duration-300',
              'focus:outline-none focus:ring-4 focus:ring-blue-300',
              soundEnabled ? 'bg-green-500' : 'bg-gray-300'
            ]"
            style="width: 56px; height: 32px; min-width: 56px; min-height: 32px"
            role="switch"
            :aria-checked="soundEnabled"
            aria-label="Toggle sound effects"
          >
            <!-- Toggle Circle -->
            <span
              :class="[
                'inline-block w-6 h-6 transform rounded-full bg-white shadow-lg transition-transform duration-300',
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              ]"
            ></span>
          </button>
        </div>
        
        <!-- Sound Status Indicator -->
        <div v-if="soundEnabled" class="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
          <i class="fas fa-check-circle"></i>
          <span>Sound effects are enabled</span>
        </div>
        <div v-else class="mt-4 flex items-center gap-2 text-gray-500 text-sm font-medium">
          <i class="fas fa-volume-mute"></i>
          <span>Sound effects are muted</span>
        </div>
      </div>
      
      <!-- ===== SECTION 2: Difficulty Preferences ===== -->
      <!--
        Default difficulty selection
        - Choose preferred difficulty level
        - Affects new game sessions
        - Saves to localStorage
      -->
      <div class="bg-white rounded-xl shadow-2xl p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-sliders-h text-gray-600"></i>
          Difficulty Preferences
        </h2>
        
        <div class="mb-4">
          <p class="text-gray-700 font-medium mb-1">
            Default Difficulty Level
          </p>
          <p class="text-sm text-gray-500 mb-4">
            Choose your preferred starting difficulty for new games
          </p>
        </div>
        
        <!-- Difficulty Options -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <!-- Easy -->
          <button
            @click="selectDifficulty('easy')"
            :class="[
              'p-6 rounded-lg font-bold text-lg transition-all border-2',
              'hover:scale-105 active:scale-95',
              selectedDifficulty === 'easy'
                ? 'bg-green-500 text-white border-green-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
            ]"
            style="min-height: 48px"
            aria-label="Select easy difficulty"
          >
            <div class="text-3xl mb-2">😊</div>
            <div>Easy</div>
            <div class="text-sm opacity-75 font-normal">Small numbers (1-10)</div>
          </button>
          
          <!-- Medium -->
          <button
            @click="selectDifficulty('medium')"
            :class="[
              'p-6 rounded-lg font-bold text-lg transition-all border-2',
              'hover:scale-105 active:scale-95',
              selectedDifficulty === 'medium'
                ? 'bg-yellow-500 text-white border-yellow-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
            ]"
            style="min-height: 48px"
            aria-label="Select medium difficulty"
          >
            <div class="text-3xl mb-2">🤔</div>
            <div>Medium</div>
            <div class="text-sm opacity-75 font-normal">Medium numbers (10-50)</div>
          </button>
          
          <!-- Hard -->
          <button
            @click="selectDifficulty('hard')"
            :class="[
              'p-6 rounded-lg font-bold text-lg transition-all border-2',
              'hover:scale-105 active:scale-95',
              selectedDifficulty === 'hard'
                ? 'bg-red-500 text-white border-red-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
            ]"
            style="min-height: 48px"
            aria-label="Select hard difficulty"
          >
            <div class="text-3xl mb-2">😤</div>
            <div>Hard</div>
            <div class="text-sm opacity-75 font-normal">Large numbers (50-100)</div>
          </button>
          
        </div>
        
        <!-- Difficulty Status -->
        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <i class="fas fa-info-circle mr-2"></i>
            <strong>Note:</strong> This sets your preferred difficulty. You can still change it during gameplay.
          </p>
        </div>
      </div>
      
      <!-- ===== SECTION 3: Timer Preference ===== -->
      <!--
        Default timer style (analog or digital)
        - Choose preferred timer display
        - Applies to Timed Challenge mode
        - Saves to localStorage
      -->
      <div class="bg-white rounded-xl shadow-2xl p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-clock text-gray-600"></i>
          Timer Preferences
        </h2>
        
        <div class="mb-4">
          <p class="text-gray-700 font-medium mb-1">
            Default Timer Style
          </p>
          <p class="text-sm text-gray-500 mb-4">
            Choose how you want the timer displayed in Timed Challenge mode
          </p>
        </div>
        
        <!-- Timer Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <!-- Digital Timer -->
          <button
            @click="selectTimerStyle('digital')"
            :class="[
              'p-6 rounded-lg font-bold text-lg transition-all border-2',
              'hover:scale-105 active:scale-95',
              selectedTimerStyle === 'digital'
                ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
            ]"
            style="min-height: 48px"
            aria-label="Select digital timer"
          >
            <div class="text-4xl mb-2">
              <i class="fas fa-digital-tachograph"></i>
            </div>
            <div>Digital Timer</div>
            <div class="text-sm opacity-75 font-normal">Large countdown display</div>
          </button>
          
          <!-- Analog Clock -->
          <button
            @click="selectTimerStyle('analog')"
            :class="[
              'p-6 rounded-lg font-bold text-lg transition-all border-2',
              'hover:scale-105 active:scale-95',
              selectedTimerStyle === 'analog'
                ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
            ]"
            style="min-height: 48px"
            aria-label="Select analog clock"
          >
            <div class="text-4xl mb-2">
              <i class="fas fa-clock"></i>
            </div>
            <div>Analog Clock</div>
            <div class="text-sm opacity-75 font-normal">Classic clock face</div>
          </button>
          
        </div>
      </div>
      
      <!-- ===== SECTION 4: App Information ===== -->
      <!--
        App details and credits
        - Version number
        - About MathStar
        - Credits
      -->
      <div class="bg-white rounded-xl shadow-2xl p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-info-circle text-gray-600"></i>
          About MathStar
        </h2>
        
        <!-- App Logo/Icon -->
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-3">
            <i class="fas fa-star text-4xl text-white"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">MathStar</h3>
          <p class="text-gray-600">Learn Math the Fun Way!</p>
        </div>
        
        <!-- Version Info -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-600 font-medium">Version</span>
            <span class="text-gray-800 font-bold">2.0.0</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-600 font-medium">Last Updated</span>
            <span class="text-gray-800 font-bold">October 2025</span>
          </div>
        </div>
        
        <!-- Description -->
        <div class="prose prose-sm max-w-none mb-6">
          <p class="text-gray-700 leading-relaxed">
            MathStar is a fun and engaging way to practice math skills. Designed specifically for 
            Ghanaian students, it works offline and is optimized for mobile devices with limited 
            internet connectivity.
          </p>
        </div>
        
        <!-- Features List -->
        <div class="mb-6">
          <h4 class="font-bold text-gray-800 mb-3">Key Features:</h4>
          <ul class="space-y-2">
            <li class="flex items-start gap-2 text-gray-700">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>Works completely offline</span>
            </li>
            <li class="flex items-start gap-2 text-gray-700">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>Multiple game modes (Learn & Play)</span>
            </li>
            <li class="flex items-start gap-2 text-gray-700">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>Track your progress and high scores</span>
            </li>
            <li class="flex items-start gap-2 text-gray-700">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>Mobile-first design for touch devices</span>
            </li>
          </ul>
        </div>
        
        <!-- Credits -->
        <div class="border-t border-gray-200 pt-4">
          <p class="text-sm text-gray-600 text-center">
            Built with ❤️ by <strong>Edward Kwame Appiah-Poku</strong> for Ghana
          </p>
          <p class="text-xs text-gray-500 text-center mt-2">
            © 2025 StudyDock. All rights reserved.
          </p>
        </div>
      </div>
      
      <!-- ===== Success Toast (shown when settings are saved) ===== -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showSuccessToast"
          class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <i class="fas fa-check-circle text-2xl"></i>
            <div>
              <p class="font-bold">Settings Saved!</p>
              <p class="text-sm opacity-90">Your preferences have been updated</p>
            </div>
          </div>
        </div>
      </transition>
      
    </main>
    
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * Difficulty level options
 */
type Difficulty = 'easy' | 'medium' | 'hard'

/**
 * Timer style options
 */
type TimerStyle = 'digital' | 'analog'

/**
 * App settings interface
 */
interface AppSettings {
  soundEnabled: boolean
  defaultDifficulty: Difficulty
  defaultTimerStyle: TimerStyle
}

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====

/**
 * Sound effects enabled state
 * Controls whether sound effects play during gameplay
 */
const soundEnabled = ref(true)

/**
 * Selected difficulty level
 * User's preferred default difficulty
 */
const selectedDifficulty = ref<Difficulty>('medium')

/**
 * Selected timer style
 * User's preferred timer display (analog or digital)
 */
const selectedTimerStyle = ref<TimerStyle>('digital')

/**
 * Success toast visibility
 * Shows when settings are successfully saved
 */
const showSuccessToast = ref(false)

// ===== Constants =====

/**
 * localStorage key for app settings
 */
const SETTINGS_KEY = 'mathstar_settings'

// ===== Navigation Handlers =====

/**
 * Navigate back to Home (Options menu)
 * Returns to / route
 */
function navigateBack(): void {
  router.push('/')
}

// ===== Settings Management Functions =====

/**
 * Load settings from localStorage
 * Called on component mount
 */
function loadSettings(): void {
  try {
    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    
    if (savedSettings) {
      const settings: AppSettings = JSON.parse(savedSettings)
      
      // Apply saved settings
      soundEnabled.value = settings.soundEnabled
      selectedDifficulty.value = settings.defaultDifficulty
      selectedTimerStyle.value = settings.defaultTimerStyle
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
    // Use default settings if loading fails
  }
}

/**
 * Save settings to localStorage
 * Called whenever a setting changes
 */
function saveSettings(): void {
  try {
    const settings: AppSettings = {
      soundEnabled: soundEnabled.value,
      defaultDifficulty: selectedDifficulty.value,
      defaultTimerStyle: selectedTimerStyle.value
    }
    
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    
    // Show success toast
    showSuccessToast.value = true
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

// ===== Setting Toggle Functions =====

/**
 * Toggle sound effects on/off
 * Saves setting immediately
 */
function toggleSoundEffects(): void {
  soundEnabled.value = !soundEnabled.value
  saveSettings()
}

/**
 * Select difficulty level
 * Saves setting immediately
 * 
 * @param difficulty - The difficulty level to set ('easy', 'medium', or 'hard')
 */
function selectDifficulty(difficulty: Difficulty): void {
  selectedDifficulty.value = difficulty
  saveSettings()
}

/**
 * Select timer style
 * Saves setting immediately
 * 
 * @param style - The timer style to set ('digital' or 'analog')
 */
function selectTimerStyle(style: TimerStyle): void {
  selectedTimerStyle.value = style
  saveSettings()
}

// ===== Lifecycle Hooks =====

/**
 * Load saved settings when component mounts
 * Ensures user sees their previously saved preferences
 */
onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
/**
 * Custom styles for Settings View
 * Most styling uses Tailwind utilities
 * Only custom animations defined here
 */

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease;
}

/* Ensure toggle switch is always visible */
button[role="switch"] {
  flex-shrink: 0;
}
</style>