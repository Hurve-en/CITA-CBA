/**
 * IMPORT MODAL
 * 
 * Generic modal for importing CSV files
 * 
 * FEATURES:
 * - File upload
 * - CSV preview
 * - Validation
 * - Progress tracking
 */

'use client'

import { useState } from 'react'
import { X, Upload, AlertCircle, CheckCircle, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  templateHeaders: string[]
  validateFn: (data: any[]) => { valid: boolean, errors: string[] }
  importFn: (data: any[]) => Promise<any>
  exampleRow?: string
}

export function ImportModal({ 
  isOpen, 
  onClose, 
  title, 
  templateHeaders, 
  validateFn, 
  importFn,
  exampleRow 
}: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(false)
  const [importing, setImporting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file')
      return
    }

    setFile(selectedFile)
    
    // Read and parse CSV
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      parseCSV(text)
    }
    reader.readAsText(selectedFile)
  }

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim())
    if (lines.length === 0) {
      toast.error('CSV file is empty')
      return
    }

    const headers = lines[0].split(',').map(h => h.trim())
    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length === headers.length) {
        const row: any = {}
        headers.forEach((header, index) => {
          row[header] = values[index].trim()
        })
        data.push(row)
      }
    }

    setCsvData(data)
    
    // Validate
    const validation = validateFn(data)
    setIsValid(validation.valid)
    setErrors(validation.errors)

    if (validation.valid) {
      toast.success(`✅ ${data.length} rows validated successfully!`)
    } else {
      toast.error(`❌ Found ${validation.errors.length} errors`)
    }
  }

  const parseCSVLine = (line: string): string[] => {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const nextChar = line[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }

    result.push(current)
    return result
  }

  const handleImport = async () => {
    if (!isValid) return

    setImporting(true)
    const loadingToast = toast.loading('Importing data...')

    try {
      const result = await importFn(csvData)
      
      toast.success(`✅ ${result.message}`, {
        id: loadingToast,
        duration: 5000
      })

      if (result.errors && result.errors.length > 0) {
        console.log('Import errors:', result.errors)
      }

      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (error: any) {
      toast.error(`❌ Import failed: ${error.message}`, {
        id: loadingToast
      })
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const template = [templateHeaders.join(',')]
    if (exampleRow) {
      template.push(exampleRow)
    }
    const blob = new Blob([template.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-template.csv`
    link.click()
  }

  const reset = () => {
    setFile(null)
    setCsvData([])
    setErrors([])
    setIsValid(false)
    setImporting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Download Template */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Need a template?</p>
                <p className="text-sm text-blue-700 mt-1">
                  Download our CSV template with the correct format
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Template
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-500 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">CSV files only</p>
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Validation Results */}
          {csvData.length > 0 && (
            <div className="mb-6">
              {isValid ? (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Validation Passed!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      {csvData.length} rows ready to import
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">
                        Validation Failed
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Please fix the following errors:
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 space-y-1 max-h-40 overflow-y-auto">
                    {errors.map((error, idx) => (
                      <p key={idx} className="text-xs text-red-600">• {error}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {csvData.length > 0 && isValid && (
            <div className="mb-6 max-h-60 overflow-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {Object.keys(csvData[0]).map(header => (
                      <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {csvData.slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((value: any, vidx) => (
                        <td key={vidx} className="px-4 py-2 text-gray-900">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {csvData.length > 5 && (
                <p className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                  ... and {csvData.length - 5} more rows
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                reset()
                onClose()
              }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!isValid || importing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? 'Importing...' : `Import ${csvData.length} Rows`}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}