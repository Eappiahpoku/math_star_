<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\components\TimedChallenges\DigitalTimer.vue -->

<!--
  DigitalTimer.vue
  Compact digital countdown timer for Timed Challenge
  
  Features:
  - Large, readable numbers
  - Color-coded urgency (green → yellow → red)
  - Monospace font (no jitter)
  - Accessible with screen reader support
  - Offline-capable
  - Follows Stratonea guidelines for Ghana users
-->

<template>
  <!-- ===== Digital Timer Container ===== -->
  <div class="digital-timer-container">
    <!-- Main Timer Display -->
    <time
      :datetime="`PT${timeRemaining}S`"
      :class="['digital-timer', urgencyClass]"
      role="timer"
      :aria-label="ariaLabel"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ displayTime }}
    </time>
    
    <!-- Urgency Indicator Text -->
    <div v-if="urgencyLevel !== 'safe'" :class="['urgency-text', urgencyClass]">
      {{ urgencyMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { computed } from 'vue'

// ===== Props =====
/**
 * Props for DigitalTimer
 * @param timeRemaining - Seconds remaining (e.g., 180 for 3 minutes)
 */
interface Props {
  timeRemaining: number
}

const props = defineProps<Props>()

// ===== Computed Properties =====

/**
 * Format time as MM:SS
 * Example: 125 seconds → "02:05"
 */
const displayTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = Math.floor(props.timeRemaining % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

/**
 * Determine urgency level based on time remaining
 * - safe: > 60 seconds (green)
 * - warning: 30-60 seconds (yellow)
 * - critical: < 30 seconds (red)
 */
const urgencyLevel = computed(() => {
  if (props.timeRemaining > 60) return 'safe'
  if (props.timeRemaining > 30) return 'warning'
  return 'critical'
})

/**
 * CSS class for urgency-based styling
 */
const urgencyClass = computed(() => `urgency-${urgencyLevel.value}`)

/**
 * Urgency message displayed below timer
 */
const urgencyMessage = computed(() => {
  if (urgencyLevel.value === 'warning') return 'Time running low! ⚡'
  if (urgencyLevel.value === 'critical') return 'Hurry up! 🔥'
  return ''
})

/**
 * Accessible label for screen readers
 */
const ariaLabel = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = Math.floor(props.timeRemaining % 60)
  return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''} remaining`
})
</script>

<style scoped>
/**
 * Digital Timer Styles
 * - Large, bold numbers
 * - Color-coded urgency states
 * - Monospace font (no jitter)
 * - Mobile-optimized for Ghana users
 */

/* ===== Container ===== */
.digital-timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* ===== Main Timer Display ===== */
.digital-timer {
  font-size: 3rem; /* 48px */
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* Monospace numbers (prevents jitter) */
  line-height: 1;
  transition: color 0.3s ease, transform 0.3s ease;
}

/* Urgency-based colors */
.digital-timer.urgency-safe {
  color: #10B981; /* Green */
}

.digital-timer.urgency-warning {
  color: #F59E0B; /* Yellow */
}

.digital-timer.urgency-critical {
  color: #EF4444; /* Red */
  animation: pulse-scale 1s ease-in-out infinite;
}

/* Pulse animation for critical state */
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* ===== Urgency Message ===== */
.urgency-text {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  transition: color 0.3s ease;
}

.urgency-text.urgency-warning {
  color: #F59E0B; /* Yellow */
}

.urgency-text.urgency-critical {
  color: #EF4444; /* Red */
  animation: pulse-text 1s ease-in-out infinite;
}

/* Pulse animation for critical text */
@keyframes pulse-text {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* ===== Mobile Optimizations ===== */
@media (max-width: 640px) {
  .digital-timer {
    font-size: 2.5rem; /* 40px on small phones */
  }
  
  .urgency-text {
    font-size: 0.75rem; /* 12px */
  }
}

/* ===== Tablet & Desktop ===== */
@media (min-width: 768px) {
  .digital-timer {
    font-size: 3.5rem; /* 56px on larger screens */
  }
}
</style>