'use client'

/**
 * PROVIDERS WITH REACT QUERY
 * 
 * Wraps app with NextAuth session provider and React Query provider
 */

import { SessionProvider } from 'next-auth/react'
import { QueryProvider } from '@/components/query-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </SessionProvider>
  )
}