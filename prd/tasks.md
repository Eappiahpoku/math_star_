MATHSTAR DEVELOPMENT ROADMAP
PHASE 1: PROJECT SETUP

Goal: Set up the development environment and base project structure.

Tasks:

Create Project Folder

Name it mathstar/.

Inside, create folders:

src/
  ├─ components/
  ├─ views/
  ├─ assets/
      ├─ sounds/
      ├─ icons/
public/


Initialize the Project

Run:

npm create vite@latest mathstar --template react-ts


(or vue-ts if using Vue)

Install Dependencies

npm install tailwindcss postcss autoprefixer

Run npx tailwindcss init -p

Setup TailwindCSS

Configure tailwind.config.js with dark mode and themes.

Add Tailwind to index.css.

Add External Fonts and Icons

Link Poppins from Google Fonts in index.html.

Add Font Awesome CDN.

Setup Git & Version Control

Initialize a Git repo: git init

Create .gitignore and commit base project.

PHASE 2: CORE STRUCTURE & NAVIGATION

Goal: Build the foundational screens and transitions.

Tasks:

Create Screen Components

SplashScreen.vue

HomePage.vue

LearnMenu.vue

PlayMenu.vue

SettingsScreen.vue

Set Up Router / View Manager

Use React Router (or Vue Router) for screen navigation.

Define routes for each page.

Implement Splash Screen

Add fade-in animation.

Auto-redirect to Home after 3s.

Build Home Page

Add title, slogan, and navigation buttons.

Ensure Responsiveness

Test on mobile & desktop (Tailwind breakpoints).

PHASE 3: LEARN MODE DEVELOPMENT

Goal: Create the educational flow (topics, slides, navigation).

Tasks:

Build Learn Menu

Display topic buttons (Arithmetic, Algebra).

Build Topic Sub-Menus

Dynamically load lessons for each topic.

Build Lesson Viewer Component

Include: Back button, title, slide content, next/prev.

Store lesson slides in a JSON file like:

{
  "Arithmetic": {
    "Addition": ["Slide 1 content", "Slide 2 content"]
  }
}


Add Slide Navigation Logic

Manage current slide index.

Disable buttons at edges.

Test Navigation

Move smoothly between Learn → Topic → Lesson → Back.

PHASE 4: PLAY MODE DEVELOPMENT

Goal: Develop the Skill Builder and Timed Challenge games.

A. Skill Builder

Setup Skill Builder Menu

Display topic list with Start button.

Build Skill Builder Game Screen

Components: Question, Input, Feedback, Stats.

Implement Random Question Generator

Example: Addition → random(1–20) + random(1–20).

Add Logic for Submit & Feedback

Correct: Show “Correct!”, play chime, load next.

Incorrect: Show “Try Again.”, retry same question.

Add Sound Effects

correct.mp3, incorrect.mp3.

B. Timed Challenge

Build Setup Screen

Difficulty selection (Beginner, Intermediate, Pro).

Timed Challenge Game

Timer countdown, scoring system.

Immediate question reload on submit.

Game Over Screen

Display final score + motivational text.

“Play Again” and “Main Menu” buttons.

Store Scores in LocalStorage

Save best score per difficulty.

PHASE 5: SETTINGS, STORAGE & POLISH

Goal: Add personalization, persistence, and polish.

Tasks:

Build Settings Screen

Font size, color theme, and reset options.

Implement Theme Switch

Change CSS variables via data-theme.

Implement Font Scaling

Adjust Tailwind classes on body.

Create Custom Reset Modal

On confirm: localStorage.clear().

Save Settings to LocalStorage

Load user preferences on app start.

Finalize Responsiveness

Test mobile (360px), tablet, desktop.

Accessibility Checks

Tab navigation, ARIA labels, contrast ratios.

Performance Optimization

Lazy load lesson content and sound files.

PHASE 6: TESTING & DEPLOYMENT

Goal: Ensure everything works flawlessly and publish the app.

Tasks:

Manual Testing

Each screen, game logic, and transitions.

Bug Fixing & Cleanup

Remove unused imports, console logs, etc.

Deploy

Host on Vercel or Netlify.

Test on multiple devices.

Collect Feedback

Share link with classmates or testers.

Iterate based on feedback.