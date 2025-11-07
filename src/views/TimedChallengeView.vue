<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\TimedChallengeView.vue -->

<!--
  TimedChallengeView.vue
  Timed Challenge Mode - Race against the clock
  
  Game Flow:
  1. Time limit selection → 2. Countdown (3-2-1-GO!) → 3. Problem solving → 4. Results
  
  Features:
  - Choose timer style (analog or digital)
  - Random math problems with streak bonuses
  - High score tracking
  - Mobile-first responsive design
  - Offline-capable (all client-side)
-->

<template>
  <!-- ===== Main Container ===== -->
  <div class="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-red-600">
    
    <!-- ===== Header Section ===== -->
    <header class="bg-white/10 backdrop-blur-sm shadow-lg">
      <div class="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Back Button -->
        <button
          @click="navigateBack"
          class="flex items-center gap-2 text-white hover:text-orange-100 transition-colors"
          style="min-height: 48px; min-width: 48px"
          aria-label="Back to Play Menu"
        >
          <i class="fas fa-arrow-left text-xl"></i>
          <span class="font-medium">Back</span>
        </button>
        
        <!-- Title -->
        <h1 class="text-2xl font-bold text-white">
          ⚡ Timed Challenge
        </h1>
        
        <!-- Spacer (for centering title) -->
        <div class="w-20"></div>
      </div>
    </header>
    
    <!-- ===== Content Section ===== -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      
      <!-- ===== STAGE 1: Time Selection ===== -->
      <div v-if="gameStage === 'time-selection'" class="space-y-6">
        
        <!-- Timer Style Toggle -->
        <div class="flex justify-center">
          <timer-toggle v-model="timerType" />
        </div>
        
        <!-- Time Limit Selection Card -->
        <div class="bg-white rounded-xl shadow-2xl p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
            ⏱️ Choose Your Time Limit
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <!-- 1 Minute -->
            <button
              @click="selectTimeLimit(60)"
              :class="[
                'py-6 rounded-lg font-bold text-lg transition-all',
                'border-2 border-transparent hover:scale-105 active:scale-95',
                selectedTimeLimit === 60
                  ? 'bg-orange-500 text-white border-orange-600 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              style="min-height: 48px"
            >
              <div class="text-3xl mb-2">⚡</div>
              <div>1 Minute</div>
              <div class="text-sm opacity-75">Quick Sprint</div>
            </button>
            
            <!-- 3 Minutes -->
            <button
              @click="selectTimeLimit(180)"
              :class="[
                'py-6 rounded-lg font-bold text-lg transition-all',
                'border-2 border-transparent hover:scale-105 active:scale-95',
                selectedTimeLimit === 180
                  ? 'bg-orange-500 text-white border-orange-600 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              style="min-height: 48px"
            >
              <div class="text-3xl mb-2">🔥</div>
              <div>3 Minutes</div>
              <div class="text-sm opacity-75">Standard</div>
            </button>
            
            <!-- 5 Minutes -->
            <button
              @click="selectTimeLimit(300)"
              :class="[
                'py-6 rounded-lg font-bold text-lg transition-all',
                'border-2 border-transparent hover:scale-105 active:scale-95',
                selectedTimeLimit === 300
                  ? 'bg-orange-500 text-white border-orange-600 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              style="min-height: 48px"
            >
              <div class="text-3xl mb-2">🏆</div>
              <div>5 Minutes</div>
              <div class="text-sm opacity-75">Marathon</div>
            </button>
          </div>
          
          <!-- Start Button -->
          <button
            @click="startCountdown"
            :disabled="!selectedTimeLimit"
            class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
            style="min-height: 48px"
          >
            Start Challenge! 🚀
          </button>
        </div>
        
        <!-- How to Play -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-3">
            📝 How to Play
          </h3>
          <ul class="space-y-2 text-white text-sm">
            <li class="flex items-start gap-2">
              <span>🔢</span>
              <span>Solve as many problems as you can before time runs out</span>
            </li>
            <li class="flex items-start gap-2">
              <span>🔥</span>
              <span>Build streaks for bonus points!</span>
            </li>
            <li class="flex items-start gap-2">
              <span>🏆</span>
              <span>Beat your high score and challenge friends!</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- ===== STAGE 2: Countdown (3-2-1-GO!) ===== -->
      <div v-else-if="gameStage === 'countdown'" class="flex items-center justify-center" style="min-height: 60vh">
        <div class="text-center">
          <div class="text-9xl font-bold text-white mb-4 animate-bounce">
            {{ countdownNumber === 0 ? 'GO!' : countdownNumber }}
          </div>
          <div class="text-2xl text-white/80">
            Get Ready!
          </div>
        </div>
      </div>
      
      <!-- ===== STAGE 3: Active Game ===== -->
      <div v-else-if="gameStage === 'playing'" class="space-y-6">
        
        <!-- Timer Display -->
        <div class="flex justify-center">
          <!-- Analog Clock -->
          <analog-clock
            v-if="timerType === 'analog'"
            :time-remaining="timeRemaining"
            :time-limit="selectedTimeLimit"
          />
          
          <!-- Digital Timer -->
          <digital-timer
            v-else
            :time-remaining="timeRemaining"
          />
        </div>
        
        <!-- Score & Streak Display -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="flex items-center justify-between text-white">
            <div class="text-center">
              <div class="text-sm opacity-75">Score</div>
              <div class="text-3xl font-bold">{{ currentScore }}</div>
            </div>
            
            <div class="text-center">
              <div class="text-sm opacity-75">Problems</div>
              <div class="text-3xl font-bold">{{ problemsSolved }}</div>
            </div>
            
            <div class="text-center">
              <div class="text-sm opacity-75">Streak</div>
              <div class="text-3xl font-bold">
                {{ currentStreak > 0 ? '🔥' : '' }} {{ currentStreak }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Streak Message -->
        <div v-if="streakMessage" class="text-center">
          <div class="inline-block bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-bold text-lg animate-bounce">
            {{ streakMessage }}
          </div>
        </div>
        
        <!-- Problem Display Card -->
        <div class="bg-white rounded-xl shadow-2xl p-8">
          <!-- Problem Text -->
          <div class="text-center mb-8">
            <div class="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">
              {{ currentProblem?.displayText }}
            </div>
            <div class="text-sm text-gray-500">
              {{ currentProblem?.difficulty.toUpperCase() }} • {{ currentProblem?.points }} points
            </div>
          </div>
          
          <!-- Answer Input -->
          <div class="mb-6">
            <input
              ref="answerInput"
              v-model.number="userAnswer"
              type="number"
              inputmode="numeric"
              placeholder="Your answer"
              @keyup.enter="submitAnswer"
              :class="[
                'w-full px-6 py-6 text-4xl text-center font-bold rounded-lg',
                'border-3 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200',
                'transition-all',
                answerFeedback === 'correct' ? 'border-green-500 bg-green-50' :
                answerFeedback === 'incorrect' ? 'border-red-500 bg-red-50 animate-shake' : ''
              ]"
              style="min-height: 64px"
              aria-label="Enter your answer"
            />
          </div>
          
          <!-- Submit Button -->
          <button
            @click="submitAnswer"
            :disabled="userAnswer === null"
            class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-5 rounded-lg text-2xl transition-all shadow-lg hover:shadow-xl active:scale-95"
            style="min-height: 48px"
          >
            Submit Answer ✓
          </button>
          
          <!-- Feedback Message -->
          <div v-if="feedbackMessage" class="mt-4 text-center">
            <div :class="[
              'inline-block px-6 py-3 rounded-lg font-bold text-lg',
              answerFeedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]">
              {{ feedbackMessage }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- ===== STAGE 4: Results Screen ===== -->
      <div v-else-if="gameStage === 'results'" class="space-y-6">
        
        <!-- Results Card -->
        <div class="bg-white rounded-xl shadow-2xl p-8">
          <!-- Title -->
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">
              {{ isNewHighScore ? '🏆' : '✅' }}
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ isNewHighScore ? 'NEW HIGH SCORE!' : 'Challenge Complete!' }}
            </h2>
            <p class="text-gray-600">
              Time's Up!
            </p>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-6 mb-8">
            <!-- Final Score -->
            <div class="text-center p-6 bg-orange-50 rounded-lg">
              <div class="text-4xl font-bold text-orange-600 mb-2">
                {{ currentScore }}
              </div>
              <div class="text-sm text-gray-600 font-medium">
                Final Score
              </div>
            </div>
            
            <!-- Problems Solved -->
            <div class="text-center p-6 bg-blue-50 rounded-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">
                {{ problemsSolved }}
              </div>
              <div class="text-sm text-gray-600 font-medium">
                Problems Solved
              </div>
            </div>
            
            <!-- Correct Answers -->
            <div class="text-center p-6 bg-green-50 rounded-lg">
              <div class="text-4xl font-bold text-green-600 mb-2">
                {{ correctAnswers }}
              </div>
              <div class="text-sm text-gray-600 font-medium">
                Correct Answers
              </div>
            </div>
            
            <!-- Accuracy -->
            <div class="text-center p-6 bg-purple-50 rounded-lg">
              <div class="text-4xl font-bold text-purple-600 mb-2">
                {{ accuracy }}%
              </div>
              <div class="text-sm text-gray-600 font-medium">
                Accuracy
              </div>
            </div>
          </div>
          
          <!-- Best Streak -->
          <div class="text-center p-6 bg-yellow-50 rounded-lg mb-8">
            <div class="text-4xl font-bold text-yellow-600 mb-2">
              🔥 {{ longestStreak }}
            </div>
            <div class="text-sm text-gray-600 font-medium">
              Longest Streak
            </div>
          </div>
          
          <!-- High Score Comparison -->
          <div v-if="highScore > 0" class="text-center p-4 bg-gray-50 rounded-lg mb-8">
            <div class="text-sm text-gray-600 mb-1">Previous High Score</div>
            <div class="text-2xl font-bold text-gray-800">
              {{ highScore }}
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="playAgain"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
              style="min-height: 48px"
            >
              Play Again 🔄
            </button>
            
            <button
              @click="changeSettings"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
              style="min-height: 48px"
            >
              Change Time Limit ⚙️
            </button>
            
            <button
              @click="navigateBack"
              class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
              style="min-height: 48px"
            >
              Back to Menu 🏠
            </button>
          </div>
        </div>
        
      </div>
      
    </main>
    
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// ===== [FIXED] Updated import paths to use correct folder name =====
import AnalogClock from '@/components/TimedChallenges/AnalogClock.vue'
import DigitalTimer from '@/components/TimedChallenges/DigitalTimer.vue'
import TimerToggle from '@/components/TimedChallenges/TimerToggle.vue'
import {
  generateProblem,
  checkAnswer,
  calculateStreakBonus,
  getStreakMessage,
  type Problem
} from '@/utils/problemGenerator'

// ===== Types & Interfaces =====
/**
 * Timer type selection
 */
type TimerType = 'digital' | 'analog'

/**
 * Game stage progression
 */
type GameStage = 'time-selection' | 'countdown' | 'playing' | 'results'

/**
 * Answer feedback state
 */
type AnswerFeedback = null | 'correct' | 'incorrect'

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====

/**
 * Current game stage
 */
const gameStage = ref<GameStage>('time-selection')

/**
 * Timer type preference (analog or digital)
 */
const timerType = ref<TimerType>('digital')

/**
 * Selected time limit in seconds
 */
const selectedTimeLimit = ref<number>(0)

/**
 * Time remaining in seconds
 */
const timeRemaining = ref<number>(0)

/**
 * Timer running state
 */
const isRunning = ref(false)

/**
 * Countdown number (3, 2, 1, 0=GO)
 */
const countdownNumber = ref(3)

/**
 * Current problem being displayed
 */
const currentProblem = ref<Problem | null>(null)

/**
 * User's answer input
 */
const userAnswer = ref<number | null>(null)

/**
 * Answer feedback (correct/incorrect/null)
 */
const answerFeedback = ref<AnswerFeedback>(null)

/**
 * Feedback message to display
 */
const feedbackMessage = ref('')

/**
 * Current score
 */
const currentScore = ref(0)

/**
 * Total problems attempted
 */
const problemsSolved = ref(0)

/**
 * Correct answers count
 */
const correctAnswers = ref(0)

/**
 * Current streak count
 */
const currentStreak = ref(0)

/**
 * Longest streak in this session
 */
const longestStreak = ref(0)

/**
 * High score for current time limit
 */
const highScore = ref(0)

/**
 * Whether current score is a new high score
 */
const isNewHighScore = ref(false)

/**
 * Reference to answer input element
 */
const answerInput = ref<HTMLInputElement | null>(null)

/**
 * Interval ID for timer countdown
 */
let timerInterval: number | null = null

/**
 * Timeout ID for countdown
 */
let countdownTimeout: number | null = null

// ===== Computed Properties =====

/**
 * Calculate accuracy percentage
 */
const accuracy = computed(() => {
  if (problemsSolved.value === 0) return 0
  return Math.round((correctAnswers.value / problemsSolved.value) * 100)
})

/**
 * Get current streak message
 */
const streakMessage = computed(() => {
  return getStreakMessage(currentStreak.value)
})

// ===== Navigation Handler =====

/**
 * Navigate back to Play Mode menu
 * Stops timer if running
 */
function navigateBack(): void {
  if (isRunning.value) {
    stopTimer()
  }
  router.push('/play')
}

// ===== Time Selection Functions =====

/**
 * Select time limit and prepare for game
 */
function selectTimeLimit(seconds: number): void {
  selectedTimeLimit.value = seconds
  timeRemaining.value = seconds
  
  // Load high score for this time limit
  loadHighScore(seconds)
}

/**
 * Load high score from localStorage
 */
function loadHighScore(timeLimit: number): void {
  try {
    const key = `mathstar_highscore_${timeLimit}`
    const saved = localStorage.getItem(key)
    highScore.value = saved ? parseInt(saved, 10) : 0
  } catch (error) {
    console.error('Failed to load high score:', error)
    highScore.value = 0
  }
}

/**
 * Save high score to localStorage
 */
function saveHighScore(): void {
  try {
    const key = `mathstar_highscore_${selectedTimeLimit.value}`
    if (currentScore.value > highScore.value) {
      localStorage.setItem(key, currentScore.value.toString())
      isNewHighScore.value = true
    }
  } catch (error) {
    console.error('Failed to save high score:', error)
  }
}

// ===== Countdown Functions =====

/**
 * Start countdown sequence (3-2-1-GO!)
 */
function startCountdown(): void {
  gameStage.value = 'countdown'
  countdownNumber.value = 3
  
  const countdown = () => {
    if (countdownNumber.value > 0) {
      countdownNumber.value--
      countdownTimeout = window.setTimeout(countdown, 1000)
    } else {
      // Countdown finished, start game
      startGame()
    }
  }
  
  countdownTimeout = window.setTimeout(countdown, 1000)
}

// ===== Game Control Functions =====

/**
 * Start the game
 * Initialize all game state and start timer
 */
function startGame(): void {
  // Reset all game state
  currentScore.value = 0
  problemsSolved.value = 0
  correctAnswers.value = 0
  currentStreak.value = 0
  longestStreak.value = 0
  isNewHighScore.value = false
  
  // Set game stage
  gameStage.value = 'playing'
  
  // Generate first problem
  generateNewProblem()
  
  // Start timer
  startTimer()
  
  // Focus answer input
  nextTick(() => {
    answerInput.value?.focus()
  })
}

/**
 * Start the countdown timer
 */
function startTimer(): void {
  if (isRunning.value) return
  
  isRunning.value = true
  
  // Update timer every 100ms for smooth countdown
  timerInterval = window.setInterval(() => {
    timeRemaining.value -= 0.1
    
    // Stop timer when time runs out
    if (timeRemaining.value <= 0) {
      timeRemaining.value = 0
      stopTimer()
      endGame()
    }
  }, 100) // 10 times per second
}

/**
 * Stop the countdown timer
 */
function stopTimer(): void {
  if (!isRunning.value) return
  
  isRunning.value = false
  
  if (timerInterval !== null) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

/**
 * End the game and show results
 */
function endGame(): void {
  stopTimer()
  saveHighScore()
  gameStage.value = 'results'
  
  // Vibrate phone (mobile only)
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200])
  }
}

// ===== Problem Generation Functions =====

/**
 * Generate a new problem
 */
function generateNewProblem(): void {
  currentProblem.value = generateProblem()
  userAnswer.value = null
  answerFeedback.value = null
  feedbackMessage.value = ''
  
  // Focus input after problem changes
  nextTick(() => {
    answerInput.value?.focus()
  })
}

// ===== Answer Submission Functions =====

/**
 * Submit user's answer and check if correct
 */
function submitAnswer(): void {
  if (userAnswer.value === null || currentProblem.value === null) return
  
  const isCorrect = checkAnswer(currentProblem.value, userAnswer.value)
  problemsSolved.value++
  
  if (isCorrect) {
    handleCorrectAnswer()
  } else {
    handleIncorrectAnswer()
  }
  
  // Show feedback briefly, then generate new problem
  setTimeout(() => {
    generateNewProblem()
  }, 800) // 800ms feedback delay
}

/**
 * Handle correct answer
 * Update score, streak, and show positive feedback
 */
function handleCorrectAnswer(): void {
  correctAnswers.value++
  currentStreak.value++
  
  // Update longest streak
  if (currentStreak.value > longestStreak.value) {
    longestStreak.value = currentStreak.value
  }
  
  // Calculate points: base points + streak bonus
  const basePoints = currentProblem.value?.points || 0
  const streakBonus = calculateStreakBonus(currentStreak.value)
  const totalPoints = basePoints + streakBonus
  
  currentScore.value += totalPoints
  
  // Show feedback
  answerFeedback.value = 'correct'
  feedbackMessage.value = streakBonus > 0
    ? `✓ Correct! +${totalPoints} points (+${streakBonus} streak bonus)`
    : `✓ Correct! +${totalPoints} points`
}

/**
 * Handle incorrect answer
 * Reset streak and show correct answer
 */
function handleIncorrectAnswer(): void {
  currentStreak.value = 0
  
  // Show feedback with correct answer
  answerFeedback.value = 'incorrect'
  feedbackMessage.value = `✗ Incorrect. The answer was ${currentProblem.value?.correctAnswer}`
}

// ===== Results Screen Functions =====

/**
 * Play again with same time limit
 */
function playAgain(): void {
  startCountdown()
}

/**
 * Change settings (go back to time selection)
 */
function changeSettings(): void {
  gameStage.value = 'time-selection'
  selectedTimeLimit.value = 0
}

// ===== Lifecycle Hooks =====

/**
 * Load timer preference from localStorage on mount
 */
onMounted(() => {
  try {
    const savedPreference = localStorage.getItem('mathstar_timer_preference')
    if (savedPreference === 'analog' || savedPreference === 'digital') {
      timerType.value = savedPreference
    }
  } catch (error) {
    console.error('Failed to load timer preference:', error)
  }
})

/**
 * Clean up timers on unmount
 */
onUnmounted(() => {
  if (timerInterval !== null) {
    clearInterval(timerInterval)
  }
  if (countdownTimeout !== null) {
    clearTimeout(countdownTimeout)
  }
})
</script>

<style scoped>
/**
 * Custom styles for Timed Challenge View
 * Most styling uses Tailwind utilities
 */

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease;
}

/* Input number field: remove spinner buttons for cleaner UI */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Shake animation for incorrect answers */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>