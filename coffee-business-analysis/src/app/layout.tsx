/**
 * ROOT LAYOUT WITH PWA SUPPORT
 * 
 * Update your existing src/app/layout.tsx
 * Add the metadata and viewport exports
 */

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

// PWA Metadata
export const metadata: Metadata = {
  title: 'CITA - Coffee Business Analytics',
  description: 'Comprehensive analytics and management platform for coffee businesses',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CITA',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'CITA',
    title: 'CITA - Coffee Business Analytics',
    description: 'Comprehensive analytics and management platform for coffee businesses',
  },
  twitter: {
    card: 'summary',
    title: 'CITA - Coffee Business Analytics',
    description: 'Comprehensive analytics and management platform for coffee businesses',
  },
}

// PWA Viewport
export const viewport: Viewport = {
  themeColor: '#334155',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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