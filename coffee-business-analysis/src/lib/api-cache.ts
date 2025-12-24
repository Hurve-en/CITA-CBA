/**
 * API CACHING MIDDLEWARE
 * 
 * 
 * Caches API responses
 */

import { NextRequest, NextResponse } from 'next/server'
import { memoryCache, createCacheKey } from './memory-cache'

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  key?: string // Custom cache key
  invalidateOn?: string[] // Invalidate on these paths
}

/**
 * Wrap API handler with caching
 */
export function withCache(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: CacheOptions = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return handler(req)
    }

    // Generate cache key
    const cacheKey = options.key || createCacheKey(
      req.nextUrl.pathname,
      req.nextUrl.searchParams.toString()
    )

    // Try to get from cache
    const cached = memoryCache.get<any>(cacheKey)
    if (cached) {
      console.log('✅ Cache hit:', cacheKey)
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'X-Cache-Key': cacheKey,
        },
      })
    }

    console.log('❌ Cache miss:', cacheKey)

    // Execute handler
    const response = await handler(req)
    
    // Only cache successful responses
    if (response.ok) {
      const data = await response.clone().json()
      memoryCache.set(cacheKey, data, options.ttl)
    }

    // Add cache headers
    const newResponse = NextResponse.json(await response.json(), {
      status: response.status,
      headers: {
        'X-Cache': 'MISS',
        'X-Cache-Key': cacheKey,
      },
    })

    return newResponse
  }
}

/**
 * Invalidate cache by pattern
 */
export function invalidateCache(pattern: string): number {
  const stats = memoryCache.stats()
  let count = 0

  for (const key of stats.keys) {
    if (key.includes(pattern)) {
      memoryCache.delete(key)
      count++
    }
  }

  console.log(`🗑️ Invalidated ${count} cache entries matching: ${pattern}`)
  return count
}

/**
 * Invalidate all cache
 */
export function invalidateAllCache(): void {
  memoryCache.clear()
  console.log('🗑️ All cache cleared')
}