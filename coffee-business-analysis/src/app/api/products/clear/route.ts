/**
 * CLEAR ALL PRODUCTS API
 * 
 * DELETE /api/products/clear
 * 
 * Deletes ALL products from database
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE() {
  try {
    // Delete all products (order items will be handled by cascade)
    const result = await prisma.product.deleteMany({})
    
    return NextResponse.json({ 
      success: true, 
      message: `Deleted ${result.count} products`,
      count: result.count 
    })

  } catch (error) {
    console.error('Error clearing products:', error)
    return NextResponse.json(
      { error: 'Failed to clear products' },
      { status: 500 }
    )
  }
}