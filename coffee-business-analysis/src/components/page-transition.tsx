'use client'

/**
 * PAGE TRANSITION WRAPPER
 * 
 * Wraps pages with smooth fade-in animations
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Usage in pages:
// export default function Page() {
//   return (
//     <PageTransition>
//       <div>Your content here</div>
//     </PageTransition>
//   )
// }