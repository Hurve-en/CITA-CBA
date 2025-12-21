/**
 * CLEAR ALL CUSTOMERS API
 * 
 * DELETE /api/customers/clear
 * 
 * Deletes ALL customers from database
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE() {
  try {
    // Delete all customers (orders will be handled by cascade)
    const result = await prisma.customer.deleteMany({})
    
    return NextResponse.json({ 
      success: true, 
      message: `Deleted ${result.count} customers`,
      count: result.count 
    })

  } catch (error) {
    console.error('Error clearing customers:', error)
    return NextResponse.json(
      { error: 'Failed to clear customers' },
      { status: 500 }
    )
  }
}