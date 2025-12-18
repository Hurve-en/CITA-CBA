/**
 * UTILITY FUNCTIONS
 * 
 * This file contains reusable helper functions used throughout the app.
 * 
 * WHY HAVE A UTILS FILE?
 * - Avoid repeating the same code in multiple places
 * - Keep formatting consistent across the app
 * - Make it easy to change behavior in one place
 * - Make code more readable
 * 
 * WHAT'S IN HERE:
 * 1. cn() - Merge CSS class names (for Tailwind)
 * 2. formatCurrency() - Format numbers as money
 * 3. formatDate() - Format dates consistently
 * 4. formatNumber() - Format numbers with commas
 * 5. calculatePercentageChange() - Math for growth metrics
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * CN - CLASS NAME MERGER
 * 
 * Combines multiple class names and resolves Tailwind conflicts
 * 
 * WHY DO WE NEED THIS?
 * When you have conditional classes, you might have conflicts:
 * Example: "bg-red-500 bg-blue-500" - which wins?
 * 
 * cn() uses twMerge to intelligently resolve conflicts
 * 
 * @param inputs - Any number of class names, objects, or arrays
 * @returns Merged class string with conflicts resolved
 * 
 * EXAMPLES:
 * cn("bg-red-500", "text-white") 
 * → "bg-red-500 text-white"
 * 
 * cn("bg-red-500", condition && "bg-blue-500")
 * → If true: "bg-blue-500" (blue wins)
 * → If false: "bg-red-500"
 * 
 * cn("p-4", { "p-8": isLarge })
 * → If isLarge true: "p-8"
 * → If isLarge false: "p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * FORMAT CURRENCY
 * 
 * Converts numbers into properly formatted currency strings
 * 
 * @param amount - The number to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 * 
 * EXAMPLES:
 * formatCurrency(1234.56) → "$1,234.56"
 * formatCurrency(1000) → "$1,000.00"
 * formatCurrency(0.5) → "$0.50"
 * formatCurrency(1234.56, "EUR") → "€1,234.56"
 * 
 * WHY USE THIS?
 * - Consistent formatting across entire app
 * - Handles decimals properly
 * - Adds commas for thousands
 * - Easy to change currency globally
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * FORMAT DATE
 * 
 * Converts Date objects or strings into readable format
 * 
 * @param date - Date object, string, or timestamp
 * @param format - 'short' | 'long' | 'relative' | 'time'
 * @returns Formatted date string
 * 
 * EXAMPLES:
 * formatDate(new Date(), 'short') → "Dec 17, 2024"
 * formatDate(new Date(), 'long') → "December 17, 2024"
 * formatDate(new Date(), 'relative') → "Today"
 * formatDate(new Date(), 'time') → "2:30 PM"
 * 
 * WHY USE THIS?
 * - Consistent date display everywhere
 * - Easy to read formats
 * - Handles different input types
 * - Can add relative dates ("2 hours ago")
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'long' | 'relative' | 'time' = 'short'
): string {
  const d = new Date(date)
  
  // Check if date is valid
  if (isNaN(d.getTime())) {
    return 'Invalid date'
  }

  switch (format) {
    case 'short':
      // Dec 17, 2024
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    
    case 'long':
      // December 17, 2024
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    
    case 'relative':
      // Today, Yesterday, or date
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (d.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (d.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
      } else {
        return formatDate(d, 'short')
      }
    
    case 'time':
      // 2:30 PM
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    
    default:
      return formatDate(d, 'short')
  }
}

/**
 * FORMAT NUMBER
 * 
 * Adds commas to large numbers for readability
 * 
 * @param num - Number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 * 
 * EXAMPLES:
 * formatNumber(1234) → "1,234"
 * formatNumber(1234567) → "1,234,567"
 * formatNumber(1234.56, 2) → "1,234.56"
 * formatNumber(0.5, 1) → "0.5"
 * 
 * WHY USE THIS?
 * - Makes large numbers easy to read
 * - Consistent across all metrics
 * - Handles decimals when needed
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * CALCULATE PERCENTAGE CHANGE
 * 
 * Calculates the percentage difference between two numbers
 * Used for growth metrics (revenue up 15%, etc.)
 * 
 * @param current - Current value
 * @param previous - Previous value
 * @returns Percentage change (can be negative)
 * 
 * EXAMPLES:
 * calculatePercentageChange(120, 100) → 20 (20% increase)
 * calculatePercentageChange(80, 100) → -20 (20% decrease)
 * calculatePercentageChange(100, 100) → 0 (no change)
 * calculatePercentageChange(150, 0) → 100 (handle division by zero)
 * 
 * WHY USE THIS?
 * - Show growth trends in dashboard
 * - Compare current vs previous periods
 * - Highlight positive/negative changes
 * 
 * HOW TO USE:
 * const change = calculatePercentageChange(thisMonth, lastMonth)
 * const isPositive = change > 0
 * const color = isPositive ? "text-green-600" : "text-red-600"
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  // Handle division by zero
  if (previous === 0) {
    return current > 0 ? 100 : 0
  }
  
  const change = ((current - previous) / previous) * 100
  
  // Round to 1 decimal place
  return Math.round(change * 10) / 10
}

/**
 * FORMAT PERCENTAGE
 * 
 * Formats a number as a percentage
 * 
 * @param value - Number to format (0.15 = 15%)
 * @param decimals - Decimal places to show
 * @returns Formatted percentage string
 * 
 * EXAMPLES:
 * formatPercentage(0.15) → "15%"
 * formatPercentage(0.1234, 2) → "12.34%"
 * formatPercentage(1.5) → "150%"
 * 
 * WHY USE THIS?
 * - Consistent percentage display
 * - Handles conversion from decimal
 * - Easy to adjust precision
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * TRUNCATE TEXT
 * 
 * Shortens long text and adds ellipsis
 * 
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with "..."
 * 
 * EXAMPLES:
 * truncateText("This is a long description", 10) → "This is a..."
 * truncateText("Short", 10) → "Short"
 * 
 * WHY USE THIS?
 * - Prevent text overflow in tables
 * - Keep UI clean and readable
 * - Handle long product names/descriptions
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * GET INITIALS
 * 
 * Extracts initials from a name (for avatars)
 * 
 * @param name - Full name
 * @returns Initials (up to 2 characters)
 * 
 * EXAMPLES:
 * getInitials("John Doe") → "JD"
 * getInitials("Sarah") → "S"
 * getInitials("Mary Jane Watson") → "MW"
 * 
 * WHY USE THIS?
 * - Create avatar placeholders
 * - Display user initials when no photo
 * - Keep UI friendly and personal
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0].toUpperCase()
  
  // First and last name initials
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * SLEEP
 * 
 * Utility for adding delays (useful for loading states, animations)
 * 
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 * 
 * EXAMPLE:
 * await sleep(1000) // Wait 1 second
 * await sleep(500)  // Wait half second
 * 
 * WHY USE THIS?
 * - Test loading states
 * - Add intentional delays
 * - Smoother UX transitions
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * LEARNING NOTES:
 * 
 * 1. When to create a utility function?
 *    - When you use the same code 3+ times
 *    - When formatting needs to be consistent
 *    - When logic is reusable
 * 
 * 2. What makes a good utility function?
 *    - Single responsibility (does one thing well)
 *    - Well documented
 *    - Handles edge cases
 *    - Returns predictable output
 * 
 * 3. Where to use these?
 *    - Components (formatCurrency in product cards)
 *    - API routes (formatDate for responses)
 *    - Anywhere you need consistent formatting
 * 
 * 4. Can I add more functions?
 *    YES! Add any helpers you find yourself repeating.
 */

/**
 * EXAMPLE USAGE IN COMPONENTS:
 * 
 * ```tsx
 * import { formatCurrency, formatDate, cn } from '@/lib/utils'
 * 
 * export function ProductCard({ price, date, isOnSale }) {
 *   return (
 *     <div className={cn("p-4", isOnSale && "bg-yellow-50")}>
 *       <p>{formatCurrency(price)}</p>
 *       <p>{formatDate(date, 'short')}</p>
 *     </div>
 *   )
 * }
 * ```
 */