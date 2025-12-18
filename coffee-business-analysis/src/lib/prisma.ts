import { PrismaClient } from '@prisma/client'

// Extend the global namespace to include our prisma instance
// This prevents TypeScript from complaining about global.prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

/**
 * Create the Prisma Client instance
 * 
 * In production: Create new instance every time
 * In development: Reuse existing instance from global scope
 * 
 * Why the difference?
 * - Production runs once, no hot-reload
 * - Development hot-reloads constantly, would create too many connections
 */
export const prisma = global.prisma || new PrismaClient()

/**
 * In development, store the client in global scope
 * This survives hot-reloads and prevents connection spam
 */
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
