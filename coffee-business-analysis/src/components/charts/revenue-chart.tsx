/**
 * REVENUE TREND CHART
 *
 * Line chart showing revenue over time
 * Used in Overview page
 *
 * FEATURES:
 * - Shows last 30 days of revenue
 * - Smooth animated line
 * - Hover tooltips
 * - Slate gray theme
 */

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Revenue Trend (Last 30 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          {/* X-axis (dates) */}
          <XAxis
            dataKey="date"
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            tickLine={false}
          />

          {/* Y-axis (revenue) */}
          <YAxis
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            tickLine={false}
            tickFormatter={(value) => `₱${value}`} // ← Change $ to ₱
          />

          {/* Hover tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [formatCurrency(value), "Revenue"]}
            labelStyle={{ color: "#cbd5e1", marginBottom: "4px" }}
          />

          {/* The line itself */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#475569"
            strokeWidth={3}
            dot={{ fill: "#475569", r: 4 }}
            activeDot={{ r: 6, fill: "#334155" }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          <p>No revenue data available</p>
        </div>
      )}
    </div>
  );
}

/**
 * LEARNING NOTES:
 *
 * 1. Why 'use client'?
 *    Recharts needs browser APIs (can't run on server)
 *    Client Components can use interactive features
 *
 * 2. What's ResponsiveContainer?
 *    Makes chart responsive to parent width
 *    Height set to 300px for consistency
 *
 * 3. What's type="monotone"?
 *    Creates smooth curved lines (not sharp angles)
 *    Looks more professional
 *
 * 4. What are dot and activeDot?
 *    dot = normal data points
 *    activeDot = data point when hovering
 *
 * 5. Can I change colors?
 *    Yes! Change stroke, fill values
 *    Use your brand colors
 *
 * 6. What's strokeDasharray?
 *    Creates dashed grid lines
 *    "3 3" = 3px dash, 3px gap
 */
