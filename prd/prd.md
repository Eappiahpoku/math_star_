## 1. Overview

### 1.1. Project Name

MathStar

### 1.2. Slogan

"Level up your genius"

### 1.3. Objective

To create an interactive, engaging, and web-based learning game for students aged 10-16. The primary goal is to build student confidence and mastery in foundational arithmetic and algebra concepts.

### 1.4. Target Audience

Students aged 10-16.

### 1.5. Core Concept

A dual-mode application:

1.  **Learn Mode:** Provides instructional content via simple, interactive slides.
    
2.  **Play Mode:** Reinforces learning through gamified quizzes, split into a practice area ("Skill Builder") and a competitive challenge ("Timed Challenge").
    

## 2. Technical & Design Stack

### 2.1. Core Technology

The application will be a single-page web application (SPA) built with **HTML, CSS, and JavaScript**.

### 2.2. Recommended Frameworks (for LLM implementation)

-   **JavaScript Framework:** **React** or **Vue.js**. This is strongly recommended to manage the different screens (states) of the app (e.g., `splash`, `home`, `learn`, `play`).
    
-   **Styling:** **TailwindCSS**. Load via CDN. This is essential for rapid, responsive UI development and easy theme switching (colors, fonts).
    
-   **Language:** **TypeScript** is recommended for type safety to prevent bugs in game logic (e.g., `score` must be a `number`).
    

### 2.3. Fonts

-   **Primary Font:** **'Poppins'** (Load from Google Fonts). It is a clean, modern, and highly-readable sans-serif font, fitting the "fun yet professional" aesthetic.
    
-   **Fallback:** `sans-serif`.
    

### 2.4. Icons

-   **Library:** **Font Awesome**.
    
-   **CDN Link:** Must be included in the `<head>` of the HTML file.
    
    ```
    <link rel="stylesheet" href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css)" />
    
    ```
    

### 2.5. Color Palette (Masculine / Neutral Theme)

The game must use a clean, modern, and neutral color palette. A dark-mode-first approach is preferred. **Under no circumstances should pink, magenta, or bright purple be used.**

-   **Theme: "Midnight Blue" (Default)**
    
    -   **Background:** `#1A1A1D` (Very dark grey, almost black)
        
    -   **Primary Text:** `#F5F5F5` (Off-white)
        
    -   **Secondary Text/Borders:** `#4E4E50` (Medium grey)
        
    -   **Primary Action (Buttons):** `#005A9C` (Strong, professional blue)
        
    -   **Accent (Hover/Active):** `#FD7E14` (Vibrant orange)
        
    -   **Success:** `#28A745` (Bright green)
        
    -   **Error:** `#DC3545` (Strong red)
        
-   **Alternative Themes (for Settings):**
    
    -   **"Light Mode":** Invert the palette (white background, dark text).
        
    -   **"Ocean":** Use shades of blue and teal.
        

## 3. Core Features (Screen-by-Screen Breakdown)

The app will be a single page that swaps content "views" based on user state.

### 3.1. Screen 1: Splash Screen

-   **ID:** `splash-screen`
    
-   **Purpose:** Initial loading screen to introduce the brand.
    
-   **Elements:**
    
    -   A central, large star icon (e.g., `<i class="fa-solid fa-star fa-5x"></i>`).
        
    -   Game Title: "MathStar"
        
    -   Slogan: "Level up your genius"
        
-   **Behavior:**
    
    1.  On app load, this screen is displayed.
        
    2.  The Title and Slogan must slowly appear using a `fadeIn` and `slideUp` CSS animation.
        
    3.  After **3 seconds**, the screen automatically fades out and transitions to the `home-page`.
        

### 3.2. Screen 2: Home Page (Main Menu)

-   **ID:** `home-page`
    
-   **Purpose:** Main navigation hub.
    
-   **Elements:**
    
    -   Game Title: "MathStar" (smaller, in the header).
        
    -   Three large, clearly-labeled, full-width (on mobile) buttons in a vertical stack:
        
        1.  **"Learn"** (Icon: `<i class="fa-solid fa-book"></i>`)
            
        2.  **"Play"** (Icon: `<i class="fa-solid fa-gamepad"></i>`)
            
        3.  **"Settings"** (Icon: `<i class="fa-solid fa-gear"></i>`)
            
-   **Behavior:**
    
    -   Clicking "Learn" transitions to the `learn-menu` screen.
        
    -   Clicking "Play" transitions to the `play-menu` screen.
        
    -   Clicking "Settings" transitions to the `settings-screen`.
        

### 3.3. Screen 3: Learn Section

#### 3.3.1. Learn Menu

-   **ID:** `learn-menu`
    
-   **Purpose:** Allow user to select a broad topic.
    
-   **Elements:**
    
    -   **"Back" Button** (Icon: `<i class="fa-solid fa-arrow-left"></i>`). Returns to `home-page`.
        
    -   Title: "Learn Topics"
        
    -   List of topic category buttons:
        
        -   "Arithmetic"
            
        -   "Algebra"
            

#### 3.3.2. Topic Sub-Menu (Dynamic)

-   **Purpose:** Allow user to select a specific lesson.
    
-   **Behavior:**
    
    -   If user clicks "Arithmetic", show a new view with:
        
        -   **"Back" Button** (returns to `learn-menu`).
            
        -   Title: "Arithmetic"
            
        -   Lesson Buttons: "Addition", "Subtraction", "Multiplication", "Division", "Order of Operations".
            
    -   If user clicks "Algebra", show a new view with:
        
        -   **"Back" Button** (returns to `learn-menu`).
            
        -   Title: "Algebra"
            
        -   Lesson Buttons: "Additive Properties", "Multiplicative Properties".
            
    -   Clicking any specific lesson button (e.g., "Addition") transitions to the `lesson-viewer`.
        

#### 3.3.3. Lesson Viewer

-   **ID:** `lesson-viewer`
    
-   **Purpose:** Display the educational content.
    
-   **Elements:**
    
    -   **"Back" Button** (returns to the previous sub-menu, e.g., "Arithmetic").
        
    -   Lesson Title (e.g., "Addition").
        
    -   **Slide Content Area:** A large `div` that displays the content for the current slide.
        
    -   **Slide Navigation:**
        
        -   "Previous" Button (Icon: `<i class="fa-solid fa-chevron-left"></i>`)
            
        -   Slide Counter (e.g., "Slide 3 of 8")
            
        -   "Next" Button (Icon: `<i class="fa-solid fa-chevron-right"></i>`)
            
-   **Behavior:**
    
    1.  Load lesson content (an array of 5-10 HTML strings/components) based on the selected topic.
        
    2.  "Next" button increments the slide index and displays the new content. It is disabled on the last slide.
        
    3.  "Previous" button decrements the slide index. It is disabled on the first slide.
        

### 3.4. Screen 4: Play Section

#### 3.4.1. Play Menu

-   **ID:** `play-menu`
    
-   **Purpose:** Choose the game mode.
    
-   **Elements:**
    
    -   **"Back" Button** (returns to `home-page`).
        
    -   Title: "Play Mode"
        
    -   Two large buttons:
        
        1.  **"Skill Builder"** (Icon: `<i class="fa-solid fa-hammer"></i>`)
            
        2.  **"Timed Challenge"** (Icon: `<i class="fa-solid fa-stopwatch"></i>`)
            
-   **Behavior:**
    
    -   Clicking "Skill Builder" transitions to `skill-builder-setup`.
        
    -   Clicking "Timed Challenge" transitions to `timed-challenge-setup`.
        

#### 3.4.2. Skill Builder Setup

-   **ID:** `skill-builder-setup`
    
-   **Purpose:** User selects a topic to practice.
    
-   **Elements:**
    
    -   **"Back" Button** (returns to `play-menu`).
        
    -   Title: "Skill Builder"
        
    -   Prompt: "Choose a topic to practice:"
        
    -   A list of _all_ specific lesson topics (e.g., "Addition", "Subtraction", "Order of Operations", etc.).
        
    -   **"Start" Button**.
        
-   **Behavior:**
    
    -   Clicking "Start" transitions to the `skill-builder-game`, passing the selected topic.
        

#### 3.4.3. Skill Builder Game Screen

-   **ID:** `skill-builder-game`
    
-   **Purpose:** Infinite practice (based on flowchart, Page 14).
    
-   **Elements:**
    
    -   **"Quit" Button** (Icon: `<i class="fa-solid fa-xmark"></i>`). Returns to `play-menu`.
        
    -   Topic Title (e.g., "Practice: Addition").
        
    -   Progress Indicators:
        
        -   "Questions Answered: [N]"
            
        -   "Accuracy: [N]%"
            
    -   **Question Display:** (e.g., "What is 12 + 5?")
        
    -   **Answer Input:** An HTML `<input type="number">`.
        
    -   **"Submit" Button**.
        
    -   **Feedback Box:** (Hidden by default).
        
-   **Behavior:**
    
    1.  Generate a random question for the selected topic.
        
    2.  User types answer and clicks "Submit".
        
    3.  **Check Answer:**
        
        -   **If Correct:**
            
            -   Show "Correct!" in the feedback box (use Success color).
                
            -   Play a "chime" sound.
                
            -   Increment "Questions Answered".
                
            -   Recalculate "Accuracy".
                
            -   After 1.5 seconds, hide feedback and generate a _new_ question.
                
        -   **If Incorrect:**
            
            -   Show "Try Again." in the feedback box (use Error color).
                
            -   Play a "buzzer" sound.
                
            -   Recalculate "Accuracy".
                
            -   Do **NOT** generate a new question. The user must retry the same question.
                

#### 3.4.4. Timed Challenge Setup

-   **ID:** `timed-challenge-setup`
    
-   **Purpose:** User selects difficulty for the timed mode.
    
-   **Elements:**
    
    -   **"Back" Button** (returns to `play-menu`).
        
    -   Title: "Timed Challenge"
        
    -   Prompt: "Select your difficulty:"
        
    -   Difficulty Buttons: "Beginner", "Intermediate", "Pro".
        
    -   **"Start Challenge" Button**.
        
-   **Behavior:**
    
    -   Clicking "Start Challenge" transitions to `timed-challenge-game`, passing the selected difficulty.
        

#### 3.4.5. Timed Challenge Game Screen

-   **ID:** `timed-challenge-game`
    
-   **Purpose:** Rapid-fire questions against the clock (based on flowchart, Page 15).
    
-   **Elements:**
    
    -   **Header Bar:**
        
        -   **Timer:** "Time: 60"
            
        -   **Score:** "Score: 0"
            
    -   **Question Display:** (e.g., "What is 7 x 8?")
        
    -   **Answer Input:** An HTML `<input type="number">`.
        
    -   **"Submit" Button**.
        
-   **Behavior:**
    
    1.  On load, set Score = 0, Timer = 60.
        
    2.  Start a 1-second interval timer that decrements the "Time" display.
        
    3.  Generate a random question based on selected difficulty.
        
    4.  User types answer and clicks "Submit". (Submitting via "Enter" key should also work).
        
    5.  **Check Answer:**
        
        -   **If Correct:**
            
            -   Increment "Score" by 1.
                
            -   Play "chime" sound.
                
        -   **If Incorrect:**
            
            -   Play "buzzer" sound.
                
    6.  **Crucially:** Regardless of correct or incorrect, _immediately_ generate the next question. This must be rapid-fire.
        
    7.  **Game End:** When the timer reaches 0.
        
        -   Stop the timer.
            
        -   Disable the input and submit button.
            
        -   Transition to the `game-over-screen`, passing the final score.
            

#### 3.4.6. Game Over Screen

-   **ID:** `game-over-screen`
    
-   **Purpose:** Display final score from Timed Challenge.
    
-   **Elements:**
    
    -   Title: "Challenge Complete!"
        
    -   Final Score Display: "Your Final Score: [N]"
        
    -   Motivational Message: (e.g., "Great job!", "Keep practicing to beat your high score!")
        
    -   Button: "Play Again" (returns to `timed-challenge-setup`).
        
    -   Button: "Main Menu" (returns to `home-page`).
        

### 3.5. Screen 5: Settings Screen

-   **ID:** `settings-screen`
    
-   **Purpose:** Allow user to customize accessibility and appearance.
    
-   **Elements:**
    
    -   **"Back" Button** (returns to `home-page`).
        
    -   Title: "Settings"
        
    -   **Setting 1: Font Size**
        
        -   Label: "Font Size"
            
        -   Options (Buttons): "Small", "Medium", "Large"
            
        -   **Behavior:** Clicking an option adds a class to the `<body>` tag (e.g., `font-medium`) to scale text.
            
    -   **Setting 2: Color Theme**
        
        -   Label: "Color Theme"
            
        -   Options (Buttons): "Midnight Blue" (Default), "Light Mode", "Ocean"
            
        -   **Behavior:** Clicking an option adds a `data-theme` attribute to the `<body>` tag, which swaps CSS variables for the color palette.
            
    -   **Setting 3: Reset Progress**
        
        -   Label: "Reset all progress"
            
        -   Button: "Reset"
            
        -   **Behavior:**
            
            1.  Clicking "Reset" shows a **custom modal dialog** (NOT a browser `alert()` or `confirm()`).
                
            2.  Modal Text: "Are you sure? This will erase all your scores and accuracy data."
                
            3.  Modal Buttons: "Cancel" (closes modal) and "Yes, Reset" (clears `localStorage` data and closes modal).
                

## 4. Non-Functional Requirements

### 4.1. Responsiveness

The application MUST be fully responsive and usable on all screen sizes, from a small mobile phone (360px width) to a desktop. Use flexible layouts (Flexbox, Grid).

### 4.2. Accessibility

-   All interactive elements (buttons, inputs) must be keyboard-navigable.
    
-   Use semantic HTML (`<nav>`, `<button>`, `<main>`).
    
-   Ensure all text has sufficient color contrast against its background.
    

### 4.3. Performance

-   The app must load quickly.
    
-   Game loops (timers, question generation) must be smooth and have no noticeable lag.
    
-   Sound effects should be small, high-quality files (`.mp3` or `.wav`) and play instantly.
    

## 5. Technology Stack Recommendation (Answer to User)

You asked whether to use plain JavaScript or a framework like Vue/Tailwind/TypeScript.

**Short Answer: You should absolutely use a framework. This game is too complex for plain JavaScript to be manageable.**

Here is the breakdown:

1.  **Plain JavaScript:** You _could_ build this with plain JS, but you would spend 80% of your time manually managing the "state." This means writing complex, buggy code to hide and show different `divs` (screens), pass data between them (like the score or selected topic), and update the DOM every time something changes. It's difficult to maintain and will quickly become frustrating.
    
2.  **Recommended Stack: React (or Vue) + TailwindCSS + TypeScript**
    
    -   **React (or Vue):** These frameworks are built for exactly this kind of application. Each "screen" (Splash, Home, Game) becomes a "Component." The framework handles swapping components and passing data between them (this is "state management"). This is _infinitely_ cleaner, faster to build, and easier to debug.
        
    -   **TailwindCSS:** This is a modern CSS framework that perfectly matches your request. It's "utility-first," so you build responsive designs directly in your HTML. It also has a built-in system for creating color themes (like your Dark/Light mode setting) and responsive font sizes, which maps directly to your Settings screen requirements.
        
    -   **TypeScript:** This adds "types" to JavaScript. For a game, this is a lifesaver. It ensures a `score` is always a `number`, a `topic` is always one of the valid `string` options, etc. This prevents countless common bugs before you even run the code.
        

**Conclusion:** To build this game properly and make it high-quality, responsive, and maintainable, a modern framework is the best choice. **React + TailwindCSS** is an extremely popular and powerful combination that would be perfect for "MathStar."