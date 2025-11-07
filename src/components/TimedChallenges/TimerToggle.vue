<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\components\TimedChallenges\TimerToggle.vue -->

<!--
  TimerToggle.vue
  Simple toggle switch to choose between analog and digital timer
  
  Features:
  - Clean, touch-friendly design
  - Saves preference to localStorage
  - Accessible with keyboard navigation
  - Mobile-optimized (48px touch targets)
  - Follows Stratonea guidelines for Ghana users
-->

<template>
  <!-- ===== Toggle Container ===== -->
  <div class="timer-toggle-container">
    <!-- Toggle Label -->
    <span class="toggle-label">Timer Style:</span>
    
    <!-- Toggle Buttons -->
    <div class="toggle-buttons" role="radiogroup" aria-label="Timer display style">
      <!-- Digital Button -->
      <button
        type="button"
        :class="['toggle-btn', { active: modelValue === 'digital' }]"
        @click="selectTimer('digital')"
        role="radio"
        :aria-checked="modelValue === 'digital'"
        aria-label="Digital timer"
      >
        <i class="fas fa-digital-tachograph"></i>
        <span class="btn-text">Digital</span>
      </button>
      
      <!-- Analog Button -->
      <button
        type="button"
        :class="['toggle-btn', { active: modelValue === 'analog' }]"
        @click="selectTimer('analog')"
        role="radio"
        :aria-checked="modelValue === 'analog'"
        aria-label="Analog clock"
      >
        <i class="fas fa-clock"></i>
        <span class="btn-text">Analog</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Timer type options
 */
type TimerType = 'digital' | 'analog'

// ===== Props =====
/**
 * Props for TimerToggle
 * @param modelValue - Currently selected timer type ('digital' or 'analog')
 */
interface Props {
  modelValue: TimerType
}

defineProps<Props>()

// ===== Emits =====
/**
 * Emits timer type selection to parent component
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: TimerType): void
}>()

// ===== Methods =====
/**
 * Handle timer type selection
 * - Emits new value to parent
 * - Saves preference to localStorage
 */
function selectTimer(type: TimerType): void {
  emit('update:modelValue', type)
  
  // Save preference to localStorage
  try {
    localStorage.setItem('mathstar_timer_preference', type)
  } catch (error) {
    console.error('Failed to save timer preference:', error)
  }
}
</script>

<style scoped>
/**
 * Timer Toggle Styles
 * - Clean, modern design
 * - Touch-friendly buttons (48px height)
 * - Active state highlighting
 * - Mobile-optimized for Ghana users
 */

/* ===== Container ===== */
.timer-toggle-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

/* ===== Label ===== */
.toggle-label {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  color: #374151; /* Gray-700 */
}

/* ===== Button Group ===== */
.toggle-buttons {
  display: flex;
  gap: 0.5rem;
  background: #F3F4F6; /* Gray-100 */
  padding: 0.25rem;
  border-radius: 0.5rem;
}

/* ===== Individual Buttons ===== */
.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  min-height: 48px; /* Touch-friendly */
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  color: #6B7280; /* Gray-500 */
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Button Icon */
.toggle-btn i {
  font-size: 1.125rem; /* 18px */
}

/* Button Text */
.btn-text {
  display: none; /* Hide on mobile */
}

/* Active State */
.toggle-btn.active {
  background: white;
  color: #1F3A8A; /* Primary color */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Hover State (desktop only) */
@media (hover: hover) {
  .toggle-btn:hover:not(.active) {
    background: rgba(255, 255, 255, 0.5);
    color: #374151; /* Gray-700 */
  }
}

/* Focus State (keyboard navigation) */
.toggle-btn:focus-visible {
  outline: 3px solid #3B82F6;
  outline-offset: 2px;
}

/* Active State Press Effect */
.toggle-btn:active {
  transform: scale(0.98);
}

/* ===== Tablet & Desktop ===== */
@media (min-width: 640px) {
  .btn-text {
    display: inline; /* Show text on larger screens */
  }
  
  .toggle-btn {
    padding: 0.5rem 1.25rem;
  }
}
</style>