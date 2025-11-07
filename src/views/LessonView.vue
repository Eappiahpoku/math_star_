<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\LessonView.vue -->
<template>
  <!-- ===== Main Lesson Container ===== -->
  <!-- 
    Full-screen container for lesson slides
    - Gradient background for brand consistency
    - Mobile-first responsive design
    - Handles loading and error states
  -->
  <div class="min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary flex flex-col">
    
    <!-- ===== Loading State ===== -->
    <!-- 
      Show loading spinner while fetching lesson data
      - Important for slow 3G connections in Ghana
      - Provides clear feedback to users
    -->
    <div 
      v-if="isLoading"
      class="flex-1 flex flex-col items-center justify-center px-4 py-8"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <!-- Animated loading spinner -->
        <div class="flex justify-center mb-4">
          <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Loading Lesson...</h2>
        <p class="text-gray-600">
          {{ isOnline ? 'Please wait while we prepare your lesson.' : 'Loading from saved data...' }}
        </p>
      </div>
    </div>

    <!-- ===== Error State ===== -->
    <!-- 
      Show error message if lesson fails to load
      - Network errors (offline, timeout)
      - Missing lesson files (404)
      - Corrupted data
    -->
    <div 
      v-else-if="error"
      class="flex-1 flex flex-col items-center justify-center px-4 py-8"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <!-- Error icon -->
        <div class="flex justify-center mb-4">
          <div class="bg-red-100 rounded-full p-4">
            <i class="fas fa-exclamation-triangle text-4xl text-red-600"></i>
          </div>
        </div>
        
        <!-- Error message -->
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">
          {{ errorTitle }}
        </h2>
        <p class="text-gray-600 mb-6 text-center">
          {{ errorMessage }}
        </p>

        <!-- Action buttons -->
        <div class="space-y-3">
          <!-- Retry button (for network errors) -->
          <button
            v-if="canRetry"
            @click="retryLoadLesson"
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
              hover:scale-105
              hover:shadow-xl
              active:scale-95
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <i class="fas fa-sync-alt"></i>
            <span>Try Again</span>
          </button>

          <!-- Back to topics button -->
          <button
            @click="navigateBack"
            class="
              w-full
              min-h-[56px]
              bg-gray-200
              text-gray-800
              font-bold
              text-lg
              rounded-xl
              shadow-lg
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-xl
              active:scale-95
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <i class="fas fa-arrow-left"></i>
            <span>Back to Topics</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== Lesson Content (When Loaded Successfully) ===== -->
    <template v-else>
      
      <!-- ===== Header Section ===== -->
      <!-- 
        Fixed header with navigation and progress
        - Back button to return to topic list
        - Topic title display
        - Progress indicator (current slide / total slides)
      -->
      <header class="sticky top-0 z-20 bg-primary/95 backdrop-blur-sm shadow-lg">
        <div class="max-w-4xl mx-auto px-4 py-4">
          
          <!-- Top Row: Back button and Title -->
          <div class="flex items-center justify-between mb-3">
            
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
              aria-label="Go back to topic selection"
            >
              <i class="fas fa-arrow-left text-xl"></i>
              <span class="hidden sm:inline">Back</span>
            </button>

            <!-- Topic Title -->
            <h1 class="text-xl md:text-2xl font-bold text-white text-center flex-1 px-4">
              {{ topicTitle }}
            </h1>

            <!-- Progress Text -->
            <div class="text-white font-medium text-sm md:text-base min-w-[60px] text-right">
              {{ currentSlideIndex + 1 }} / {{ totalSlides }}
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              class="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
              :style="{ width: progressPercentage + '%' }"
              role="progressbar"
              :aria-valuenow="progressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

        </div>
      </header>

      <!-- ===== Main Content Section ===== -->
      <!-- 
        Scrollable slide content area
        - Flexible height to accommodate content
        - Centered on page
      -->
      <main class="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        
        <!-- ===== Slide Container ===== -->
        <!-- 
          Card-style container for slide content
          - White background for readability
          - Shadow for depth
          - Rounded corners for modern look
          - Max width for readability on large screens
        -->
        <div 
          class="
            w-full 
            max-w-3xl 
            bg-white 
            rounded-2xl 
            shadow-2xl 
            overflow-hidden
            transition-all
            duration-500
            ease-out
          "
          :class="showSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
        >
          
          <!-- ===== Slide Content ===== -->
          <!-- 
            Dynamic content based on current slide
            - Uses v-html for rich content (titles, paragraphs, lists)
            - Padding for comfortable reading
          -->
          <div class="p-6 md:p-8 space-y-6">
            
            <!-- Slide Title -->
            <h2 
              class="text-2xl md:text-3xl font-bold text-primary mb-4"
              v-if="currentSlide?.title"
            >
              {{ currentSlide.title }}
            </h2>

            <!-- Slide Content -->
            <div 
              class="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              v-html="currentSlide?.content"
            ></div>

            <!-- Slide Image (if present) -->
            <div 
              v-if="currentSlide?.image"
              class="flex justify-center my-6"
            >
              <img 
                :src="currentSlide.image"
                :alt="currentSlide.imageAlt || 'Lesson illustration'"
                class="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            <!-- Example Section (if present) -->
            <div 
              v-if="currentSlide?.example"
              class="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg"
            >
              <h3 class="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                <i class="fas fa-lightbulb text-secondary"></i>
                Example:
              </h3>
              <div 
                class="text-gray-700"
                v-html="currentSlide.example"
              ></div>
            </div>

            <!-- Practice Tip (if present) -->
            <div 
              v-if="currentSlide?.tip"
              class="bg-green-50 border-l-4 border-success p-4 rounded-r-lg"
            >
              <h3 class="text-lg font-semibold text-success mb-2 flex items-center gap-2">
                <i class="fas fa-star text-secondary"></i>
                Pro Tip:
              </h3>
              <p class="text-gray-700">{{ currentSlide.tip }}</p>
            </div>

          </div>

        </div>

      </main>

      <!-- ===== Navigation Footer ===== -->
      <!-- 
        Fixed footer with Previous/Next buttons
        - Large touch targets (minimum 48px)
        - Clear visual feedback
        - Disabled states when at start/end
      -->
      <footer class="sticky bottom-0 bg-primary/95 backdrop-blur-sm shadow-lg">
        <div class="max-w-4xl mx-auto px-4 py-4">
          
          <div class="flex items-center justify-between gap-4">
            
            <!-- Previous Button -->
            <button
              @click="previousSlide"
              :disabled="isFirstSlide"
              class="
                flex-1
                max-w-[200px]
                min-h-[56px]
                bg-white
                text-primary
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:scale-105
                hover:shadow-xl
                active:scale-95
                disabled:opacity-40
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Go to previous slide"
            >
              <i class="fas fa-chevron-left"></i>
              <span>Previous</span>
            </button>

            <!-- Slide Counter (Mobile) -->
            <div class="flex items-center gap-2 text-white font-medium sm:hidden">
              <span class="text-2xl">{{ currentSlideIndex + 1 }}</span>
              <span class="text-white/60">/</span>
              <span class="text-white/80">{{ totalSlides }}</span>
            </div>

            <!-- Next Button / Finish Button -->
            <button
              v-if="!isLastSlide"
              @click="nextSlide"
              class="
                flex-1
                max-w-[200px]
                min-h-[56px]
                bg-secondary
                text-white
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:scale-105
                hover:shadow-xl
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Go to next slide"
            >
              <span>Next</span>
              <i class="fas fa-chevron-right"></i>
            </button>

            <!-- Finish Button (Last Slide) -->
            <button
              v-else
              @click="finishLesson"
              class="
                flex-1
                max-w-[200px]
                min-h-[56px]
                bg-success
                text-white
                font-bold
                text-lg
                rounded-xl
                shadow-lg
                transition-all
                duration-200
                hover:scale-105
                hover:shadow-xl
                active:scale-95
                flex
                items-center
                justify-center
                gap-2
              "
              aria-label="Finish lesson"
            >
              <span>Finish</span>
              <i class="fas fa-check-circle"></i>
            </button>

          </div>

        </div>
      </footer>

    </template>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * Slide interface defines the structure of each lesson slide
 * 
 * @property title - Slide heading
 * @property content - Main content (HTML string for rich formatting)
 * @property image - Optional image URL
 * @property imageAlt - Alt text for accessibility
 * @property example - Optional example section (HTML string)
 * @property tip - Optional practice tip (plain text)
 * 
 * Why HTML content:
 * - Allows rich formatting (bold, lists, etc.)
 * - Easy to create from JSON
 * - Flexible for different content types
 */
interface Slide {
  title: string
  content: string
  image?: string
  imageAlt?: string
  example?: string
  tip?: string
}

/**
 * Lesson data structure
 * Contains all slides for a specific topic
 * Must match the structure in public/lessons/*.json files
 */
interface LessonData {
  topicId: string
  topicTitle: string
  slides: Slide[]
}

/**
 * Error types for different failure scenarios
 * Helps provide appropriate user messages and retry logic
 */
type ErrorType = 'network' | 'not-found' | 'parse-error' | 'unknown'

// ===== Router Setup =====
const router = useRouter()
const route = useRoute()

// ===== State Management =====
/**
 * Current slide index (0-based)
 * Tracks which slide the user is viewing
 */
const currentSlideIndex = ref(0)

/**
 * Controls slide animation visibility
 * Used for smooth fade-in transitions
 */
const showSlide = ref(false)

/**
 * Loading state
 * True while fetching lesson data from JSON file
 */
const isLoading = ref(true)

/**
 * Error state
 * Stores error information if lesson fails to load
 */
const error = ref<ErrorType | null>(null)

/**
 * Network status
 * Tracks if user is online (affects error messages)
 */
const isOnline = ref(navigator.onLine)

/**
 * Lesson data containing all slides
 * Loaded from public/lessons/{topicId}.json
 */
const lessonData = ref<LessonData>({
  topicId: '',
  topicTitle: '',
  slides: []
})

// ===== Computed Properties =====
/**
 * Get topic title from lesson data
 */
const topicTitle = computed(() => lessonData.value.topicTitle)

/**
 * Get total number of slides
 */
const totalSlides = computed(() => lessonData.value.slides.length)

/**
 * Get current slide object
 */
const currentSlide = computed(() => lessonData.value.slides[currentSlideIndex.value])

/**
 * Calculate progress percentage for progress bar
 */
const progressPercentage = computed(() => {
  if (totalSlides.value === 0) return 0
  return Math.round(((currentSlideIndex.value + 1) / totalSlides.value) * 100)
})

/**
 * Check if we're on the first slide
 */
const isFirstSlide = computed(() => currentSlideIndex.value === 0)

/**
 * Check if we're on the last slide
 */
const isLastSlide = computed(() => currentSlideIndex.value === totalSlides.value - 1)

/**
 * Get user-friendly error title based on error type
 */
const errorTitle = computed(() => {
  switch (error.value) {
    case 'network':
      return isOnline.value ? 'Connection Problem' : 'You\'re Offline'
    case 'not-found':
      return 'Lesson Not Available'
    case 'parse-error':
      return 'Lesson Data Error'
    default:
      return 'Something Went Wrong'
  }
})

/**
 * Get user-friendly error message with recovery steps
 * Messages are simple and appropriate for varying digital literacy levels
 */
const errorMessage = computed(() => {
  switch (error.value) {
    case 'network':
      return isOnline.value
        ? 'We couldn\'t load the lesson. Please check your internet connection and try again.'
        : 'This lesson needs an internet connection to load. Please connect to the internet and try again.'
    case 'not-found':
      return 'This lesson is not available yet. Please choose a different topic or check back later.'
    case 'parse-error':
      return 'There was a problem loading this lesson. Please try again or contact support if the problem continues.'
    default:
      return 'An unexpected error occurred. Please try again.'
  }
})

/**
 * Determine if retry button should be shown
 * Only show retry for temporary errors (network, parse)
 * Don't show for permanent errors (not-found)
 */
const canRetry = computed(() => {
  return error.value === 'network' || error.value === 'parse-error'
})

// ===== Helper Functions =====
/**
 * Load lesson data from JSON file
 * 
 * File location: public/lessons/{topicId}.json
 * 
 * Error handling:
 * - Network errors (timeout, no connection)
 * - 404 errors (lesson file not found)
 * - Parse errors (corrupted JSON)
 * - Unknown errors
 * 
 * @param topicId - The topic identifier (e.g., 'addition', 'fractions')
 */
async function loadLessonData(topicId: string): Promise<void> {
  // Reset state
  isLoading.value = true
  error.value = null
  showSlide.value = false

  try {
    // Construct URL to JSON file in public folder
    // Vite automatically serves files from public/ at root path
    const url = `/lessons/${topicId}.json`

    // Fetch lesson data with timeout for slow connections
    // Using AbortController to implement timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      // Add cache control for better offline support
      cache: 'default'
    })

    clearTimeout(timeoutId)

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        // Lesson file not found
        error.value = 'not-found'
      } else {
        // Other HTTP errors (500, etc.)
        error.value = 'network'
      }
      return
    }

    // Parse JSON response
    const data: LessonData = await response.json()

    // Validate lesson data structure
    if (!data.topicId || !data.topicTitle || !Array.isArray(data.slides)) {
      console.error('Invalid lesson data structure:', data)
      error.value = 'parse-error'
      return
    }

    // Validate that we have at least one slide
    if (data.slides.length === 0) {
      console.error('Lesson has no slides:', data)
      error.value = 'parse-error'
      return
    }

    // Success! Store the lesson data
    lessonData.value = data
    isLoading.value = false

    // Show first slide after brief delay (for smooth animation)
    setTimeout(() => {
      showSlide.value = true
    }, 200)

  } catch (err) {
    // Handle different error types
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      // Network error (offline, DNS failure, etc.)
      error.value = 'network'
    } else if (err instanceof SyntaxError) {
      // JSON parse error (corrupted file)
      error.value = 'parse-error'
    } else if (err instanceof Error && err.name === 'AbortError') {
      // Request timeout
      error.value = 'network'
    } else {
      // Unknown error
      console.error('Unexpected error loading lesson:', err)
      error.value = 'unknown'
    }
  } finally {
    // Always stop loading spinner
    isLoading.value = false
  }
}

/**
 * Retry loading the lesson
 * Called when user clicks "Try Again" button
 */
function retryLoadLesson(): void {
  const topicId = route.params.topicId as string
  loadLessonData(topicId)
}

// ===== Navigation Handlers =====
/**
 * Navigate back to topic selection (LearnView)
 */
function navigateBack(): void {
  router.push('/learn')
}

/**
 * Go to previous slide
 * - Animates slide transition
 * - Scrolls to top of page
 */
function previousSlide(): void {
  if (!isFirstSlide.value) {
    // Fade out current slide
    showSlide.value = false
    
    // Wait for fade-out animation, then change slide
    setTimeout(() => {
      currentSlideIndex.value--
      // Scroll to top for mobile users
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Fade in new slide
      setTimeout(() => {
        showSlide.value = true
      }, 50)
    }, 300)
  }
}

/**
 * Go to next slide
 * - Animates slide transition
 * - Scrolls to top of page
 */
function nextSlide(): void {
  if (!isLastSlide.value) {
    // Fade out current slide
    showSlide.value = false
    
    // Wait for fade-out animation, then change slide
    setTimeout(() => {
      currentSlideIndex.value++
      // Scroll to top for mobile users
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Fade in new slide
      setTimeout(() => {
        showSlide.value = true
      }, 50)
    }, 300)
  }
}

/**
 * Handle lesson completion
 * 
 * Future enhancements:
 * - Save progress to localStorage
 * - Show completion certificate/badge
 * - Update user's topic progress
 * - Track completed lessons
 */
function finishLesson(): void {
  // TODO: Save lesson completion
  // saveProgress(lessonData.value.topicId, 100)
  
  // Show success message
  alert('🎉 Congratulations! You completed this lesson!')
  
  // Navigate back to topic list
  router.push('/learn')
}

// ===== Network Status Monitoring =====
/**
 * Listen for online/offline events
 * Updates isOnline state to show appropriate error messages
 */
function setupNetworkListeners(): void {
  window.addEventListener('online', () => {
    isOnline.value = true
    // If there was a network error, automatically retry
    if (error.value === 'network') {
      retryLoadLesson()
    }
  })

  window.addEventListener('offline', () => {
    isOnline.value = false
  })
}

// ===== Lifecycle Hooks =====
/**
 * When component mounts:
 * 1. Setup network listeners
 * 2. Get topicId from route params
 * 3. Load lesson data from JSON file
 */
onMounted(() => {
  // Setup network status monitoring
  setupNetworkListeners()

  // Get topicId from URL (e.g., /learn/addition)
  const topicId = route.params.topicId as string
  
  // Load lesson content from JSON file
  loadLessonData(topicId)
})

/**
 * Watch for route changes
 * If user navigates to different topic, reload lesson data
 */
watch(() => route.params.topicId, (newTopicId) => {
  if (newTopicId) {
    currentSlideIndex.value = 0
    loadLessonData(newTopicId as string)
  }
})
</script>

<style scoped>
/**
 * Custom styles for lesson content
 * 
 * Note: Most styling uses Tailwind utilities
 * Only add custom CSS for:
 * - Complex animations
 * - Prose styling (rich text content)
 * - Browser-specific fixes
 */

/* ===== Prose Styling ===== */
/* Ensure rich text content is readable and well-formatted */

.prose :deep(p) {
  @apply mb-4;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply ml-6 mb-4;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(strong) {
  @apply font-bold text-primary;
}

.prose :deep(pre) {
  @apply bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm;
}

.prose :deep(code) {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm;
}

/* ===== Loading Animation ===== */
/* Smooth spin animation for loading spinner */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ===== Smooth Scrolling ===== */
html {
  scroll-behavior: smooth;
}

/* ===== Touch Device Optimizations ===== */
@media (max-width: 640px) {
  /* Ensure touch targets are large enough (Ghana mobile-first) */
  button {
    min-height: 48px;
    min-width: 48px;
  }
}
</style>