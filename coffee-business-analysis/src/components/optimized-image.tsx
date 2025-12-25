/**
 * OPTIMIZED IMAGE COMPONENT
 * 
 * Use this instead of regular <img> tags
 */

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        onLoadingComplete={() => setIsLoading(false)}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          ${className || ''}
        `}
        sizes={
          fill
            ? '100vw'
            : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`
        }
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

/**
 * Usage Example:
 * 
 * import { OptimizedImage } from '@/components/optimized-image'
 * 
 * // Fixed size
 * <OptimizedImage
 *   src="/images/product.jpg"
 *   alt="Product"
 *   width={400}
 *   height={300}
 * />
 * 
 * // Fill container
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   fill
 *   priority // Load immediately for above-fold images
 * />
 */