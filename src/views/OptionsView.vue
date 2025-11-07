<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\OptionsView.vue -->
<template>
  <!-- ===== Main Options Container ===== -->
  <!-- 
    Full-screen container with gradient background matching splash screen
    - Mobile-first design with centered content
    - Optimized for touch interactions (Ghana mobile users)
  -->
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary">
    
    <!-- ===== Header Section ===== -->
    <!-- 
      Displays app branding at the top
      - Uses MathStarLogo component
      - Positioned with padding for mobile comfort
    -->
    <header class="flex flex-col items-center justify-center pt-8 pb-4 px-4">
      <!-- MathStar Logo (white variant for dark background) -->
      <MathStarLogo size="lg" white class="mb-4" />
      
      <!-- App Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-white tracking-wide">
        MATHSTAR
      </h1>
      
      <!-- Slogan -->
      <p class="text-lg md:text-xl text-secondary font-medium mt-2">
        Level up your genius
      </p>
    </header>

    <!-- ===== Main Content Section ===== -->
    <!-- 
      Contains the three navigation buttons
      - Flex-grow ensures it takes remaining space
      - Centers buttons vertically and horizontally
    -->
    <main class="flex-grow flex items-center justify-center px-4 pb-8">
      
      <!-- ===== Button Container ===== -->
      <!-- 
        Grid layout for buttons
        - Single column on mobile (stacked)
        - Generous spacing for touch targets
        - Animations fade in from bottom
      -->
      <div 
        class="w-full max-w-md space-y-6 transition-all duration-1000 ease-out"
        :class="showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        
        <!-- ===== LEARN Button ===== -->
        <!-- 
          Primary action button
          - Large touch target (min 48px height, actually using 64px for comfort)
          - High contrast for outdoor visibility
          - Clear icon and text for varying digital literacy
        -->
        <button
          @click="navigateTo('/learn')"
          class="
            w-full
            min-h-[4rem]
            bg-white
            text-primary
            rounded-2xl
            shadow-2xl
            font-bold
            text-2xl
            tracking-wide
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
            active:scale-95
            flex
            items-center
            justify-center
            gap-4
            group
          "
          aria-label="Go to Learn Mode"
        >
          <!-- Book Icon -->
          <i 
            class="fas fa-book text-3xl text-primary transition-transform duration-300 group-hover:rotate-12"
          ></i>
          
          <!-- Button Text -->
          <span>LEARN</span>
        </button>

        <!-- ===== PLAY Button ===== -->
        <!-- 
          Secondary action button
          - Same size as Learn for consistency
          - Different color to distinguish modes
          - Game controller icon for clarity
        -->
        <button
          @click="navigateTo('/play')"
          class="
            w-full
            min-h-[4rem]
            bg-secondary
            text-white
            rounded-2xl
            shadow-2xl
            font-bold
            text-2xl
            tracking-wide
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_20px_60px_rgba(253,126,20,0.5)]
            active:scale-95
            flex
            items-center
            justify-center
            gap-4
            group
          "
          aria-label="Go to Play Mode"
        >
          <!-- Game Controller Icon -->
          <i 
            class="fas fa-gamepad text-3xl transition-transform duration-300 group-hover:rotate-12"
          ></i>
          
          <!-- Button Text -->
          <span>PLAY</span>
        </button>

        <!-- ===== SETTINGS Button ===== -->
        <!-- 
          Tertiary action button
          - Slightly smaller emphasis (but still touch-friendly)
          - Outlined style to differentiate from primary actions
          - Gear icon for settings convention
        -->
        <button
          @click="navigateTo('/settings')"
          class="
            w-full
            min-h-[3.5rem]
            bg-transparent
            border-4
            border-white
            text-white
            rounded-2xl
            shadow-xl
            font-bold
            text-xl
            tracking-wide
            transition-all
            duration-300
            hover:bg-white
            hover:text-primary
            hover:scale-105
            active:scale-95
            flex
            items-center
            justify-center
            gap-3
            group
          "
          aria-label="Go to Settings"
        >
          <!-- Settings Gear Icon -->
          <i 
            class="fas fa-cog text-2xl transition-transform duration-300 group-hover:rotate-90"
          ></i>
          
          <!-- Button Text -->
          <span>SETTINGS</span>
        </button>

      </div>
    </main>

    <!-- ===== Footer Section ===== -->
    <!-- 
      Optional footer with app version or credits
      - Small text at bottom
      - Semi-transparent for subtle appearance
    -->
    <footer class="text-center pb-6 px-4">
      
    </footer>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MathStarLogo from '@/components/base/MathStarLogo.vue'

// ===== Router Setup =====
const router = useRouter()

// ===== State Management =====
/**
 * Controls button animation visibility
 * - Starts as false (buttons hidden)
 * - Set to true after mount to trigger fade-in animation
 * This creates a smooth transition from splash screen
 */
const showButtons = ref(false)

// ===== Navigation Handler =====
/**
 * Handles navigation to different app sections
 * @param path - The route path to navigate to
 * 
 * Why separate function:
 * - Allows for future analytics tracking
 * - Can add loading states if needed
 * - Centralizes navigation logic for maintenance
 */
function navigateTo(path: string): void {
  router.push(path)
}

// ===== Lifecycle Hooks =====
/**
 * When component is mounted:
 * 1. Wait 200ms for smooth transition from splash
 * 2. Show buttons with fade-in animation
 * 
 * The delay ensures the user sees the page load smoothly
 * rather than everything appearing instantly
 */
onMounted(() => {
  setTimeout(() => {
    showButtons.value = true
  }, 200)
})
</script>

<style scoped>
/**
 * No custom styles needed!
 * Everything is handled by Tailwind utility classes
 * This follows the Stratonea guideline: "Always use Tailwind CSS utility classes"
 * 
 * Benefits:
 * - Easier to maintain (all styles in template)
 * - Better for mobile-first workflow
 * - Clearer for learning purposes
 */
</style>