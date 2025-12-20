/**
 * PRODUCTS BULK IMPORT API
 * 
 * POST /api/products/import
 * 
 * Accepts CSV data and bulk creates products
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { products } = body

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'No product data provided' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (const product of products) {
      try {
        // Create product
        await prisma.product.create({
          data: {
            name: product.name,
            description: product.description || null,
            category: product.category,
            price: parseFloat(product.price),
            cost: parseFloat(product.cost),
            stock: parseInt(product.stock) || 0,
            imageUrl: null,
            isActive: true
          }
        })

        results.success++
      } catch (error) {
        results.failed++
        results.errors.push(`${product.name}: ${error}`)
      }
    }

    return NextResponse.json({
      message: `Imported ${results.success} products. ${results.failed} failed.`,
      ...results
    })

  } catch (error) {
    console.error('Error importing products:', error)
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    )
  }
}