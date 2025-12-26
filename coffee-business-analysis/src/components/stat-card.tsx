'use client'
/**
 * ENHANCED STAT CARD
 * 
 * Beautiful cards with hover effects and animations
 */

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  onClick?: () => void
}

const colorVariants = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    text: 'text-blue-600'
  },
  green: {
    bg: 'from-green-500 to-green-600',
    light: 'bg-green-50',
    text: 'text-green-600'
  },
  purple: {
    bg: 'from-purple-500 to-purple-600',
    light: 'bg-purple-50',
    text: 'text-purple-600'
  },
  orange: {
    bg: 'from-orange-500 to-orange-600',
    light: 'bg-orange-50',
    text: 'text-orange-600'
  },
  red: {
    bg: 'from-red-500 to-red-600',
    light: 'bg-red-50',
    text: 'text-red-600'
  }
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  onClick
}: StatCardProps) {
  const colors = colorVariants[color]

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white rounded-2xl border border-gray-200 p-6
        shadow-sm hover:shadow-xl
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${colors.bg} rounded-full transform translate-x-16 -translate-y-16`}></div>
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`${colors.light} p-3 rounded-xl`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          
          {/* Trend Badge */}
          {trend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`
                px-2 py-1 rounded-lg text-xs font-bold
                ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
              `}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-slate-900 mb-2"
        >
          {value}
        </motion.div>

        {/* Title */}
        <div className="text-sm font-medium text-slate-600">
          {title}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-br ${colors.bg} blur-3xl
        transition-opacity duration-300 -z-10
      `}></div>
    </motion.div>
  )
}

// Usage Example:
// <StatCard
//   title="Total Revenue"
//   value="$12,345"
//   icon={DollarSign}
//   trend={{ value: 12.5, isPositive: true }}
//   color="green"
//   onClick={() => console.log('Clicked!')}
// />