/**
 * CUSTOM HOOK FOR CACHED DATA FETCHING
 * 
 * 
 * Easy data fetching with automatic caching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Fetch with automatic caching
 */
export function useCachedData<T>(
  key: string | string[],
  fetcher: () => Promise<T>,
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: fetcher,
    staleTime: options?.staleTime,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled,
  })
}

/**
 * Mutation with cache invalidation
 */
export function useCachedMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    invalidateKeys?: string[][]
    onSuccess?: (data: TData) => void
    onError?: (error: Error) => void
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate specified caches
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key })
        })
      }
      
      options?.onSuccess?.(data)
    },
    onError: options?.onError,
  })
}

/**
 * Example usage:
 * 
 * // Fetch customers with caching
 * const { data, isLoading, error } = useCachedData(
 *   'customers',
 *   async () => {
 *     const res = await fetch('/api/customers')
 *     return res.json()
 *   }
 * )
 * 
 * // Create customer with cache invalidation
 * const createCustomer = useCachedMutation(
 *   async (customer) => {
 *     const res = await fetch('/api/customers', {
 *       method: 'POST',
 *       body: JSON.stringify(customer)
 *     })
 *     return res.json()
 *   },
 *   {
 *     invalidateKeys: [['customers']], // Refetch customers after create
 *     onSuccess: () => {
 *       toast.success('Customer created!')
 *     }
 *   }
 * )
 */