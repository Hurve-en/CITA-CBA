import { prisma } from '@/lib/prisma'
import { formatCurrency, calculatePercentageChange } from '@/lib/utils'
import { DollarSign, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PaymentChart } from '@/components/charts/payment-chart'
export const dynamic = 'force-dynamic'

async function getSalesData() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const sixtyDaysAgo = new Date(now)
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

  const [currentPeriodOrders, previousPeriodOrders, salesByPaymentMethod, topProducts] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      _count: true,
      where: { orderDate: { gte: thirtyDaysAgo } }
    }),
    prisma.order.aggregate({
      _sum: { total: true },
      _count: true,
      where: {
        orderDate: {
          gte: sixtyDaysAgo,
          lt: thirtyDaysAgo
        }
      }
    }),
    prisma.order.groupBy({
      by: ['paymentMethod'],
      _sum: { total: true },
      _count: true
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10
    })
  ])

  const productIds = topProducts.map(item => item.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  })

  const topProductsWithDetails = topProducts.map(item => {
    const product = products.find(p => p.id === item.productId)
    return {
      ...product,
      totalSold: item._sum.quantity || 0,
      totalRevenue: (item._sum.price || 0) * (item._sum.quantity || 0)
    }
  })

  const currentRevenue = currentPeriodOrders._sum.total || 0
  const previousRevenue = previousPeriodOrders._sum.total || 0
  const revenueGrowth = calculatePercentageChange(currentRevenue, previousRevenue)
  const currentOrderCount = currentPeriodOrders._count
  const previousOrderCount = previousPeriodOrders._count
  const orderGrowth = calculatePercentageChange(currentOrderCount, previousOrderCount)

  // Format payment data for chart
  const paymentChartData = salesByPaymentMethod.map(method => ({
    name: method.paymentMethod,
    value: method._sum.total || 0,
    count: method._count
  }))

  return {
    currentRevenue,
    revenueGrowth,
    currentOrderCount,
    orderGrowth,
    averageOrderValue: currentOrderCount > 0 ? currentRevenue / currentOrderCount : 0,
    salesByPaymentMethod,
    topProducts: topProductsWithDetails,
    paymentChartData
  }
}

export default async function SalesPage() {
  const data = await getSalesData()

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="mt-2 text-gray-600">
          Track your sales performance and identify trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Revenue" value={formatCurrency(data.currentRevenue)} change={data.revenueGrowth} icon={<DollarSign className="w-6 h-6" />} iconColor="bg-green-500" />
        <MetricCard title="Total Orders" value={data.currentOrderCount.toString()} change={data.orderGrowth} icon={<ShoppingBag className="w-6 h-6" />} iconColor="bg-blue-500" />
        <MetricCard title="Average Order Value" value={formatCurrency(data.averageOrderValue)} change={0} icon={<TrendingUp className="w-6 h-6" />} iconColor="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PAYMENT CHART - NEW! */}
        <PaymentChart data={data.paymentChartData} />

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h2>
          
          <div className="space-y-4">
            {data.topProducts.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-sm font-semibold text-slate-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.totalSold} sold • {formatCurrency(product.totalRevenue)}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                  {product.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Sales Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-slate-300 text-sm mb-1">Best Seller</p>
            <p className="text-2xl font-bold">
              {data.topProducts[0]?.name || 'N/A'}
            </p>
            <p className="text-slate-300 text-sm mt-1">
              {data.topProducts[0]?.totalSold || 0} units sold
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-slate-300 text-sm mb-1">Most Popular Payment</p>
            <p className="text-2xl font-bold capitalize">
              {data.salesByPaymentMethod[0]?.paymentMethod || 'N/A'}
            </p>
            <p className="text-slate-300 text-sm mt-1">
              {data.salesByPaymentMethod[0]?._count || 0} transactions
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-slate-300 text-sm mb-1">Growth Trend</p>
            <p className="text-2xl font-bold">
              {data.revenueGrowth > 0 ? '📈' : '📉'} {Math.abs(data.revenueGrowth)}%
            </p>
            <p className="text-slate-300 text-sm mt-1">
              vs previous period
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

function MetricCard({ title, value, change, icon, iconColor }: { title: string, value: string, change: number, icon: React.ReactNode, iconColor: string }) {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconColor} text-white mb-4`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {change !== 0 && (
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  )
}