<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\views\ProgressView.vue -->
<template>
  <!-- ===== Main Container ===== -->
  <!-- 
    Progress View - Track learning journey
    - Topic completion status
    - Skill Builder stats
    - Timed Challenge high scores
  -->
  <div class="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700">
    
    <!-- ===== Header Section ===== -->
    <header class="sticky top-0 z-20 bg-purple-600/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          
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
            aria-label="Go back to home"
          >
            <i class="fas fa-arrow-left text-xl"></i>
            <span class="hidden sm:inline">Back</span>
          </button>

          <!-- Title -->
          <h1 class="text-xl md:text-2xl font-bold text-white">
            Your Progress 📊
          </h1>

          <!-- Placeholder -->
          <div class="w-12"></div>
        </div>
      </div>
    </header>

    <!-- ===== Main Content Section ===== -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Coming Soon Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div class="mb-6">
          <i class="fas fa-chart-line text-6xl text-purple-500"></i>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Coming Soon! 🚧
        </h2>
        <p class="text-gray-600 text-lg mb-6">
          We're building the Progress tracking page. Check back soon!
        </p>
        <button
          @click="navigateBack"
          class="
            px-8
            py-4
            bg-purple-500
            text-white
            font-bold
            text-lg
            rounded-xl
            shadow-lg
            transition-all
            duration-200
            hover:bg-purple-600
            hover:scale-105
            active:scale-95
          "
        >
          Back to Home
        </button>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { useRouter } from 'vue-router'

// ===== Router Setup =====
const router = useRouter()

// ===== Navigation Handlers =====
/**
 * Navigate back to Home
 */
function navigateBack(): void {
  router.push('/')
}
</script>