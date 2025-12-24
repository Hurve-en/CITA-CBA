'use client'

/**
 * REACT QUERY PROVIDER - FIXED
 * 
 * Replace: src/components/query-provider.tsx
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 5 minutes
            staleTime: 5 * 60 * 1000,
            
            // Keep unused data in cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            
            // Refetch on window focus
            refetchOnWindowFocus: true,
            
            // Refetch on reconnect
            refetchOnReconnect: true,
            
            // Retry failed requests 3 times
            retry: 3,
            
            // Exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev tools - only shows in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}