/**
 * ROOT LAYOUT WITH SEO OPTIMIZATION
 * 
 * 
 */

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

// SEO-Optimized Metadata
export const metadata: Metadata = {
  // Basic Meta Tags
  title: {
    default: 'CITA - Coffee Business Analytics & Management Platform',
    template: '%s | CITA'
  },
  description: 'Comprehensive analytics and management platform for coffee businesses. Track sales, manage inventory, analyze customer behavior, and grow your coffee shop with data-driven insights.',
  keywords: [
    'coffee business analytics',
    'coffee shop management',
    'cafe management software',
    'coffee sales tracking',
    'inventory management',
    'customer analytics',
    'business intelligence',
    'coffee shop dashboard',
    'point of sale analytics',
    'coffee business intelligence'
  ],
  authors: [{ name: 'CITA Team' }],
  creator: 'CITA',
  publisher: 'CITA',
  
  // App Configuration
  applicationName: 'CITA',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // PWA Configuration
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CITA',
  },
  formatDetection: {
    telephone: false,
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', // TODO: Replace with your actual domain
    siteName: 'CITA',
    title: 'CITA - Coffee Business Analytics Platform',
    description: 'Comprehensive analytics and management platform for coffee businesses. Track sales, manage inventory, and grow your business.',
    images: [
      {
        url: '/og-image.png', // TODO: Create this image (1200x630)
        width: 1200,
        height: 630,
        alt: 'CITA - Coffee Business Analytics',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'CITA - Coffee Business Analytics',
    description: 'Comprehensive analytics and management platform for coffee businesses',
    images: ['/og-image.png'], // TODO: Create this image
    creator: '@yourtwitterhandle', // TODO: Replace with your Twitter handle
  },
  
  // Verification (for Google Search Console, etc.)
  verification: {
    // google: 'your-google-verification-code', // TODO: Add after deploying
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  // Additional Meta Tags
  category: 'business',
}

// Viewport Configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#334155' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CITA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#334155" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://your-domain.com" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CITA',
              applicationCategory: 'BusinessApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              operatingSystem: 'Web, Windows, macOS, Linux, iOS, Android',
              description: 'Comprehensive analytics and management platform for coffee businesses',
              author: {
                '@type': 'Organization',
                name: 'CITA'
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}