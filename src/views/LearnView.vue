<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\LearnView.vue -->
<template>
  <!-- ===== Main Learn Container ===== -->
  <!-- 
    Full-screen container with animated gradient background
    - Smooth color transitions for visual appeal
    - Mobile-first design optimized for Ghana's connectivity
  -->
  <div class="min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary">
    
    <!-- ===== Header Section ===== -->
    <!-- 
      Fixed header with back button and title
      - Stays visible while scrolling through topics
      - Large touch targets for mobile users
    -->
    <header class="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <!-- Header Content -->
        <div class="flex items-center justify-between">
          
          <!-- Back Button -->
          <button
            @click="navigateBack"
            class="
              flex items-center gap-2
              text-white
              font-semibold
              text-lg
              transition-transform
              duration-200
              hover:scale-110
              active:scale-95
              min-w-[48px] min-h-[48px]
            "
            aria-label="Go back to options"
          >
            <i class="fas fa-arrow-left text-2xl"></i>
            <span class="hidden sm:inline">Back</span>
          </button>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Choose a Topic
          </h1>

          <!-- Placeholder for symmetry -->
          <div class="w-[48px]"></div>
        </div>
      </div>
    </header>

    <!-- ===== Main Content Section ===== -->
    <!-- 
      Scrollable topic grid
      - Responsive grid layout (1 column mobile, 2 columns tablet, 3 desktop)
      - Smooth fade-in animations
    -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- ===== Section Title ===== -->
      <div 
        class="text-center mb-8 transition-all duration-1000 ease-out"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <p class="text-secondary text-xl md:text-2xl font-semibold mb-2">
          Let's Learn Together! 📚
        </p>
        <p class="text-white/80 text-base md:text-lg">
          Pick a topic to start your journey to math mastery
        </p>
      </div>

      <!-- ===== Topic Cards Grid ===== -->
      <!-- 
        Responsive grid that adapts to screen size
        - 1 column on mobile (360px)
        - 2 columns on tablet (768px+)
        - 3 columns on desktop (1024px+)
      -->
      <div 
        class="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        "
      >
        <!-- ===== Topic Card Component ===== -->
        <!-- 
          Each topic is a card with:
          - Icon (visual identifier)
          - Title (clear topic name)
          - Description (what they'll learn)
          - Progress bar (how much completed)
          - Lesson count (number of lessons)
          
          Animations:
          - Cards fade in sequentially (staggered delay)
          - Hover/tap effects for feedback
          - Smooth color transitions
        -->
        <div
          v-for="(topic, index) in topics"
          :key="topic.id"
          @click="navigateToTopic(topic.id)"
          class="
            group
            bg-white
            rounded-2xl
            shadow-xl
            overflow-hidden
            cursor-pointer
            transition-all
            duration-500
            ease-out
            hover:scale-105
            hover:shadow-2xl
            active:scale-95
          "
          :class="[
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{
            transitionDelay: `${index * 100}ms`
          }"
          role="button"
          :aria-label="`Learn ${topic.title}`"
          tabindex="0"
          @keydown.enter="navigateToTopic(topic.id)"
        >
          
          <!-- ===== Card Header (Icon Area) ===== -->
          <!-- 
            Colorful header with icon
            - Each topic has unique color
            - Icon rotates on hover for fun interaction
          -->
          <div 
            class="
              relative
              h-32
              flex items-center justify-center
              transition-all
              duration-300
              group-hover:brightness-110
            "
            :style="{ backgroundColor: topic.color }"
          >
            <!-- Topic Icon -->
            <i 
              :class="topic.icon"
              class="
                text-6xl 
                text-white 
                transition-transform 
                duration-300
                group-hover:scale-110
                group-hover:rotate-12
              "
            ></i>

            <!-- Lesson Count Badge -->
            <div 
              class="
                absolute 
                top-3 
                right-3 
                bg-white/20 
                backdrop-blur-sm
                text-white
                text-xs
                font-bold
                px-3
                py-1
                rounded-full
                shadow-md
              "
            >
              {{ topic.lessonCount }} lessons
            </div>
          </div>

          <!-- ===== Card Body (Content Area) ===== -->
          <div class="p-5 space-y-3">
            
            <!-- Topic Title -->
            <h2 
              class="
                text-xl 
                font-bold 
                text-gray-800
                transition-colors
                duration-200
                group-hover:text-primary
              "
            >
              {{ topic.title }}
            </h2>

            <!-- Topic Description -->
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ topic.description }}
            </p>

            <!-- ===== Progress Section ===== -->
            <div class="space-y-2 pt-2">
              
              <!-- Progress Text -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span class="font-medium">Progress</span>
                <span class="font-bold">{{ topic.progress }}%</span>
              </div>

              <!-- Progress Bar -->
              <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="
                    h-full 
                    rounded-full
                    transition-all 
                    duration-1000
                    ease-out
                  "
                  :style="{
                    width: showContent ? `${topic.progress}%` : '0%',
                    backgroundColor: topic.color,
                    transitionDelay: `${(index * 100) + 500}ms`
                  }"
                ></div>
              </div>

              <!-- Status Badge -->
              <div 
                v-if="topic.progress === 0"
                class="inline-flex items-center gap-1 text-xs font-semibold text-secondary"
              >
                <i class="fas fa-star"></i>
                <span>Start Learning!</span>
              </div>
              <div 
                v-else-if="topic.progress === 100"
                class="inline-flex items-center gap-1 text-xs font-semibold text-success"
              >
                <i class="fas fa-check-circle"></i>
                <span>Completed!</span>
              </div>
              <div 
                v-else
                class="inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                <i class="fas fa-play-circle"></i>
                <span>Continue Learning</span>
              </div>
            </div>

          </div>

          <!-- ===== Card Footer (Call to Action) ===== -->
          <div 
            class="
              bg-gray-50
              px-5
              py-3
              flex
              items-center
              justify-between
              border-t
              border-gray-100
              transition-colors
              duration-200
              group-hover:bg-primary/5
            "
          >
            <span class="text-sm font-semibold text-gray-700 group-hover:text-primary">
              {{ topic.progress === 0 ? 'Start Topic' : 'Continue' }}
            </span>
            <i 
              class="
                fas fa-arrow-right 
                text-primary
                transition-transform
                duration-200
                group-hover:translate-x-2
              "
            ></i>
          </div>

        </div>
      </div>

      <!-- ===== Empty State (if no topics) ===== -->
      <div 
        v-if="topics.length === 0"
        class="text-center py-16"
      >
        <i class="fas fa-book-open text-6xl text-white/50 mb-4"></i>
        <p class="text-white text-xl font-semibold">
          No topics available yet
        </p>
        <p class="text-white/70 mt-2">
          Check back soon for new learning content!
        </p>
      </div>

    </main>

    <!-- ===== Footer (Optional Motivational Quote) ===== -->
    <footer 
      class="
        text-center 
        py-6 
        px-4
        transition-all
        duration-1000
        ease-out
        delay-700
      "
      :class="showContent ? 'opacity-100' : 'opacity-0'"
    >
      <p class="text-white/60 text-sm italic">
        "The only way to learn mathematics is to do mathematics." - Paul Halmos
      </p>
    </footer>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * Topic interface defines the structure of each learning topic
 * 
 * @property id - Unique identifier for routing
 * @property title - Display name of the topic
 * @property description - Brief explanation of what students will learn
 * @property icon - Font Awesome icon class
 * @property color - Theme color for the topic card (hex format)
 * @property lessonCount - Number of lessons in this topic
 * @property progress - Completion percentage (0-100)
 * 
 * Why we structure it this way:
 * - Clear separation of concerns
 * - Easy to add new topics via JSON
 * - Progress tracking for user motivation
 * - Visual variety with colors and icons
 */
interface Topic {
  id: string
  title: string
  description: string
  icon: string
  color: string
  lessonCount: number
  progress: number
}

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====
/**
 * Controls animation visibility
 * - Starts false to trigger fade-in animations
 * - Set to true after mount for smooth entrance
 */
const showContent = ref(false)

/**
 * Topics array - The learning content catalog
 * 
 * Future Enhancement:
 * - Load from JSON file or API
 * - Progress data from localStorage or backend
 * - Support for locked/unlocked topics
 * 
 * Current Implementation:
 * - Static data for MVP
 * - Covers foundational math topics (ages 10-16)
 * - Clear progression from basic to advanced
 */
const topics = ref<Topic[]>([
  {
    id: 'addition',
    title: 'Addition',
    description: 'Learn to add numbers quickly and accurately. Master basic and advanced addition techniques.',
    icon: 'fas fa-plus-circle',
    color: '#3B82F6', // Blue
    lessonCount: 8,
    progress: 0
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    description: 'Understand subtraction and learn clever tricks to subtract any numbers with confidence.',
    icon: 'fas fa-minus-circle',
    color: '#EF4444', // Red
    lessonCount: 7,
    progress: 0
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    description: 'Master multiplication tables and techniques. From times tables to multi-digit multiplication.',
    icon: 'fas fa-times-circle',
    color: '#10B981', // Green
    lessonCount: 10,
    progress: 0
  },
  {
    id: 'division',
    title: 'Division',
    description: 'Learn division step-by-step. Understand remainders, long division, and solve division problems.',
    icon: 'fas fa-divide',
    color: '#F59E0B', // Orange
    lessonCount: 9,
    progress: 0
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Work with fractions confidently. Add, subtract, multiply, and divide fractions with ease.',
    icon: 'fas fa-percent',
    color: '#8B5CF6', // Purple
    lessonCount: 12,
    progress: 0
  },
  {
    id: 'decimals',
    title: 'Decimals',
    description: 'Master decimal numbers and learn operations with decimals. Convert between fractions and decimals.',
    icon: 'fas fa-calculator',
    color: '#EC4899', // Pink
    lessonCount: 11,
    progress: 0
  },
  {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    description: 'Introduction to algebra! Learn about variables, expressions, and solving simple equations.',
    icon: 'fas fa-square-root-alt',
    color: '#06B6D4', // Cyan
    lessonCount: 15,
    progress: 0
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Explore shapes, angles, and measurements. Learn about area, perimeter, and basic geometry concepts.',
    icon: 'fas fa-shapes',
    color: '#14B8A6', // Teal
    lessonCount: 13,
    progress: 0
  }
])

// ===== Navigation Handlers =====
/**
 * Navigate back to Options screen
 * 
 * Why separate function:
 * - Allows for future "Are you sure?" dialogs
 * - Can track navigation analytics
 * - Centralizes back navigation logic
 */
function navigateBack(): void {
  router.push('/options')
}

/**
 * Navigate to specific topic's lesson view
 * 
 * @param topicId - The unique identifier of the selected topic
 * 
 * Future Enhancement:
 * - Check if topic is unlocked (gamification)
 * - Track which topic user clicked
 * - Show loading state for slow connections
 */
function navigateToTopic(topicId: string): void {
  // For now, we'll navigate to a dynamic route
  // Later we'll create the LessonView component
  router.push(`/learn/${topicId}`)
}

// ===== Lifecycle Hooks =====
/**
 * On component mount:
 * 1. Load user's progress from storage (future)
 * 2. Trigger entrance animations
 * 
 * Why 200ms delay:
 * - Gives browser time to render DOM
 * - Creates smooth transition from previous screen
 * - Prevents animation jank on slower devices
 */
onMounted(() => {
  // TODO: Load progress from localStorage
  // const savedProgress = loadProgress()
  // updateTopicProgress(savedProgress)

  // Trigger animations
  setTimeout(() => {
    showContent.value = true
  }, 200)
})
</script>

<style scoped>
/**
 * Custom CSS (Minimal - Tailwind handles most styling)
 * 
 * We only add custom CSS for:
 * - Complex animations not easily done with Tailwind
 * - Browser-specific fixes
 * - Performance optimizations
 */

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Ensure cards are keyboard accessible */
[role='button']:focus {
  outline: 3px solid theme('colors.secondary.DEFAULT');
  outline-offset: 2px;
}

/* Optimize card rendering on mobile */
@media (max-width: 640px) {
  .group {
    /* Enable GPU acceleration for smoother animations on mobile */
    transform: translateZ(0);
    will-change: transform;
  }
}
</style>