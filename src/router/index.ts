// ===== Imports =====
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// ===== Route Definitions =====
/**
 * Application routes for MathStar
 * 
 * Route Structure:
 * - / (Home - Options Menu)
 * - /learn (Topic Selection)
 * - /learn/:topicId (Lesson View)
 * - /play (Play Mode Menu)
 * - /play/skill-builder (Skill Builder Game)
 * - /play/timed-challenge (Timed Challenge Game)
 * - /settings (App Settings)
 * - /progress (User Progress Dashboard)
 * 
 * All routes use lazy loading for optimal performance on slow connections
 */
const routes: RouteRecordRaw[] = [
  // ===== Home Route =====
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'MathStar - Learn Math the Fun Way!',
      requiresAuth: false
    }
  },
 {
    path: '/options',
    name: 'options',
    component: () => import('../views/OptionsView.vue'),
    meta: {
      title: 'MathStar - Choose Your Path',
      description: 'Select Learn, Play, or Settings mode',
      requiresAuth: false
    }
  },
  // ===== Learn Mode Routes =====
  {
    path: '/learn',
    name: 'learn',
    component: () => import('../views/LearnView.vue'),
    meta: {
      title: 'Learn - MathStar',
      requiresAuth: false
    }
  },
  {
    path: '/learn/:topicId',
    name: 'lesson',
    component: () => import('../views/LessonView.vue'),
    meta: {
      title: 'Lesson - MathStar',
      requiresAuth: false
    },
    // Route validation - ensure topicId is valid
    beforeEnter: (to, _from, next) => {
      const validTopics = [
        'addition',
        'subtraction',
        'multiplication',
        'division',
        'fractions',
        'decimals',
        'algebra-basics',
        'geometry'
      ]
      
      const topicId = to.params.topicId as string
      
      if (validTopics.includes(topicId)) {
        next()
      } else {
        // Invalid topic - redirect to learn page
        console.warn(`Invalid topic ID: ${topicId}`)
        next('/learn')
      }
    }
  },

  // ===== Play Mode Routes START ===== 
  /**
   * Play Mode Routes
   * 
   * /play - Main Play Mode menu (choose between Skill Builder and Timed Challenge)
   * /play/skill-builder - Practice mode with no time pressure
   * /play/timed-challenge - Competitive mode with timer
   * 
   * All three routes are lazy-loaded to reduce initial bundle size
   * Particularly important for Ghana's bandwidth constraints
   */
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/PlayView.vue'),
    meta: {
      title: 'Play & Practice - MathStar',
      description: 'Choose between Skill Builder and Timed Challenge modes',
      requiresAuth: false
    }
  },
  {
    path: '/play/skill-builder',
    name: 'skill-builder',
    component: () => import('../views/SkillBuilderView.vue'),
    meta: {
      title: 'Skill Builder - MathStar',
      description: 'Practice math at your own pace with instant feedback',
      requiresAuth: false
    }
  },
  {
    path: '/play/timed-challenge',
    name: 'timed-challenge',
    component: () => import('../views/TimedChallengeView.vue'),
    meta: {
      title: 'Timed Challenge - MathStar',
      description: 'Race against the clock and beat your high score!',
      requiresAuth: false
    }
  },
  // ===== Play Mode Routes END =====

  // ===== Settings Route =====
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
    meta: {
      title: 'Settings - MathStar',
      requiresAuth: false
    }
  },

  // ===== Progress Route =====
  {
    path: '/progress',
    name: 'progress',
    component: () => import('../views/ProgressView.vue'),
    meta: {
      title: 'Your Progress - MathStar',
      requiresAuth: false
    }
  },

  // ===== 404 Not Found Route =====
  /**
   * Catch-all route for undefined paths
   * Redirects to home page instead of showing error
   * Better UX for users who might manually edit URLs
   */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

// ===== Router Instance =====
/**
 * Create router instance with web history mode
 * 
 * Configuration:
 * - Uses HTML5 History API (clean URLs without #)
 * - Scrolls to top on navigation (important for mobile)
 * - Sets page title from route meta
 * 
 * Ghana-Specific Optimizations:
 * - Lazy loading all routes (reduces initial load)
 * - Scroll behavior optimized for mobile
 * - No authentication required (offline-first)
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  
  // ===== Scroll Behavior =====
  /**
   * Scroll to top on navigation
   * Important for mobile users navigating between pages
   * 
   * Special handling:
   * - Saved position when using back button
   * - Smooth scroll to top on new navigation
   * - Hash anchor support for in-page links
   */
  scrollBehavior(to, _from, savedPosition) {
    // If user clicked back button, restore scroll position
    if (savedPosition) {
      return savedPosition
    }
    
    // If navigating to hash anchor, scroll to element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // Default: scroll to top of page
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// ===== Navigation Guards =====
/**
 * Global navigation guard
 * 
 * Tasks:
 * 1. Set page title from route meta
 * 2. Log navigation for debugging (dev only)
 * 3. Handle authentication (future feature)
 * 4. Track page views (future analytics)
 */
router.beforeEach((to, _from, next) => {
  // Set page title from route meta or default
  const title = to.meta.title as string || 'MathStar'
  document.title = title
  
  // Log navigation in development mode
  if (import.meta.env.DEV) {
    console.log(`🧭 Navigating to ${to.path}`)
  }
  
  // Future: Check authentication if required
  // if (to.meta.requiresAuth && !isAuthenticated()) {
  //   next('/login')
  //   return
  // }
  
  // Continue navigation
  next()
})

/**
 * After navigation guard
 * Runs after navigation is confirmed
 * 
 * Tasks:
 * - Track page views (future analytics)
 * - Update user activity timestamp
 * - Log errors if navigation failed
 */
router.afterEach((_to, _from, failure) => {
  if (failure) {
    console.error('❌ Navigation failed:', failure)
  }
  
  // Future: Track page view in analytics
  // trackPageView(to.path)
  
  // Update last activity timestamp in localStorage
  try {
    localStorage.setItem('mathstar_last_active', Date.now().toString())
  } catch (error) {
    console.error('Failed to update last active timestamp:', error)
  }
})

// ===== Error Handling =====
/**
 * Handle router errors
 * Logs errors in development, fails silently in production
 */
router.onError((error) => {
  console.error('🚨 Router Error:', error)
  
  // Future: Send error to monitoring service
  // if (import.meta.env.PROD) {
  //   logError(error)
  // }
})

// ===== Export Router =====
export default router