'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Package, AlertTriangle, DollarSign, Coffee, ShoppingBag, Plus, Edit, Trash2 } from 'lucide-react'
import { ProductModal } from '@/components/modals/product-modal'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string | null
  category: string
  price: number
  cost: number
  stock: number
  imageUrl: string | null
  isActive: boolean
  totalSold: number
  totalRevenue: number
  profitMargin: number
}

interface ProductsPageProps {
  initialProducts: Product[]
  stats: {
    totalProducts: number
    inStockProducts: number
    lowStockProducts: number
    totalInventoryValue: number
  }
}

export default function ProductsPageClient({ initialProducts, stats }: ProductsPageProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSave = async (productData: any) => {
    setLoading(true)
    
    const loadingToast = toast.loading(productData.id ? 'Updating product...' : 'Adding product...')
    
    try {
      const isEditing = !!productData.id
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      if (!response.ok) throw new Error('Failed to save product')

      toast.success(isEditing ? '✅ Product updated successfully!' : '✅ Product added successfully!', {
        id: loadingToast,
      })
      
      setTimeout(() => window.location.reload(), 800)
      
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('❌ Failed to save product. Please try again.', {
        id: loadingToast,
      })
      setLoading(false)
    }
  }

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Deleting product...')

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete product')

      toast.success('✅ Product deleted successfully!', {
        id: loadingToast,
      })
      
      setTimeout(() => window.location.reload(), 800)
      
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('❌ Failed to delete product. Please try again.', {
        id: loadingToast,
      })
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">Manage your product inventory and track performance.</p>
        </div>
        
        <button
          onClick={handleAdd}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts.toString()} icon={<Package className="w-6 h-6" />} iconColor="bg-blue-500" />
        <StatCard title="In Stock" value={stats.inStockProducts.toString()} icon={<ShoppingBag className="w-6 h-6" />} iconColor="bg-green-500" />
        <StatCard title="Low Stock" value={stats.lowStockProducts.toString()} icon={<AlertTriangle className="w-6 h-6" />} iconColor="bg-yellow-500" />
        <StatCard title="Inventory Value" value={formatCurrency(stats.totalInventoryValue)} icon={<DollarSign className="w-6 h-6" />} iconColor="bg-purple-500" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Margin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => {
                const isLowStock = product.stock < 100 && product.stock > 0
                const isOutOfStock = product.stock === 0
                const profitColor = product.profitMargin >= 60 ? 'text-green-600' : product.profitMargin >= 40 ? 'text-yellow-600' : 'text-red-600'

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Coffee className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatCurrency(product.cost)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${profitColor}`}>{product.profitMargin.toFixed(1)}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{product.stock}</span>
                        {isLowStock && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        {isOutOfStock && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isOutOfStock ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Out of Stock</span>
                      ) : isLowStock ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Low Stock</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          disabled={loading}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={loading}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSave}
        product={editingProduct}
      />

    </div>
  )
}

function StatCard({ title, value, icon, iconColor }: { title: string, value: string, icon: React.ReactNode, iconColor: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconColor} text-white mb-4`}>{icon}</div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}