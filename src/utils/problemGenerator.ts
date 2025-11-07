/**
 * Problem Generator Utility for Timed Challenge
 * 
 * Generates random math problems of varying difficulty
 * - Easy: Small numbers (1-10)
 * - Medium: Medium numbers (10-50)
 * - Hard: Large numbers (50-100)
 * 
 * Ghana-specific optimization:
 * - All calculations done client-side (no API calls)
 * - Works completely offline
 * - Lightweight and fast
 */

// ===== Types & Interfaces =====

/**
 * Difficulty levels for problems
 */
export type Difficulty = 'easy' | 'medium' | 'hard'

/**
 * Math operation types
 */
export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'

/**
 * Problem interface
 */
export interface Problem {
  id: string
  operation: Operation
  difficulty: Difficulty
  operand1: number
  operand2: number
  correctAnswer: number
  displayText: string
  points: number
}

// ===== Constants =====

/**
 * Number ranges for each difficulty level
 */
const DIFFICULTY_RANGES = {
  easy: { min: 1, max: 10 },
  medium: { min: 10, max: 50 },
  hard: { min: 50, max: 100 }
} as const

/**
 * Points awarded for each difficulty level
 */
const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 15,
  hard: 20
} as const

/**
 * Operation symbols for display
 */
const OPERATION_SYMBOLS = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷'
} as const

// ===== Helper Functions =====

/**
 * Generate random integer between min and max (inclusive)
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Get random element from array
 */
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Generate unique problem ID
 */
function generateProblemId(): string {
  return `problem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// ===== Problem Generation Functions =====

/**
 * Generate random difficulty level
 * Distribution: 40% easy, 40% medium, 20% hard
 */
export function getRandomDifficulty(): Difficulty {
  const rand = Math.random()
  if (rand < 0.4) return 'easy'
  if (rand < 0.8) return 'medium'
  return 'hard'
}

/**
 * Generate random operation type
 * All operations have equal probability
 */
export function getRandomOperation(): Operation {
  const operations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division']
  return getRandomElement(operations)
}

/**
 * Generate addition problem
 */
function generateAddition(difficulty: Difficulty): Omit<Problem, 'id' | 'displayText' | 'points'> {
  const { min, max } = DIFFICULTY_RANGES[difficulty]
  const operand1 = getRandomInt(min, max)
  const operand2 = getRandomInt(min, max)
  const correctAnswer = operand1 + operand2

  return {
    operation: 'addition',
    difficulty,
    operand1,
    operand2,
    correctAnswer
  }
}

/**
 * Generate subtraction problem
 * Ensures result is always positive
 */
function generateSubtraction(difficulty: Difficulty): Omit<Problem, 'id' | 'displayText' | 'points'> {
  const { min, max } = DIFFICULTY_RANGES[difficulty]
  const operand1 = getRandomInt(min, max)
  const operand2 = getRandomInt(min, operand1) // Ensure positive result
  const correctAnswer = operand1 - operand2

  return {
    operation: 'subtraction',
    difficulty,
    operand1,
    operand2,
    correctAnswer
  }
}

/**
 * Generate multiplication problem
 * Uses smaller numbers for harder difficulties to keep answers manageable
 */
function generateMultiplication(difficulty: Difficulty): Omit<Problem, 'id' | 'displayText' | 'points'> {
  let operand1: number, operand2: number

  switch (difficulty) {
    case 'easy':
      operand1 = getRandomInt(1, 10)
      operand2 = getRandomInt(1, 10)
      break
    case 'medium':
      operand1 = getRandomInt(5, 15)
      operand2 = getRandomInt(5, 15)
      break
    case 'hard':
      operand1 = getRandomInt(10, 25)
      operand2 = getRandomInt(10, 25)
      break
  }

  const correctAnswer = operand1 * operand2

  return {
    operation: 'multiplication',
    difficulty,
    operand1,
    operand2,
    correctAnswer
  }
}

/**
 * Generate division problem
 * Ensures result is always a whole number
 */
function generateDivision(difficulty: Difficulty): Omit<Problem, 'id' | 'displayText' | 'points'> {
  let divisor: number, quotient: number

  switch (difficulty) {
    case 'easy':
      divisor = getRandomInt(2, 10)
      quotient = getRandomInt(1, 10)
      break
    case 'medium':
      divisor = getRandomInt(5, 15)
      quotient = getRandomInt(2, 15)
      break
    case 'hard':
      divisor = getRandomInt(10, 20)
      quotient = getRandomInt(5, 20)
      break
  }

  const operand1 = divisor * quotient // Dividend
  const operand2 = divisor // Divisor
  const correctAnswer = quotient

  return {
    operation: 'division',
    difficulty,
    operand1,
    operand2,
    correctAnswer
  }
}

// ===== Main Problem Generation Function =====

/**
 * Generate a complete math problem
 * 
 * @param operation - Type of operation (optional, random if not provided)
 * @param difficulty - Difficulty level (optional, random if not provided)
 * @returns Complete problem with all properties
 * 
 * @example
 * const problem = generateProblem()
 * // { id: "problem_1234...", displayText: "25 + 17 = ?", correctAnswer: 42, ... }
 */
export function generateProblem(
  operation?: Operation,
  difficulty?: Difficulty
): Problem {
  // Use provided values or generate random ones
  const selectedOperation = operation || getRandomOperation()
  const selectedDifficulty = difficulty || getRandomDifficulty()

  // Generate problem based on operation type
  let baseProblem: Omit<Problem, 'id' | 'displayText' | 'points'>

  switch (selectedOperation) {
    case 'addition':
      baseProblem = generateAddition(selectedDifficulty)
      break
    case 'subtraction':
      baseProblem = generateSubtraction(selectedDifficulty)
      break
    case 'multiplication':
      baseProblem = generateMultiplication(selectedDifficulty)
      break
    case 'division':
      baseProblem = generateDivision(selectedDifficulty)
      break
  }

  // Create display text
  const symbol = OPERATION_SYMBOLS[selectedOperation]
  const displayText = `${baseProblem.operand1} ${symbol} ${baseProblem.operand2} = ?`

  // Get points for difficulty
  const points = DIFFICULTY_POINTS[selectedDifficulty]

  // Return complete problem
  return {
    ...baseProblem,
    id: generateProblemId(),
    displayText,
    points
  }
}

/**
 * Generate multiple problems at once
 * 
 * @param count - Number of problems to generate
 * @param operation - Optional: specific operation type
 * @param difficulty - Optional: specific difficulty level
 * @returns Array of problems
 * 
 * @example
 * const problems = generateProblems(10, 'addition', 'easy')
 * // [{ problem1 }, { problem2 }, ...]
 */
export function generateProblems(
  count: number,
  operation?: Operation,
  difficulty?: Difficulty
): Problem[] {
  return Array.from({ length: count }, () => generateProblem(operation, difficulty))
}

/**
 * Check if an answer is correct
 * 
 * @param problem - The problem to check
 * @param userAnswer - User's answer
 * @returns True if correct, false otherwise
 */
export function checkAnswer(problem: Problem, userAnswer: number): boolean {
  return userAnswer === problem.correctAnswer
}

/**
 * Calculate streak bonus points
 * Rewards consecutive correct answers
 * 
 * @param streakCount - Current streak count
 * @returns Bonus points for this streak level
 * 
 * Streak Bonuses:
 * - 2 correct: +5 points
 * - 3 correct: +10 points
 * - 5 correct: +20 points
 * - 10 correct: +50 points
 * - 15+ correct: +100 points
 */
export function calculateStreakBonus(streakCount: number): number {
  if (streakCount >= 15) return 100
  if (streakCount >= 10) return 50
  if (streakCount >= 5) return 20
  if (streakCount >= 3) return 10
  if (streakCount >= 2) return 5
  return 0
}

/**
 * Get streak message for display
 * 
 * @param streakCount - Current streak count
 * @returns Encouraging message for the streak
 */
export function getStreakMessage(streakCount: number): string {
  if (streakCount >= 15) return '🔥🔥🔥 LEGENDARY STREAK! 🔥🔥🔥'
  if (streakCount >= 10) return '🔥🔥 ON FIRE! 🔥🔥'
  if (streakCount >= 5) return '🔥 GREAT STREAK! 🔥'
  if (streakCount >= 3) return '⚡ STREAK STARTED! ⚡'
  if (streakCount >= 2) return '✨ Keep going! ✨'
  return ''
}