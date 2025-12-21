/**
 * CUSTOMERS BULK IMPORT API
 * 
 * Imports customers with ZERO stats
 * Stats will be calculated when orders are imported!
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customers } = body

    if (!customers || !Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json(
        { error: 'No customer data provided' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (const customer of customers) {
      try {
        // Check if email already exists
        const existing = await prisma.customer.findUnique({
          where: { email: customer.email }
        })

        if (existing) {
          results.failed++
          results.errors.push(`${customer.email}: Email already exists`)
          continue
        }

        // Create customer with DEFAULT stats (will be updated by orders)
        await prisma.customer.create({
          data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone || null,
            address: customer.address || null,
            totalSpent: 0,        // Starts at 0
            visitCount: 0,        // Starts at 0
            loyaltyPoints: 0,     // Starts at 0
            lastVisit: null       // No visits yet
          }
        })

        results.success++
      } catch (error) {
        results.failed++
        results.errors.push(`${customer.name}: ${error}`)
      }
    }

    return NextResponse.json({
      message: `Imported ${results.success} customers. ${results.failed} failed.`,
      ...results
    })

  } catch (error) {
    console.error('Error importing customers:', error)
    return NextResponse.json(
      { error: 'Failed to import customers' },
      { status: 500 }
    )
  }
}