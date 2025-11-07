<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\SkillBuilderView.vue -->
<template>
  <!-- ===== Main Container ===== -->
  <!-- 
    Skill Builder Mode - Practice without time pressure
    - Mobile-first responsive design
    - Offline-capable problem generation (all client-side)
    - Instant feedback on answers
    - Multiple stages: Topic → Difficulty → Problems → Results
  -->
  <div class="min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-green-700">
    
    <!-- ===== Header Section ===== -->
    <!-- 
      Fixed header with navigation and progress
      - Back button to Play Mode menu or previous stage
      - Title changes based on current stage
      - Progress indicator during problem solving
    -->
    <header class="sticky top-0 z-20 bg-green-600/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-4xl mx-auto px-4 py-4">
        
        <!-- Top Row: Navigation and Title -->
        <div class="flex items-center justify-between mb-3">
          
          <!-- Back Button -->
          <button
            @click="handleBack"
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
            :aria-label="backButtonLabel"
          >
            <i class="fas fa-arrow-left text-xl"></i>
            <span class="hidden sm:inline">Back</span>
          </button>

          <!-- Dynamic Title based on stage -->
          <h1 class="text-xl md:text-2xl font-bold text-white text-center flex-1 px-4">
            {{ stageTitle }}
          </h1>

          <!-- Score Display (only during problem solving) -->
          <div 
            v-if="currentStage === 'solving'"
            class="text-white font-bold text-base md:text-lg min-w-[60px] text-right"
          >
            {{ currentScore }} pts
          </div>
          <div v-else class="w-12"></div>

        </div>

        <!-- Progress Bar (only during problem solving) -->
        <div 
          v-if="currentStage === 'solving'"
          class="w-full h-2 bg-white/20 rounded-full overflow-hidden"
        >
          <div 
            class="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
            :style="{ width: problemProgress + '%' }"
            role="progressbar"
            :aria-valuenow="problemProgress"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Progress: ${currentProblemIndex + 1} of ${totalProblems} problems`"
          ></div>
        </div>

      </div>
    </header>

    <!-- ===== Main Content Section ===== -->
    <!-- 
      Content changes based on current stage:
      1. topic-selection - Grid of 8 math topics
      2. difficulty-selection - Choose Easy, Medium, or Hard
      3. solving - Display problem and answer input
      4. feedback - Show correct/incorrect with explanation
      5. results - Final summary with stats
    -->
    <main class="max-w-4xl mx-auto px-4 py-8">

      <!-- ===== STAGE 1: Topic Selection ===== -->
      <!-- 
        Display all 8 math topics as cards
        - Large touch targets for mobile
        - Visual icons for each topic
        - Description of what will be practiced
      -->
      <div v-if="currentStage === 'topic-selection'" class="space-y-6">
        
        <!-- Instructions -->
        <div class="text-center mb-8">
          <h2 class="text-white text-2xl md:text-3xl font-bold mb-2">
            Choose a Topic to Practice
          </h2>
          <p class="text-white/90 text-base md:text-lg">
            Select the math skill you want to improve
          </p>
        </div>

        <!-- Topic Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <!-- Topic Card Template (repeated for each topic) -->
          <button
            v-for="topic in topics"
            :key="topic.id"
            @click="selectTopic(topic.id)"
            class="
              bg-white
              rounded-xl
              shadow-lg
              p-6
              text-left
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-xl
              active:scale-98
              min-h-[120px]
              flex
              flex-col
              gap-3
            "
            :aria-label="`Practice ${topic.title}`"
          >
            <!-- Icon and Title -->
            <div class="flex items-center gap-3">
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                :class="topic.bgColor"
              >
                {{ topic.icon }}
              </div>
              <h3 class="text-lg font-bold text-gray-800">
                {{ topic.title }}
              </h3>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600">
              {{ topic.description }}
            </p>

            <!-- Stats (if available from localStorage) -->
            <div 
              v-if="topic.stats && topic.stats.attempted > 0"
              class="text-xs text-gray-500 mt-1"
            >
              Last accuracy: {{ topic.stats.accuracy }}% ({{ topic.stats.attempted }} problems)
            </div>

          </button>

        </div>

      </div>

      <!-- ===== STAGE 2: Difficulty Selection ===== -->
      <!-- 
        Choose difficulty level: Easy, Medium, Hard
        - Visual distinction between levels
        - Description of what to expect
        - Number of problems to solve
      -->
      <div v-else-if="currentStage === 'difficulty-selection'" class="space-y-6">
        
        <!-- Instructions -->
        <div class="text-center mb-8">
          <h2 class="text-white text-2xl md:text-3xl font-bold mb-2">
            Choose Your Difficulty
          </h2>
          <p class="text-white/90 text-base md:text-lg">
            {{ selectedTopicName }} - Pick a challenge level
          </p>
        </div>

        <!-- Difficulty Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Easy Level -->
          <button
            @click="selectDifficulty('easy')"
            class="
              bg-white
              rounded-xl
              shadow-lg
              p-6
              text-center
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-xl
              active:scale-98
              min-h-[200px]
              flex
              flex-col
              items-center
              justify-center
              gap-4
            "
            aria-label="Select Easy difficulty"
          >
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-smile text-3xl text-green-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Easy</h3>
            <p class="text-sm text-gray-600">
              Simple problems with small numbers. Perfect for beginners!
            </p>
            <span class="text-xs text-gray-500 font-medium">10 problems</span>
          </button>

          <!-- Medium Level -->
          <button
            @click="selectDifficulty('medium')"
            class="
              bg-white
              rounded-xl
              shadow-lg
              p-6
              text-center
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-xl
              active:scale-98
              min-h-[200px]
              flex
              flex-col
              items-center
              justify-center
              gap-4
            "
            aria-label="Select Medium difficulty"
          >
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <i class="fas fa-meh text-3xl text-yellow-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Medium</h3>
            <p class="text-sm text-gray-600">
              Moderate problems with two-digit numbers. Good challenge!
            </p>
            <span class="text-xs text-gray-500 font-medium">15 problems</span>
          </button>

          <!-- Hard Level -->
          <button
            @click="selectDifficulty('hard')"
            class="
              bg-white
              rounded-xl
              shadow-lg
              p-6
              text-center
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-xl
              active:scale-98
              min-h-[200px]
              flex
              flex-col
              items-center
              justify-center
              gap-4
            "
            aria-label="Select Hard difficulty"
          >
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <i class="fas fa-fire text-3xl text-red-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Hard</h3>
            <p class="text-sm text-gray-600">
              Challenging problems with larger numbers. For experts!
            </p>
            <span class="text-xs text-gray-500 font-medium">20 problems</span>
          </button>

        </div>

      </div>

      <!-- ===== STAGE 3: Problem Solving ===== -->
      <!-- 
        Display one problem at a time
        - Large, clear problem text
        - Number input for answer
        - Submit and Skip buttons
        - Visual feedback on submission
      -->
      <div v-else-if="currentStage === 'solving'" class="space-y-6">
        
        <!-- Problem Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          
          <!-- Problem Number -->
          <div class="text-center mb-6">
            <span class="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm">
              Question {{ currentProblemIndex + 1 }} of {{ totalProblems }}
            </span>
          </div>

          <!-- Problem Text -->
          <div class="text-center mb-8">
            <p class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {{ currentProblem?.question }}
            </p>
            <p class="text-lg text-gray-600">
              What is the answer?
            </p>
          </div>

          <!-- Answer Input -->
          <div class="max-w-md mx-auto mb-6">
            <input
              v-model="userAnswer"
              type="number"
              inputmode="numeric"
              placeholder="Type your answer"
              class="
                w-full
                text-center
                text-3xl
                md:text-4xl
                font-bold
                px-6
                py-4
                border-2
                border-gray-300
                rounded-xl
                focus:border-green-500
                focus:ring-2
                focus:ring-green-200
                transition-all
                duration-200
              "
              :aria-label="`Answer for problem ${currentProblemIndex + 1}`"
              @keydown.enter="checkAnswer"
              autofocus
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            
            <!-- Submit Button -->
            <button
              @click="checkAnswer"
              :disabled="userAnswer === ''"
              class="
                flex-1
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
                hover:scale-105
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Submit answer"
            >
              <i class="fas fa-check-circle"></i>
              <span>Check Answer</span>
            </button>

            <!-- Skip Button -->
            <button
              @click="skipProblem"
              class="
                flex-1
                min-h-[56px]
                bg-gray-200
                text-gray-700
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:bg-gray-300
                hover:scale-105
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Skip this problem"
            >
              <i class="fas fa-forward"></i>
              <span>Skip</span>
            </button>

          </div>

        </div>

               <!-- This part is correct in the template -->
        <div 
          v-if="currentProblem?.hint"
          class="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4 max-w-md mx-auto"
        >
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-blue-500 text-xl mt-1"></i>
            <div>
              <p class="font-semibold text-blue-900 mb-1">Hint:</p>
              <p class="text-sm text-blue-800">{{ currentProblem.hint }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ===== STAGE 4: Feedback Modal ===== -->
      <!-- 
        Show correct/incorrect feedback
        - Celebration animation for correct answers
        - Shake animation for incorrect answers
        - Explanation of the solution
        - Continue button to next problem
      -->
      <div 
        v-else-if="currentStage === 'feedback'"
        class="space-y-6"
      >
        
        <!-- Feedback Card -->
        <div 
          class="
            bg-white
            rounded-2xl
            shadow-2xl
            p-8
            md:p-12
            text-center
            max-w-2xl
            mx-auto
            transition-all
            duration-500
          "
          :class="feedbackAnimation"
        >
          
          <!-- Correct Answer Feedback -->
          <div v-if="isLastAnswerCorrect" class="space-y-6">
            
            <!-- Success Icon with confetti effect -->
            <div class="relative">
              <div class="inline-block text-6xl md:text-8xl animate-bounce">
                🎉
              </div>
              <!-- Confetti particles (CSS animation) -->
              <div class="confetti-container">
                <div class="confetti" v-for="i in 10" :key="i"></div>
              </div>
            </div>

            <!-- Success Message -->
            <h2 class="text-3xl md:text-4xl font-bold text-green-600">
              Correct! 🎯
            </h2>

            <!-- Points Earned -->
            <div class="bg-green-50 rounded-xl p-4">
              <p class="text-lg text-gray-700">
                You earned <span class="font-bold text-green-600 text-2xl">+{{ lastPointsEarned }}</span> points!
              </p>
            </div>

            <!-- Explanation -->
            <div 
              v-if="currentProblem?.explanation"
              class="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4 text-left"
            >
              <p class="font-semibold text-blue-900 mb-2">Why this is correct:</p>
              <p class="text-sm text-blue-800">{{ currentProblem.explanation }}</p>
            </div>

          </div>

          <!-- Incorrect Answer Feedback -->
          <div v-else class="space-y-6">
            
            <!-- Error Icon with shake effect -->
            <div class="inline-block text-6xl md:text-8xl animate-shake">
              ❌
            </div>

            <!-- Error Message -->
            <h2 class="text-3xl md:text-4xl font-bold text-red-600">
              Not Quite Right
            </h2>

            <!-- Show Correct Answer -->
            <div class="bg-red-50 rounded-xl p-4">
              <p class="text-lg text-gray-700 mb-2">
                Your answer: <span class="font-bold text-red-600">{{ lastUserAnswer }}</span>
              </p>
              <p class="text-lg text-gray-700">
                Correct answer: <span class="font-bold text-green-600">{{ currentProblem?.answer }}</span>
              </p>
            </div>

            <!-- Penalty Note -->
            <p class="text-sm text-gray-600">
              <i class="fas fa-info-circle"></i> -5 points penalty
            </p>

            <!-- Explanation -->
            <div 
              v-if="currentProblem?.explanation"
              class="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4 text-left"
            >
              <p class="font-semibold text-blue-900 mb-2">Here's how to solve it:</p>
              <p class="text-sm text-blue-800">{{ currentProblem.explanation }}</p>
            </div>

          </div>

          <!-- Continue Button -->
          <button
            @click="continueToNextProblem"
            class="
              w-full
              max-w-md
              mx-auto
              min-h-[56px]
              bg-primary
              text-white
              font-bold
              text-lg
              rounded-xl
              shadow-lg
              transition-all
              duration-200
              hover:bg-primary-600
              hover:scale-105
              active:scale-95
              flex
              items-center
              justify-center
              gap-2
              mt-6
            "
          >
            <span>{{ isLastProblem ? 'See Results' : 'Next Problem' }}</span>
            <i class="fas fa-arrow-right"></i>
          </button>

        </div>

      </div>

      <!-- ===== STAGE 5: Results Summary ===== -->
      <!-- 
        Show final stats and performance
        - Total score
        - Accuracy percentage
        - Correct/Incorrect breakdown
        - Time spent (if tracked)
        - Encouragement message
        - Options to retry or go back
      -->
      <div v-else-if="currentStage === 'results'" class="space-y-6">
        
        <!-- Results Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          
          <!-- Trophy Icon -->
          <div class="text-6xl md:text-8xl mb-6">
            {{ accuracyPercentage >= 80 ? '🏆' : accuracyPercentage >= 60 ? '🎖️' : '📚' }}
          </div>

          <!-- Results Title -->
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {{ resultsTitle }}
          </h2>

          <!-- Encouragement Message -->
          <p class="text-lg text-gray-600 mb-8">
            {{ resultsMessage }}
          </p>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            
            <!-- Total Score -->
            <div class="bg-primary-50 rounded-xl p-6">
              <p class="text-4xl font-bold text-primary mb-2">
                {{ currentScore }}
              </p>
              <p class="text-sm text-gray-600 font-medium">Total Points</p>
            </div>

            <!-- Accuracy -->
            <div class="bg-green-50 rounded-xl p-6">
              <p class="text-4xl font-bold text-green-600 mb-2">
                {{ accuracyPercentage }}%
              </p>
              <p class="text-sm text-gray-600 font-medium">Accuracy</p>
            </div>

            <!-- Correct Answers -->
            <div class="bg-blue-50 rounded-xl p-6">
              <p class="text-4xl font-bold text-blue-600 mb-2">
                {{ correctAnswers }}
              </p>
              <p class="text-sm text-gray-600 font-medium">Correct</p>
            </div>

            <!-- Incorrect Answers -->
            <div class="bg-red-50 rounded-xl p-6">
              <p class="text-4xl font-bold text-red-600 mb-2">
                {{ incorrectAnswers }}
              </p>
              <p class="text-sm text-gray-600 font-medium">Incorrect</p>
            </div>

          </div>

          <!-- Performance Breakdown -->
          <div class="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-chart-bar text-primary"></i>
              Performance Breakdown
            </h3>
            
            <!-- Visual Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Correct</span>
                <span>{{ correctAnswers }}/{{ totalProblems }}</span>
              </div>
              <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                  :style="{ width: accuracyPercentage + '%' }"
                ></div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Topic:</p>
                <p class="font-semibold text-gray-800">{{ selectedTopicName }}</p>
              </div>
              <div>
                <p class="text-gray-600">Difficulty:</p>
                <p class="font-semibold text-gray-800 capitalize">{{ selectedDifficulty }}</p>
              </div>
            </div>

          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-4">
            
            <!-- Try Again Button (same topic & difficulty) -->
            <button
              @click="retrySession"
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
                hover:scale-105
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <i class="fas fa-redo"></i>
              <span>Try Again</span>
            </button>

            <!-- Choose Different Topic -->
            <button
              @click="backToTopicSelection"
              class="
                w-full
                min-h-[56px]
                bg-primary
                text-white
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:bg-primary-600
                hover:scale-105
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <i class="fas fa-book"></i>
              <span>Choose Different Topic</span>
            </button>

            <!-- Back to Menu -->
            <button
              @click="backToMenu"
              class="
                w-full
                min-h-[56px]
                bg-gray-200
                text-gray-700
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:bg-gray-300
                hover:scale-105
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <i class="fas fa-home"></i>
              <span>Back to Menu</span>
            </button>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * Stage of the Skill Builder flow
 * - topic-selection: Choose which math topic to practice
 * - difficulty-selection: Choose Easy, Medium, or Hard
 * - solving: Answer problems one at a time
 * - feedback: See if answer was correct with explanation
 * - results: View final score and stats
 */
type GameStage = 'topic-selection' | 'difficulty-selection' | 'solving' | 'feedback' | 'results'

/**
 * Difficulty levels with different problem counts
 * - easy: 10 problems, simple numbers
 * - medium: 15 problems, moderate numbers
 * - hard: 20 problems, challenging numbers
 */
type Difficulty = 'easy' | 'medium' | 'hard'

/**
 * Topic IDs matching the Learn Mode topics
 * These determine which type of math problems to generate
 */
type TopicId = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'decimals' | 'algebra-basics' | 'geometry'

/**
 * Structure of a single math problem
 * Generated client-side for offline support
 */
interface Problem {
  id: string                // Unique identifier
  question: string          // e.g., "25 + 17"
  answer: number            // Correct answer
  userAnswer?: number       // What the user entered
  isCorrect?: boolean       // Whether user got it right
  points: number            // Points for this problem (10, 20, or 30)
  explanation?: string      // How to solve it
  hint?: string             // Optional hint for harder problems
}

/**
 * Topic information for selection screen
 * Includes display data and optional stats from localStorage
 */
interface Topic {
  id: TopicId
  title: string
  description: string
  icon: string              // Emoji icon
  bgColor: string           // Tailwind background color class
  stats?: {
    attempted: number
    accuracy: number
  }
}

/**
 * Session results stored in localStorage
 * Used to track progress across multiple sessions
 */
interface SessionResult {
  topicId: TopicId
  difficulty: Difficulty
  score: number
  totalProblems: number
  correctAnswers: number
  accuracy: number
  timestamp: number
}

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====
/**
 * Current stage of the game flow
 * Controls which UI component is displayed
 */
const currentStage = ref<GameStage>('topic-selection')

/**
 * Selected topic for practice
 * Set when user clicks a topic card
 */
const selectedTopic = ref<TopicId | null>(null)

/**
 * Selected difficulty level
 * Determines number and complexity of problems
 */
const selectedDifficulty = ref<Difficulty | null>(null)

/**
 * Array of generated problems for this session
 * All problems generated at once when difficulty is selected
 */
const problems = ref<Problem[]>([])

/**
 * Index of current problem being solved (0-based)
 * Increments after each answer or skip
 */
const currentProblemIndex = ref(0)

/**
 * User's current answer input
 * Bound to the answer input field
 */
const userAnswer = ref<string>('')

/**
 * Whether the last answer was correct
 * Used to show appropriate feedback
 */
const isLastAnswerCorrect = ref(false)

/**
 * User's last submitted answer
 * Displayed in feedback screen
 */
const lastUserAnswer = ref<number>(0)

/**
 * Points earned from last problem
 * Displayed in feedback screen
 */
const lastPointsEarned = ref(0)

/**
 * Total score accumulated in this session
 * Updated after each problem
 */
const currentScore = ref(0)

/**
 * Animation class for feedback card
 * Triggers confetti or shake effect
 */
const feedbackAnimation = ref('')

// ===== Constants & Config =====
/**
 * All available math topics with display information
 * Matches topics from Learn Mode for consistency
 */
const topics = ref<Topic[]>([
  {
    id: 'addition',
    title: 'Addition',
    description: 'Practice adding numbers together',
    icon: '➕',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    description: 'Learn to subtract numbers',
    icon: '➖',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    description: 'Master multiplication tables',
    icon: '✖️',
    bgColor: 'bg-green-100'
  },
  {
    id: 'division',
    title: 'Division',
    description: 'Divide numbers with confidence',
    icon: '➗',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Work with parts of a whole',
    icon: '½',
    bgColor: 'bg-pink-100'
  },
  {
    id: 'decimals',
    title: 'Decimals',
    description: 'Practice decimal operations',
    icon: '0.5',
    bgColor: 'bg-indigo-100'
  },
  {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    description: 'Introduction to variables',
    icon: '🔤',
    bgColor: 'bg-red-100'
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Shapes, angles, and areas',
    icon: '📐',
    bgColor: 'bg-teal-100'
  }
])

/**
 * Points awarded based on difficulty
 * Used when generating problems
 */
const POINTS_BY_DIFFICULTY = {
  easy: 10,
  medium: 20,
  hard: 30
}

/**
 * Number of problems for each difficulty
 * Balances practice time with engagement
 */
const PROBLEMS_BY_DIFFICULTY = {
  easy: 10,
  medium: 15,
  hard: 20
}

/**
 * Points penalty for incorrect answers
 * Encourages careful thinking but not harsh
 */
const INCORRECT_PENALTY = 5

// ===== Computed Properties =====
/**
 * Dynamic stage title for header
 * Changes based on current stage and selections
 */
const stageTitle = computed(() => {
  switch (currentStage.value) {
    case 'topic-selection':
      return 'Skill Builder 📚'
    case 'difficulty-selection':
      return `${selectedTopicName.value} - Choose Difficulty`
    case 'solving':
      return selectedTopicName.value || 'Skill Builder'
    case 'feedback':
      return 'How Did You Do?'
    case 'results':
      return 'Results Summary'
    default:
      return 'Skill Builder'
  }
})

/**
 * Get friendly name for selected topic
 * Used in headers and results
 */
const selectedTopicName = computed(() => {
  if (!selectedTopic.value) return ''
  const topic = topics.value.find(t => t.id === selectedTopic.value)
  return topic?.title || ''
})

/**
 * Label for back button (changes by stage)
 * Provides context for navigation
 */
const backButtonLabel = computed(() => {
  switch (currentStage.value) {
    case 'topic-selection':
      return 'Back to play menu'
    case 'difficulty-selection':
      return 'Back to topic selection'
    case 'solving':
      return 'Back to difficulty selection'
    case 'feedback':
      return 'Skip to results'
    case 'results':
      return 'Back to topic selection'
    default:
      return 'Back'
  }
})

/**
 * Current problem object
 * Retrieved from problems array using current index
 */
const currentProblem = computed(() => problems.value[currentProblemIndex.value])

/**
 * Total number of problems in this session
 * Based on selected difficulty
 */
const totalProblems = computed(() => problems.value.length)

/**
 * Progress percentage for progress bar
 * Shows how many problems completed
 */
const problemProgress = computed(() => {
  if (totalProblems.value === 0) return 0
  return Math.round(((currentProblemIndex.value + 1) / totalProblems.value) * 100)
})

/**
 * Check if current problem is the last one
 * Used to show "See Results" instead of "Next"
 */
const isLastProblem = computed(() => currentProblemIndex.value === totalProblems.value - 1)

/**
 * Count of correct answers in this session
 * Sum of all problems marked as correct
 */
const correctAnswers = computed(() => {
  return problems.value.filter(p => p.isCorrect === true).length
})

/**
 * Count of incorrect answers in this session
 * Sum of all problems marked as incorrect
 */
const incorrectAnswers = computed(() => {
  return problems.value.filter(p => p.isCorrect === false).length
})

/**
 * Calculate accuracy percentage
 * Used in results summary
 */
const accuracyPercentage = computed(() => {
  const answered = correctAnswers.value + incorrectAnswers.value
  if (answered === 0) return 0
  return Math.round((correctAnswers.value / answered) * 100)
})

/**
 * Dynamic results title based on performance
 * Encourages students based on their score
 */
const resultsTitle = computed(() => {
  const accuracy = accuracyPercentage.value
  if (accuracy >= 90) return 'Outstanding! 🌟'
  if (accuracy >= 80) return 'Excellent Work! 🎉'
  if (accuracy >= 70) return 'Great Job! 👏'
  if (accuracy >= 60) return 'Good Effort! 💪'
  return 'Keep Practicing! 📚'
})

/**
 * Encouraging message for results screen
 * Positive reinforcement regardless of score
 */
const resultsMessage = computed(() => {
  const accuracy = accuracyPercentage.value
  if (accuracy >= 90) return 'You\'re a math star! Your hard work is paying off!'
  if (accuracy >= 80) return 'You\'re doing really well! Keep up the great work!'
  if (accuracy >= 70) return 'Nice progress! You\'re getting better with practice!'
  if (accuracy >= 60) return 'You\'re on the right track! Practice makes perfect!'
  return 'Don\'t give up! Every problem you solve makes you better!'
})

// ===== Problem Generation Functions =====
/**
 * Generate all problems for the session
 * Called when user selects difficulty
 * 
 * Why generate all at once:
 * - Ensures consistent difficulty throughout session
 * - Works offline without any API calls
 * - Fast generation (< 100ms for 20 problems)
 * - Allows for problem variety checking
 * 
 * @param topic - The math topic to generate problems for
 * @param difficulty - Difficulty level (affects number count and complexity)
 */
function generateProblems(topic: TopicId, difficulty: Difficulty): Problem[] {
  const count = PROBLEMS_BY_DIFFICULTY[difficulty]
  const points = POINTS_BY_DIFFICULTY[difficulty]
  const problemList: Problem[] = []

  for (let i = 0; i < count; i++) {
    let problem: Problem

    switch (topic) {
      case 'addition':
        problem = generateAdditionProblem(difficulty, points)
        break
      case 'subtraction':
        problem = generateSubtractionProblem(difficulty, points)
        break
      case 'multiplication':
        problem = generateMultiplicationProblem(difficulty, points)
        break
      case 'division':
        problem = generateDivisionProblem(difficulty, points)
        break
      case 'fractions':
        problem = generateFractionProblem(difficulty, points)
        break
      case 'decimals':
        problem = generateDecimalProblem(difficulty, points)
        break
      case 'algebra-basics':
        problem = generateAlgebraProblem(difficulty, points)
        break
      case 'geometry':
        problem = generateGeometryProblem(difficulty, points)
        break
      default:
        // Fallback to addition if topic not recognized
        problem = generateAdditionProblem(difficulty, points)
    }

    // Assign unique ID
    problem.id = `${topic}-${difficulty}-${i}-${Date.now()}`
    problemList.push(problem)
  }

  return problemList
}

/**
 * Generate an addition problem
 * Difficulty affects number ranges:
 * - Easy: 1-20 + 1-20
 * - Medium: 10-99 + 10-99
 * - Hard: 100-999 + 100-999
 */
function generateAdditionProblem(difficulty: Difficulty, points: number): Problem {
  let num1: number, num2: number

  switch (difficulty) {
    case 'easy':
      num1 = randomInt(1, 20)
      num2 = randomInt(1, 20)
      break
    case 'medium':
      num1 = randomInt(10, 99)
      num2 = randomInt(10, 99)
      break
    case 'hard':
      num1 = randomInt(100, 999)
      num2 = randomInt(100, 999)
      break
  }

  const answer = num1 + num2

   // Create base problem object
  const problem: Problem = {
    id: '',
    question: `${num1} + ${num2}`,
    answer,
    points,
    explanation: `Add the numbers: ${num1} + ${num2} = ${answer}`
  }
  
  // Only add hint if it exists (don't explicitly set undefined)
  if (difficulty === 'hard') {
    problem.hint = 'Start by adding the ones place, then tens, then hundreds.'
  }
  
  return problem
}

/**
 * Generate a subtraction problem
 * Ensures answer is always positive (no negative results)
 */
function generateSubtractionProblem(difficulty: Difficulty, points: number): Problem {
  let num1: number, num2: number

  switch (difficulty) {
    case 'easy':
      num1 = randomInt(10, 20)
      num2 = randomInt(1, num1) // Ensure positive result
      break
    case 'medium':
      num1 = randomInt(50, 99)
      num2 = randomInt(10, num1)
      break
    case 'hard':
      num1 = randomInt(500, 999)
      num2 = randomInt(100, num1)
      break
  }

  const answer = num1 - num2

   // Create base problem object
  const problem: Problem = {
    id: '',
    question: `${num1} - ${num2}`,
    answer,
    points,
    explanation: `Subtract: ${num1} - ${num2} = ${answer}`
  }
  
  // Only add hint if it exists
  if (difficulty === 'hard') {
    problem.hint = 'Remember to borrow if needed when subtracting.'
  }
  
  return problem
}

/**
 * Generate a multiplication problem
 * Focuses on multiplication tables and progressively larger numbers
 */
function generateMultiplicationProblem(difficulty: Difficulty, points: number): Problem {
  let num1: number, num2: number

  switch (difficulty) {
    case 'easy':
      num1 = randomInt(1, 10)
      num2 = randomInt(1, 10)
      break
    case 'medium':
      num1 = randomInt(5, 15)
      num2 = randomInt(5, 15)
      break
    case 'hard':
      num1 = randomInt(10, 50)
      num2 = randomInt(10, 50)
      break
  }

  const answer = num1 * num2

    // Create base problem object
  const problem: Problem = {
    id: '',
    question: `${num1} × ${num2}`,
    answer,
    points,
    explanation: `Multiply: ${num1} × ${num2} = ${answer}`
  }
  
  // Only add hint if it exists
  if (difficulty === 'easy') {
    problem.hint = 'Think of it as repeated addition.'
  }
  
  return problem
}

/**
 * Generate a division problem
 * Ensures even division (no remainders for simplicity)
 */
function generateDivisionProblem(difficulty: Difficulty, points: number): Problem {
  let divisor: number, answer: number, dividend: number

  switch (difficulty) {
    case 'easy':
      divisor = randomInt(2, 10)
      answer = randomInt(1, 10)
      break
    case 'medium':
      divisor = randomInt(5, 15)
      answer = randomInt(5, 15)
      break
    case 'hard':
      divisor = randomInt(10, 20)
      answer = randomInt(10, 30)
      break
  }

  // Calculate dividend to ensure even division
  dividend = divisor * answer

    // Create base problem object
  const problem: Problem = {
    id: '',
    question: `${dividend} ÷ ${divisor}`,
    answer,
    points,
    explanation: `Divide: ${dividend} ÷ ${divisor} = ${answer}`
  }
  
  // Only add hint if it exists
  if (difficulty === 'hard') {
    problem.hint = 'Think: what number times the divisor equals the dividend?'
  }
  
  return problem
}

/**
 * Generate a fraction problem
 * Simplified fractions only (for Skill Builder context)
 */
function generateFractionProblem(difficulty: Difficulty, points: number): Problem {
  // For now, generate simple fraction addition
  let num1: number, num2: number, denom: number

  switch (difficulty) {
    case 'easy':
      denom = randomInt(2, 5)
      num1 = randomInt(1, denom - 1)
      num2 = randomInt(1, denom - num1)
      break
    case 'medium':
      denom = randomInt(5, 10)
      num1 = randomInt(1, denom - 1)
      num2 = randomInt(1, denom - num1)
      break
    case 'hard':
      denom = randomInt(10, 20)
      num1 = randomInt(1, denom - 1)
      num2 = randomInt(1, denom - num1)
      break
  }

  const answer = num1 + num2

  return {
    id: '',
    question: `${num1}/${denom} + ${num2}/${denom}`,
    answer,
    points,
    explanation: `With the same denominator, just add the numerators: ${num1} + ${num2} = ${answer}. Answer: ${answer}/${denom}`,
    hint: 'When denominators are the same, add the top numbers (numerators).'
  }
}

/**
 * Generate a decimal problem
 * Addition of decimals
 */
function generateDecimalProblem(difficulty: Difficulty, points: number): Problem {
  let num1: number, num2: number

  switch (difficulty) {
    case 'easy':
      num1 = parseFloat((randomInt(1, 10) + Math.random()).toFixed(1))
      num2 = parseFloat((randomInt(1, 10) + Math.random()).toFixed(1))
      break
    case 'medium':
      num1 = parseFloat((randomInt(10, 50) + Math.random()).toFixed(2))
      num2 = parseFloat((randomInt(10, 50) + Math.random()).toFixed(2))
      break
    case 'hard':
      num1 = parseFloat((randomInt(50, 100) + Math.random()).toFixed(2))
      num2 = parseFloat((randomInt(50, 100) + Math.random()).toFixed(2))
      break
  }

  const answer = parseFloat((num1 + num2).toFixed(2))

  return {
    id: '',
    question: `${num1} + ${num2}`,
    answer,
    points,
    explanation: `Add the decimals: ${num1} + ${num2} = ${answer}`,
    hint: 'Line up the decimal points when adding.'
  }
}

/**
 * Generate an algebra basics problem
 * Simple "solve for x" equations
 */
function generateAlgebraProblem(difficulty: Difficulty, points: number): Problem {
  let x: number, constant: number, result: number

  switch (difficulty) {
    case 'easy':
      x = randomInt(1, 10)
      constant = randomInt(1, 10)
      result = x + constant
      return {
        id: '',
        question: `x + ${constant} = ${result}. Find x.`,
        answer: x,
        points,
        explanation: `Subtract ${constant} from both sides: x = ${result} - ${constant} = ${x}`,
        hint: 'What number plus the constant equals the result?'
      }
    case 'medium':
      x = randomInt(5, 20)
      constant = randomInt(2, 5)
      result = x * constant
      return {
        id: '',
        question: `${constant}x = ${result}. Find x.`,
        answer: x,
        points,
        explanation: `Divide both sides by ${constant}: x = ${result} ÷ ${constant} = ${x}`,
        hint: 'Divide the result by the coefficient to isolate x.'
      }
    case 'hard':
      x = randomInt(10, 30)
      constant = randomInt(5, 15)
      const addend = randomInt(5, 20)
      result = x * constant + addend
      return {
        id: '',
        question: `${constant}x + ${addend} = ${result}. Find x.`,
        answer: x,
        points,
        explanation: `First subtract ${addend}: ${constant}x = ${result - addend}. Then divide: x = ${result - addend} ÷ ${constant} = ${x}`,
        hint: 'First subtract the constant, then divide by the coefficient.'
      }
  }
}

/**
 * Generate a geometry problem
 * Perimeter, area, or angle calculations
 */
function generateGeometryProblem(difficulty: Difficulty, points: number): Problem {
  const problemType = randomInt(1, 2) // 1 = perimeter, 2 = area

  if (problemType === 1) {
    // Perimeter of rectangle
    let length: number, width: number

    switch (difficulty) {
      case 'easy':
        length = randomInt(5, 15)
        width = randomInt(3, 10)
        break
      case 'medium':
        length = randomInt(15, 40)
        width = randomInt(10, 30)
        break
      case 'hard':
        length = randomInt(40, 100)
        width = randomInt(30, 80)
        break
    }

    const answer = 2 * (length + width)

    return {
      id: '',
      question: `Find the perimeter of a rectangle with length ${length} and width ${width}.`,
      answer,
      points,
      explanation: `Perimeter = 2(length + width) = 2(${length} + ${width}) = 2(${length + width}) = ${answer}`,
      hint: 'Add length and width, then multiply by 2.'
    }
  } else {
    // Area of rectangle
    let length: number, width: number

    switch (difficulty) {
      case 'easy':
        length = randomInt(5, 15)
        width = randomInt(3, 10)
        break
      case 'medium':
        length = randomInt(15, 40)
        width = randomInt(10, 30)
        break
      case 'hard':
        length = randomInt(40, 100)
        width = randomInt(30, 80)
        break
    }

    const answer = length * width

    return {
      id: '',
      question: `Find the area of a rectangle with length ${length} and width ${width}.`,
      answer,
      points,
      explanation: `Area = length × width = ${length} × ${width} = ${answer}`,
      hint: 'Multiply length by width.'
    }
  }
}

/**
 * Generate random integer between min and max (inclusive)
 * Used by all problem generators
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// ===== Navigation & Flow Handlers =====
/**
 * Handle back button click
 * Behavior changes based on current stage
 */
function handleBack(): void {
  switch (currentStage.value) {
    case 'topic-selection':
      // Go back to Play Mode menu
      router.push('/play')
      break
    case 'difficulty-selection':
      // Go back to topic selection
      currentStage.value = 'topic-selection'
      selectedTopic.value = null
      break
    case 'solving':
      // Go back to difficulty selection (lose progress warning could be added)
      currentStage.value = 'difficulty-selection'
      selectedDifficulty.value = null
      problems.value = []
      currentProblemIndex.value = 0
      currentScore.value = 0
      break
    case 'feedback':
      // Skip to results
      currentStage.value = 'results'
      break
    case 'results':
      // Go back to topic selection for new session
      backToTopicSelection()
      break
  }
}

/**
 * User selects a topic
 * Moves to difficulty selection
 */
function selectTopic(topicId: TopicId): void {
  selectedTopic.value = topicId
  currentStage.value = 'difficulty-selection'
}

/**
 * User selects difficulty level
 * Generates all problems and starts session
 */
function selectDifficulty(difficulty: Difficulty): void {
  selectedDifficulty.value = difficulty
  
  // Generate all problems for this session
  if (selectedTopic.value) {
    problems.value = generateProblems(selectedTopic.value, difficulty)
  }

  // Reset game state
  currentProblemIndex.value = 0
  currentScore.value = 0
  userAnswer.value = ''

  // Start solving
  currentStage.value = 'solving'
}

/**
 * Check if user's answer is correct
 * Shows feedback and updates score
 */
function checkAnswer(): void {
  if (userAnswer.value === '' || !currentProblem.value) return

  const userNum = parseInt(userAnswer.value)
  const isCorrect = userNum === currentProblem.value.answer

  // Store answer data
  currentProblem.value.userAnswer = userNum
  currentProblem.value.isCorrect = isCorrect

  // Update score
  if (isCorrect) {
    currentScore.value += currentProblem.value.points
    lastPointsEarned.value = currentProblem.value.points
    isLastAnswerCorrect.value = true
    
    // Trigger confetti animation
    feedbackAnimation.value = 'animate-confetti'
  } else {
    // Deduct penalty (but don't go below 0)
    currentScore.value = Math.max(0, currentScore.value - INCORRECT_PENALTY)
    lastPointsEarned.value = 0
    isLastAnswerCorrect.value = false
    lastUserAnswer.value = userNum

    // Trigger shake animation
    feedbackAnimation.value = 'animate-shake'
  }

  // Show feedback screen
  currentStage.value = 'feedback'

  // Clear animation after 1 second
  setTimeout(() => {
    feedbackAnimation.value = ''
  }, 1000)
}

/**
 * Skip current problem without answering
 * Marks as incorrect but no penalty
 */
function skipProblem(): void {
  if (!currentProblem.value) return

  // Mark as skipped (treated as incorrect but no explanation needed)
  currentProblem.value.isCorrect = false
  
  // Move to next problem immediately
  continueToNextProblem()
}

/**
 * Continue to next problem or show results
 * Called after feedback is shown
 */
function continueToNextProblem(): void {
  // Clear answer input
  userAnswer.value = ''

  if (isLastProblem.value) {
    // Show results summary
    currentStage.value = 'results'
    
    // Save results to localStorage
    saveSessionResults()
  } else {
    // Move to next problem
    currentProblemIndex.value++
    currentStage.value = 'solving'
  }
}

/**
 * Retry same topic and difficulty
 * Generates new problems
 */
function retrySession(): void {
  if (selectedTopic.value && selectedDifficulty.value) {
    // Generate new problems
    problems.value = generateProblems(selectedTopic.value, selectedDifficulty.value)
    
    // Reset game state
    currentProblemIndex.value = 0
    currentScore.value = 0
    userAnswer.value = ''
    
    // Start solving
    currentStage.value = 'solving'
  }
}

/**
 * Go back to topic selection for new session
 */
function backToTopicSelection(): void {
  currentStage.value = 'topic-selection'
  selectedTopic.value = null
  selectedDifficulty.value = null
  problems.value = []
  currentProblemIndex.value = 0
  currentScore.value = 0
  userAnswer.value = ''
}

/**
 * Go back to Play Mode menu
 */
function backToMenu(): void {
  router.push('/play')
}

// ===== localStorage Functions =====
/**
 * Save session results to localStorage
 * Used to track progress and show stats on topic cards
 * 
 * Storage structure:
 * mathstar_skill_builder_stats: {
 *   totalSolved: number,
 *   accuracy: number,
 *   lastPlayed: timestamp
 * }
 * 
 * mathstar_skill_builder_history: SessionResult[]
 */
function saveSessionResults(): void {
  if (!selectedTopic.value || !selectedDifficulty.value) return

  try {
    // Create session result object
    const sessionResult: SessionResult = {
      topicId: selectedTopic.value,
      difficulty: selectedDifficulty.value,
      score: currentScore.value,
      totalProblems: totalProblems.value,
      correctAnswers: correctAnswers.value,
      accuracy: accuracyPercentage.value,
      timestamp: Date.now()
    }

    // Load existing stats
    const statsData = localStorage.getItem('mathstar_skill_builder_stats')
    const stats = statsData ? JSON.parse(statsData) : { totalSolved: 0, accuracy: 0 }

    // Update overall stats
    const totalSolved = stats.totalSolved + totalProblems.value
    const newAccuracy = Math.round(
      ((stats.totalSolved * stats.accuracy) + (totalProblems.value * accuracyPercentage.value)) / totalSolved
    )

    // Save updated stats
    localStorage.setItem('mathstar_skill_builder_stats', JSON.stringify({
      totalSolved,
      accuracy: newAccuracy,
      lastPlayed: Date.now()
    }))

    // Load and update session history
    const historyData = localStorage.getItem('mathstar_skill_builder_history')
    const history: SessionResult[] = historyData ? JSON.parse(historyData) : []
    
    // Add new session (keep last 50 sessions)
    history.unshift(sessionResult)
    if (history.length > 50) {
      history.pop()
    }

    // Save updated history
    localStorage.setItem('mathstar_skill_builder_history', JSON.stringify(history))

    // Update topic stats for display on topic cards
    updateTopicStats(selectedTopic.value, totalProblems.value, accuracyPercentage.value)

  } catch (error) {
    console.error('Failed to save session results:', error)
    // Fail silently - stats are not critical for gameplay
  }
}

/**
 * Update stats for a specific topic
 * Used to show progress on topic selection cards
 */
function updateTopicStats(topicId: TopicId, newProblems: number, newAccuracy: number): void {
  try {
    const topicStatsData = localStorage.getItem(`mathstar_topic_${topicId}`)
    const topicStats = topicStatsData ? JSON.parse(topicStatsData) : { attempted: 0, accuracy: 0 }

    // Calculate new average accuracy
    const totalAttempted = topicStats.attempted + newProblems
    const avgAccuracy = Math.round(
      ((topicStats.attempted * topicStats.accuracy) + (newProblems * newAccuracy)) / totalAttempted
    )

    // Save updated topic stats
    localStorage.setItem(`mathstar_topic_${topicId}`, JSON.stringify({
      attempted: totalAttempted,
      accuracy: avgAccuracy
    }))

  } catch (error) {
    console.error('Failed to update topic stats:', error)
  }
}

/**
 * Load topic stats from localStorage
 * Called on component mount to populate topic cards
 */
function loadTopicStats(): void {
  topics.value.forEach(topic => {
    try {
      const statsData = localStorage.getItem(`mathstar_topic_${topic.id}`)
      if (statsData) {
        topic.stats = JSON.parse(statsData)
      }
    } catch (error) {
      console.error(`Failed to load stats for ${topic.id}:`, error)
    }
  })
}

// ===== Lifecycle Hooks =====
/**
 * When component mounts:
 * 1. Load topic stats from localStorage
 * 2. Set up keyboard shortcuts
 */
onMounted(() => {
  // Load stats for topic cards
  loadTopicStats()

  // Add keyboard shortcuts for better UX
  window.addEventListener('keydown', handleKeyPress)
})

/**
 * Clean up event listeners when component unmounts
 */
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

/**
 * Handle keyboard shortcuts
 * - Enter: Submit answer or continue
 * - Escape: Go back
 */
function handleKeyPress(event: KeyboardEvent): void {
  // Enter key during solving stage
  if (event.key === 'Enter' && currentStage.value === 'solving') {
    if (userAnswer.value !== '') {
      checkAnswer()
    }
  }

  // Enter key during feedback stage
  if (event.key === 'Enter' && currentStage.value === 'feedback') {
    continueToNextProblem()
  }

  // Escape key to go back
  if (event.key === 'Escape') {
    handleBack()
  }
}
</script>

<style scoped>
/**
 * Custom styles for Skill Builder View
 * Most styling uses Tailwind utilities
 * Only add custom CSS for complex animations
 */

/* ===== Confetti Animation START ===== */
/* 
  Celebration animation when answer is correct
  - Creates falling confetti particles
  - CSS-only animation for performance
  - Ghana-friendly (no heavy graphics)
*/

@keyframes confetti-fall {
  from {
    transform: translateY(-100%) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f59e0b;
  animation: confetti-fall 3s ease-out forwards;
}

/* Stagger confetti particles for natural effect */
.confetti:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
  background-color: #ef4444;
}

.confetti:nth-child(2) {
  left: 20%;
  animation-delay: 0.1s;
  background-color: #3b82f6;
}

.confetti:nth-child(3) {
  left: 30%;
  animation-delay: 0.2s;
  background-color: #10b981;
}

.confetti:nth-child(4) {
  left: 40%;
  animation-delay: 0.3s;
  background-color: #f59e0b;
}

.confetti:nth-child(5) {
  left: 50%;
  animation-delay: 0.4s;
  background-color: #8b5cf6;
}

.confetti:nth-child(6) {
  left: 60%;
  animation-delay: 0.5s;
  background-color: #ec4899;
}

.confetti:nth-child(7) {
  left: 70%;
  animation-delay: 0.6s;
  background-color: #06b6d4;
}

.confetti:nth-child(8) {
  left: 80%;
  animation-delay: 0.7s;
  background-color: #f97316;
}

.confetti:nth-child(9) {
  left: 90%;
  animation-delay: 0.8s;
  background-color: #84cc16;
}

.confetti:nth-child(10) {
  left: 95%;
  animation-delay: 0.9s;
  background-color: #f43f5e;
}

/* ===== Confetti Animation END ===== */

/* ===== Shake Animation START ===== */
/* 
  Error animation for incorrect answers
  - Shakes card horizontally
  - Short duration for quick feedback
  - Not too aggressive to avoid frustration
*/

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

/* ===== Shake Animation END ===== */

/* ===== Bounce Animation for Success Icon ===== */

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out infinite;
}

/* ===== Smooth Transitions ===== */

button {
  transition: all 0.2s ease;
}

input {
  transition: all 0.2s ease;
}

/* Remove spinner buttons from number input (cleaner UI) */
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

/* ===== Touch Device Optimizations ===== */

@media (max-width: 640px) {
  /* Ensure touch targets are large enough for Ghana mobile users */
  button {
    min-height: 48px;
    min-width: 48px;
  }
}

/* ===== Focus States for Accessibility ===== */

button:focus-visible,
input:focus-visible {
  outline: 3px solid #3B81F6;
  outline-offset: 4px;
}
</style>