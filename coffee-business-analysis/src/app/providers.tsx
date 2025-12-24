'use client'

/**
 * PROVIDERS WITH REACT QUERY
 * 
 * 
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