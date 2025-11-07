<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\HomeView.vue -->
<template>
  <!-- ===== Main Splash Container ===== -->
  <!-- 
    Full-screen container with gradient background
    - Uses flexbox to center content vertically and horizontally
    - min-h-screen ensures it covers the entire viewport
  -->
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary overflow-hidden">
    
    <!-- ===== Animated Content Wrapper ===== -->
    <div class="text-center space-y-8 px-4">
      
      <!-- ===== Star Icon Animation ===== -->
      <!-- 
        Three stars that fade in and scale up
        - Uses transition-all for smooth animation
        - Conditional opacity and scale based on showContent state
      -->
      <div 
        class="flex justify-center items-center gap-4 transition-all duration-1000 ease-out"
        :class="showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
      >
        <i class="fas fa-star text-secondary text-4xl md:text-5xl"></i>
        <i class="fas fa-star text-secondary text-5xl md:text-6xl"></i>
        <i class="fas fa-star text-secondary text-4xl md:text-5xl"></i>
      </div>

      <!-- ===== App Name (MATHSTAR) ===== -->
      <!-- 
        Main title that fades in after stars
        - Delays appearance by 500ms using delay-500
        - Large, bold text optimized for readability
      -->
      <h1 
        class="text-6xl md:text-8xl font-bold text-white tracking-wider transition-all duration-1000 ease-out delay-500"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        MATHSTAR
      </h1>

      <!-- ===== Slogan ===== -->
      <!-- 
        Tagline that appears last
        - Delays appearance by 1000ms (1 second)
        - Subtle color using text-secondary for contrast
      -->
      <p 
        class="text-2xl md:text-3xl text-secondary font-medium tracking-wide transition-all duration-1000 ease-out delay-1000"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        Level up your genius
      </p>

      <!-- ===== Loading Spinner ===== -->
      <!-- 
        Animated spinner that appears after slogan
        - Shows user that transition is happening
        - Only visible after all text animations complete
      -->
      <div 
        class="flex justify-center mt-12 transition-all duration-500 delay-[1500ms]"
        :class="showContent ? 'opacity-100' : 'opacity-0'"
      >
        <!-- Spinning circle animation -->
        <div class="w-12 h-12 border-4 border-white border-t-secondary rounded-full animate-spin"></div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====
/**
 * Controls the visibility of animated content
 * - Starts as false (content hidden)
 * - Set to true after component mounts to trigger animations
 */
const showContent = ref(false)

// ===== Main Logic =====
/**
 * Lifecycle: When component is mounted to the DOM
 * 1. Wait 100ms, then show content (triggers fade-in animations)
 * 2. Wait 3 seconds total, then navigate to Options screen
 */
onMounted(() => {
  // Step 1: Trigger animations after brief delay
  // (Ensures smooth initial render)
  setTimeout(() => {
    showContent.value = true
  }, 100)

  // Step 2: Auto-navigate to Options after 3 seconds
  // This gives users time to see the full animation sequence:
  // - Stars appear (0-1s)
  // - Title appears (0.5-1.5s)
  // - Slogan appears (1-2s)
  // - Spinner appears (1.5-2s)
  // - Navigate at 3s
  setTimeout(() => {
    router.push('/options')
  }, 3000)
})
</script>

<style scoped>
/* ===== Custom Animations ===== */
/**
 * Spin animation for loading spinner
 * Rotates 360 degrees continuously
 */
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
</style>