import { prisma } from '@/lib/prisma'
import OrdersPageClient from './orders-client'
export const dynamic = 'force-dynamic'

async function getOrdersData() {
  const [orders, customers, products] = await Promise.all([
    prisma.order.findMany({
      orderBy: { orderDate: 'desc' },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                category: true
              }
            }
          }
        }
      }
    }),
    prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy: { name: 'asc' }
    }),
    prisma.product.findMany({
      where: { stock: { gt: 0 } },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: true
      },
      orderBy: { name: 'asc' }
    })
  ])

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  }

  return {
    orders,
    customers,
    products,
    stats
  }
}

export default async function OrdersPage() {
  const data = await getOrdersData()
  
  return (
    <OrdersPageClient 
      initialOrders={data.orders} 
      customers={data.customers}
      products={data.products}
      stats={data.stats}
    />
  )
}