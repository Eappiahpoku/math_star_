/// <reference types="vite/client" />

/**
 * Type declarations for Vue components
 * 
 * This file tells TypeScript how to handle .vue file imports
 * Required for Vue 3 + TypeScript + Vite setup
 * 
 * Without this, TypeScript will show errors like:
 * "Could not find a declaration file for module '../views/SomeView.vue'"
 */

/**
 * Declare module for all .vue files
 * Tells TypeScript that .vue files export Vue components
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * Additional Vite-specific type declarations
 * These are automatically provided by Vite but can be extended here
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Add more env variables as needed
  // readonly VITE_API_URL: string
  // readonly VITE_ANALYTICS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}