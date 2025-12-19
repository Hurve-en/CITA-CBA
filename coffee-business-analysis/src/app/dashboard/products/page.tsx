import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatCurrency, truncateText } from '@/lib/utils'
import type { Product } from '@prisma/client'

type ProductWithMetrics = Product & {
  totalSold: number
  totalRevenue: number
  profitPerUnit: number
  marginPercent: number
}

export default async function ProductsPage() {
  // Fetch products
  const products: Product[] = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

  const productIds = products.map((p) => p.id)

  // Fetch order items for these products to compute sales metrics
  const orderItems = await prisma.orderItem.findMany({ where: { productId: { in: productIds } } })

  // Aggregate per-product totals
  const metricsMap = new Map<string, { quantity: number; revenue: number }>()
  for (const oi of orderItems) {
    const cur = metricsMap.get(oi.productId) || { quantity: 0, revenue: 0 }
    cur.quantity += oi.quantity
    cur.revenue += oi.quantity * oi.price
    metricsMap.set(oi.productId, cur)
  }

  // Compose products with metrics
  const productsWithMetrics: ProductWithMetrics[] = products.map((p) => {
    const m = metricsMap.get(p.id) || { quantity: 0, revenue: 0 }
    const profitPerUnit = p.price - p.cost
    const marginPercent = p.price > 0 ? Math.round(((profitPerUnit / p.price) * 100) * 10) / 10 : 0

    return {
      ...p,
      totalSold: m.quantity,
      totalRevenue: m.revenue,
      profitPerUnit,
      marginPercent,
    }
  })

  // Determine best sellers and slow movers
  const sortedBySold = [...productsWithMetrics].sort((a, b) => b.totalSold - a.totalSold)
  const topSellers = sortedBySold.slice(0, 3).map((p) => p.id)
  const slowMovers = sortedBySold.slice(-3).map((p) => p.id)

  // Category breakdown
  const categoryMap = new Map<string, { count: number; revenue: number }>()
  for (const p of productsWithMetrics) {
    const cur = categoryMap.get(p.category) || { count: 0, revenue: 0 }
    cur.count += 1
    cur.revenue += p.totalRevenue
    categoryMap.set(p.category, cur)
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between mb-6 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-sm text-gray-600">Inventory, margins, and sales performance.</p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-md"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
        <div className="col-span-2 bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-slate-700 mb-4">Product inventory</h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-fixed">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-slate-600 w-2/5">Name</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-600 w-1/6">Category</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Price</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Cost</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Stock</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Sold</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Revenue</th>
                  <th className="text-right px-4 py-3 text-sm text-slate-600 w-1/12">Margin</th>
                </tr>
              </thead>

              <tbody>
                {productsWithMetrics.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                      No products found. Add your first product.
                    </td>
                  </tr>
                )}

                {productsWithMetrics.map((p) => (
                  <tr key={p.id} className="border-b last:border-b-0 hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-sm font-semibold text-slate-700">
                          {p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{p.name}</div>
                          {p.description && <div className="text-xs text-slate-500">{truncateText(p.description, 60)}</div>}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">{p.category}</td>

                    <td className="px-4 py-3 text-sm text-slate-900 text-right whitespace-nowrap">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 text-right whitespace-nowrap">{formatCurrency(p.cost)}</td>

                    <td className={`px-4 py-3 text-sm text-right whitespace-nowrap ${p.stock <= 5 ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                      {p.stock}
                      {p.stock <= 5 && <span className="inline-block ml-2 px-2 py-0.5 text-xs bg-rose-100 text-rose-800 rounded">Low</span>}
                    </td>

                    <td className="px-4 py-3 text-sm text-right whitespace-nowrap">{p.totalSold}</td>

                    <td className="px-4 py-3 text-sm text-right whitespace-nowrap">{formatCurrency(p.totalRevenue)}</td>

                    <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                      <div className="text-sm">{p.marginPercent}%</div>
                      <div className="text-xs text-slate-500">{formatCurrency(p.profitPerUnit)} / unit</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="bg-white shadow rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Category breakdown</h3>
              <p className="text-xs text-slate-500 mt-1">Overview by product category</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">{formatCurrency(Array.from(categoryMap.values()).reduce((s, v) => s + v.revenue, 0))}</div>
              <div className="text-xs text-slate-400">revenue</div>
            </div>
          </div>

          <ul className="mt-4 space-y-4">
            {[...categoryMap.entries()].map(([cat, val]) => (
              <li key={cat} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">{cat.slice(0,2).toUpperCase()}</div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{cat}</div>
                    <div className="text-xs text-slate-400">{val.count} products</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">{formatCurrency(val.revenue)}</div>
                  <div className="text-xs text-slate-400">revenue</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Top sellers</h4>
            <ol className="space-y-3">
              {sortedBySold.slice(0, 5).map((p, idx) => (
                <li key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${idx===0 ? 'bg-amber-100 text-amber-800' : idx===1 ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-600'}`}>
                      {idx+1}
                    </div>
                    <div className="text-sm text-slate-900">{p.name}</div>
                  </div>
                  <div className="text-xs text-slate-500">{p.totalSold} sold</div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
