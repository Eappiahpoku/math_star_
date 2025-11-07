<!-- filepath: c:\Users\Edward Appiah Poku\Documents\development\math_star_v2\src\components\TimedChallenges\AnalogClock.vue -->

<!--
  AnalogClock.vue
  Compact SVG-based analog clock for Timed Challenge
  
  Features:
  - 120px × 120px (mobile-optimized size)
  - Smooth rotating hand
  - Color-coded urgency (green → yellow → red)
  - Lightweight SVG (no external dependencies)
  - Offline-capable
  - Follows Stratonea guidelines for Ghana users
-->

<template>
  <!-- ===== Clock Container ===== -->
  <div class="analog-clock-container">
    <!-- SVG Clock Face -->
    <svg
      viewBox="0 0 120 120"
      class="analog-clock"
      role="img"
      :aria-label="ariaLabel"
    >
      <!-- ===== Clock Background Circle ===== -->
      <circle
        cx="60"
        cy="60"
        r="55"
        :class="[
          'clock-bg',
          urgencyClass
        ]"
      />
      
      <!-- ===== Tick Marks (12, 3, 6, 9) ===== -->
      <!-- 12 o'clock -->
      <line x1="60" y1="10" x2="60" y2="18" class="tick-mark" />
      <!-- 3 o'clock -->
      <line x1="110" y1="60" x2="102" y2="60" class="tick-mark" />
      <!-- 6 o'clock -->
      <line x1="60" y1="110" x2="60" y2="102" class="tick-mark" />
      <!-- 9 o'clock -->
      <line x1="10" y1="60" x2="18" y2="60" class="tick-mark" />
      
      <!-- ===== Center Dot ===== -->
      <circle cx="60" cy="60" r="3" class="center-dot" />
      
      <!-- ===== Rotating Hand ===== -->
      <line
        x1="60"
        y1="60"
        x2="60"
        y2="20"
        :class="['clock-hand', urgencyClass]"
        :style="{ transform: `rotate(${rotation}deg)`, transformOrigin: '60px 60px' }"
      />
    </svg>
    
    <!-- ===== Time Remaining Text (Below Clock) ===== -->
    <div class="time-text" :class="urgencyClass">
      {{ displayTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { computed } from 'vue'

// ===== Props =====
/**
 * Props for AnalogClock
 * @param timeRemaining - Seconds remaining (e.g., 180 for 3 minutes)
 * @param timeLimit - Total time limit in seconds (e.g., 180, 300)
 */
interface Props {
  timeRemaining: number
  timeLimit: number
}

const props = defineProps<Props>()

// ===== Computed Properties =====

/**
 * Calculate rotation angle for clock hand
 * 0° = 12 o'clock (top)
 * Rotates clockwise as time runs out
 */
const rotation = computed(() => {
  const percentage = props.timeRemaining / props.timeLimit
  // Start at 0° (top), rotate to 360° (full circle)
  return 360 * (1 - percentage)
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
 * Format time as MM:SS
 * Example: 125 seconds → "02:05"
 */
const displayTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = Math.floor(props.timeRemaining % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
 * Analog Clock Styles
 * - Compact size (120px × 120px)
 * - Color-coded urgency states
 * - Smooth animations
 * - Mobile-optimized for Ghana users
 */

/* ===== Container ===== */
.analog-clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* ===== SVG Clock ===== */
.analog-clock {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* ===== Clock Background ===== */
.clock-bg {
  fill: white;
  stroke-width: 3;
  transition: stroke 0.3s ease;
}

/* Urgency-based border colors */
.clock-bg.urgency-safe {
  stroke: #10B981; /* Green - safe */
}

.clock-bg.urgency-warning {
  stroke: #F59E0B; /* Yellow - warning */
}

.clock-bg.urgency-critical {
  stroke: #EF4444; /* Red - critical */
  animation: pulse-border 1s ease-in-out infinite;
}

/* Pulse animation for critical state */
@keyframes pulse-border {
  0%, 100% {
    stroke-width: 3;
    opacity: 1;
  }
  50% {
    stroke-width: 5;
    opacity: 0.8;
  }
}

/* ===== Tick Marks ===== */
.tick-mark {
  stroke: #6B7280; /* Gray-500 */
  stroke-width: 2;
  stroke-linecap: round;
}

/* ===== Center Dot ===== */
.center-dot {
  fill: #374151; /* Gray-700 */
}

/* ===== Clock Hand ===== */
.clock-hand {
  stroke-width: 3;
  stroke-linecap: round;
  transition: transform 0.3s ease-out, stroke 0.3s ease;
}

/* Urgency-based hand colors */
.clock-hand.urgency-safe {
  stroke: #10B981; /* Green */
}

.clock-hand.urgency-warning {
  stroke: #F59E0B; /* Yellow */
}

.clock-hand.urgency-critical {
  stroke: #EF4444; /* Red */
}

/* ===== Time Text Below Clock ===== */
.time-text {
  font-size: 1.25rem; /* 20px */
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* Monospace numbers (no jitter) */
  transition: color 0.3s ease;
}

/* Urgency-based text colors */
.time-text.urgency-safe {
  color: #10B981; /* Green */
}

.time-text.urgency-warning {
  color: #F59E0B; /* Yellow */
}

.time-text.urgency-critical {
  color: #EF4444; /* Red */
  animation: pulse-text 1s ease-in-out infinite;
}

/* Pulse animation for critical text */
@keyframes pulse-text {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* ===== Mobile Optimizations ===== */
@media (max-width: 640px) {
  /* Slightly smaller on very small phones */
  .analog-clock {
    width: 100px;
    height: 100px;
  }
  
  .time-text {
    font-size: 1.125rem; /* 18px */
  }
}
</style>