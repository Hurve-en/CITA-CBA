/**
 * WEB VITALS REPORTING
 * 
 * Track Core Web Vitals automatically
 */

import { performanceMonitor } from './performance-monitor'

export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', metric.name, Math.round(metric.value))
  }

  // Record in performance monitor
  performanceMonitor.recordMetric(
    `web_vital_${metric.name.toLowerCase()}`,
    metric.value,
    metric.id
  )

  // Send to analytics service (optional)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  }

  // Thresholds for alerts
  const thresholds: Record<string, number> = {
    CLS: 0.1,      // Cumulative Layout Shift
    FID: 100,      // First Input Delay (ms)
    LCP: 2500,     // Largest Contentful Paint (ms)
    FCP: 1800,     // First Contentful Paint (ms)
    TTFB: 800,     // Time to First Byte (ms)
    INP: 200,      // Interaction to Next Paint (ms)
  }

  // Warn if metric exceeds threshold
  const threshold = thresholds[metric.name]
  if (threshold && metric.value > threshold) {
    console.warn(
      `⚠️ ${metric.name} is ${Math.round(metric.value)}ms (threshold: ${threshold}ms)`
    )
  }
}

/**
 * Add this to src/app/layout.tsx:
 * 
 * import { reportWebVitals } from '@/lib/web-vitals'
 * 
 * export { reportWebVitals }
 */