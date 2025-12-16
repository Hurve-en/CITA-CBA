const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Clear data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()
  await prisma.marketResearch.deleteMany()
  await prisma.financialMetric.deleteMany()
  console.log('✅ Cleared old data')
  
  // Create products
  const espresso = await prisma.product.create({
    data: { name: 'Espresso', description: 'Rich espresso', category: 'Coffee', price: 3.50, cost: 0.80, stock: 500, isActive: true }
  })
  const cappuccino = await prisma.product.create({
    data: { name: 'Cappuccino', description: 'Espresso with milk', category: 'Coffee', price: 4.50, cost: 1.20, stock: 450, isActive: true }
  })
  const latte = await prisma.product.create({
    data: { name: 'Latte', description: 'Smooth latte', category: 'Coffee', price: 4.75, cost: 1.30, stock: 480, isActive: true }
  })
  console.log('✅ Created 3 products')
  
  // Create customers
  const sarah = await prisma.customer.create({
    data: { name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1-555-0101', totalSpent: 0, visitCount: 0, loyaltyPoints: 0 }
  })
  const michael = await prisma.customer.create({
    data: { name: 'Michael Chen', email: 'mchen@email.com', phone: '+1-555-0102', totalSpent: 0, visitCount: 0, loyaltyPoints: 0 }
  })
  console.log('✅ Created 2 customers')
  
  // Create 5 orders
  for (let i = 0; i < 5; i++) {
    const products = [espresso, cappuccino, latte]
    const customers = [sarah, michael]
    const product = products[Math.floor(Math.random() * products.length)]
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const quantity = Math.floor(Math.random() * 2) + 1
    const total = product.price * quantity
    
    await prisma.order.create({
      data: {
        customerId: customer.id,
        orderDate: new Date(),
        total: total,
        status: 'completed',
        paymentMethod: 'card',
        items: {
          create: {
            productId: product.id,
            quantity: quantity,
            price: product.price
          }
        }
      }
    })
    
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        totalSpent: { increment: total },
        visitCount: { increment: 1 },
        loyaltyPoints: { increment: Math.floor(total) }
      }
    })
  }
  console.log('✅ Created 5 orders')
  
  console.log('🎉 Seed completed!')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
