'use client'

/**
 * INSTALL BUTTON - ALWAYS VISIBLE
 * Shows even if PWA is not installable (for testing)
 */

import { useState, useEffect } from 'react'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, message])
  }

  useEffect(() => {
    addLog('🔍 InstallButton component mounted')

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      addLog('✅ App is already installed!')
      setIsInstalled(true)
      return
    }

    // Listen for install prompt
    const handler = (e: any) => {
      addLog('✅ beforeinstallprompt event fired!')
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check after 2 seconds if event fired
    setTimeout(() => {
      if (!deferredPrompt) {
        addLog('⚠️ No beforeinstallprompt event after 2s')
        addLog('💡 This is normal in dev mode or if already installed')
      }
    }, 2000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    addLog('🚀 Install button clicked')
    
    if (!deferredPrompt) {
      addLog('❌ No deferredPrompt available')
      
      // Show helpful message
      alert(
        '❌ Install not available:\n\n' +
        'Possible reasons:\n' +
        '1. App is already installed\n' +
        '2. Using Firefox/Safari (limited PWA support)\n' +
        '3. Recently dismissed install prompt\n\n' +
        '✅ Try:\n' +
        '• Use Chrome or Edge\n' +
        '• Check Chrome menu: ⋮ → "Install CITA..."\n' +
        '• Build for production: npm run build && npm start'
      )
      return
    }

    try {
      addLog('✅ Showing install prompt...')
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      addLog(`📊 User response: ${outcome}`)

      if (outcome === 'accepted') {
        addLog('🎉 User accepted installation!')
        setIsInstalled(true)
      } else {
        addLog('😕 User dismissed installation')
      }

      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      addLog(`❌ Error: ${error}`)
    }
  }

  // Always show button for testing
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Install Button */}
      <button
        onClick={handleInstall}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold shadow-2xl transition-all hover:scale-105 ${
          isInstalled 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white cursor-not-allowed' 
            : isInstallable 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white animate-pulse' 
            : 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'
        }`}
        disabled={isInstalled}
      >
        {isInstalled ? (
          <>
            <CheckCircle className="w-6 h-6" />
            <span>Already Installed ✨</span>
          </>
        ) : isInstallable ? (
          <>
            <Download className="w-6 h-6 animate-bounce" />
            <span>Install App Now!</span>
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            <span>Install App</span>
          </>
        )}
      </button>

      {/* Debug Panel */}
      <div className="mt-3 bg-black/90 text-white rounded-xl p-4 text-xs font-mono">
        <div className="flex items-center gap-2 mb-2 font-bold text-yellow-400">
          <AlertCircle className="w-4 h-4" />
          <span>PWA Debug Info</span>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Installed:</span>
            <span className={isInstalled ? 'text-green-400' : 'text-red-400'}>
              {isInstalled ? '✅' : '❌'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Installable:</span>
            <span className={isInstallable ? 'text-green-400' : 'text-red-400'}>
              {isInstallable ? '✅' : '❌'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Prompt Ready:</span>
            <span className={deferredPrompt ? 'text-green-400' : 'text-red-400'}>
              {deferredPrompt ? '✅' : '❌'}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="font-bold mb-1 text-yellow-400">Console Logs:</div>
          <div className="max-h-32 overflow-y-auto space-y-0.5">
            {logs.slice(-5).map((log, i) => (
              <div key={i} className="text-gray-300 break-all">{log}</div>
            ))}
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-gray-700 text-gray-400">
          Press F12 → Console for full logs
        </div>
      </div>
    </div>
  )
}