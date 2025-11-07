<!--
  MathStarLogo.vue
  The official MathStar logo component featuring a star icon.
  Used throughout the app for branding consistency.
  
  Props:
  - white: boolean (optional) - Use white color for dark backgrounds
  - size: string (optional) - Size class for the logo (default: 'w-10 h-10')
-->

<template>
  <div class="mathstar-logo">
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      :class="[sizeClass, white ? 'text-white' : 'text-primary']"
    >
      <!-- Outer circle representing knowledge -->
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      />
      
      <!-- Star representing achievement and excellence -->
      <path
        d="M24 8 L27 18 L38 18 L29 25 L32 36 L24 29 L16 36 L19 25 L10 18 L21 18 Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1"
        stroke-linejoin="round"
      />
      
      <!-- Inner sparkle for "genius" effect -->
      <circle cx="24" cy="20" r="1.5" fill="currentColor" />
      <circle cx="20" cy="24" r="1" fill="currentColor" />
      <circle cx="28" cy="24" r="1" fill="currentColor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
interface Props {
  white?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// ===== Props with Defaults =====
const props = withDefaults(defineProps<Props>(), {
  white: false,
  size: 'md'
})

// ===== Computed Properties =====
const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }
  return sizes[props.size]
})
</script>

<style scoped>
.mathstar-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Add subtle animation on hover */
.mathstar-logo:hover svg {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
