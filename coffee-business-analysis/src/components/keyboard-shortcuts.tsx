'use client'

/**
 * KEYBOARD SHORTCUTS
 * 
 * Create: src/components/keyboard-shortcuts.tsx
 * Power user keyboard navigation
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Command } from 'lucide-react'

export function KeyboardShortcuts() {
  const router = useRouter()
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K - Show shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowHelp(!showHelp)
      }

      // Ctrl/Cmd + 1-6 - Navigate
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
        e.preventDefault()
        const routes = [
          '/dashboard/overview',
          '/dashboard/sales',
          '/dashboard/customers',
          '/dashboard/products',
          '/dashboard/orders',
          '/dashboard/reports'
        ]
        router.push(routes[parseInt(e.key) - 1])
      }

      // Ctrl/Cmd + N - New order (when on orders page)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        if (window.location.pathname.includes('/orders')) {
          e.preventDefault()
          // Trigger create order modal
          const createButton = document.querySelector('[data-create-order]') as HTMLButtonElement
          createButton?.click()
        }
      }

      // Escape - Close modals
      if (e.key === 'Escape') {
        setShowHelp(false)
      }

      // Ctrl/Cmd + / - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        searchInput?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [router, showHelp])

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Show keyboard shortcuts' },
    { keys: ['Ctrl', '1'], description: 'Go to Overview' },
    { keys: ['Ctrl', '2'], description: 'Go to Sales' },
    { keys: ['Ctrl', '3'], description: 'Go to Customers' },
    { keys: ['Ctrl', '4'], description: 'Go to Products' },
    { keys: ['Ctrl', '5'], description: 'Go to Orders' },
    { keys: ['Ctrl', '6'], description: 'Go to Reports' },
    { keys: ['Ctrl', 'N'], description: 'Create new order' },
    { keys: ['Ctrl', '/'], description: 'Focus search' },
    { keys: ['Esc'], description: 'Close modals' },
  ]

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-8 right-8 z-40 p-3 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-800 hover:scale-110 transition-all"
        title="Keyboard shortcuts (Ctrl+K)"
      >
        <Command className="w-5 h-5" />
      </button>

      {/* Shortcuts Modal */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Keyboard Shortcuts</h2>
                <p className="text-sm text-slate-600 mt-1">Navigate faster with hotkeys</p>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-slate-700 font-medium">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <kbd className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-mono text-slate-700">
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-slate-400">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
              <p className="text-sm text-slate-600">
                Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}