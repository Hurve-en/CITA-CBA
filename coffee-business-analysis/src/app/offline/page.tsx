/**
 * OFFLINE PAGE
 * 
 * src/app/offline/page.tsx
 * Shows when user is offline
 */

'use client'

/**
 * OFFLINE PAGE - FIXED
 * 
 * src/app/offline/page.tsx
 */

import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-lg">
        
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-gray-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          You're Offline
        </h1>

        <p className="text-gray-600 mb-8">
          No internet connection detected. Please check your network and try again.
        </p>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all shadow-md"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Some cached pages may still be available while offline!
          </p>
        </div>
      </div>
    </div>
  )
}