# Cafe Website Analysis

A comprehensive, full-stack business analytics platform designed specifically for coffee ventures. Track sales, manage customers, analyze product performance, and make data-driven decisions to grow your coffee business.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)

---

## Overview

The Coffee Business Analysis Platform is a modern web application built to help coffee shop owners and managers make informed business decisions through comprehensive data analytics and visualizations.

### What This Platform Does:

- **📊 Dashboard Analytics** - Real-time business metrics and KPIs
- **💰 Sales Tracking** - Monitor revenue, trends, and performance
- **👥 Customer Management** - Track customer behavior and loyalty
- **☕ Product Analytics** - Monitor inventory and product performance
- **📈 Financial Reports** - Detailed P&L statements and cash flow
- **🔍 Market Research** - Document and analyze market insights

### Who Is This For?

- Coffee shop owners
- Business managers
- Financial analysts
- Marketing teams
- Anyone wanting to understand their coffee business better

---

## Features

### Dashboard Overview
- Real-time revenue tracking
- Total orders and customer count
- Revenue trend charts (last 30 days)
- Top-selling products
- Recent orders table
- Customer activity visualization

### Sales Analytics
- Daily, weekly, and monthly sales reports
- Revenue vs. expenses comparison
- Profit margin analysis
- Sales by product category
- Payment method breakdown
- Peak hours identification

### Customer Management
- Complete customer database
- Purchase history tracking
- Loyalty points system
- Customer lifetime value (CLV)
- Visit frequency analysis
- Customer segmentation

### Product Performance
- Product inventory tracking
- Sales performance by product
- Profit margins per item
- Low stock alerts
- Category-wise analysis
- Performance trends

### Financial Reports
- Monthly profit & loss statements
- Revenue breakdown
- Expense categories
- Monthly comparisons
- Profit trends
- Cash flow analysis

### Market Research
- Research documentation
- Findings organization
- Competitive analysis
- Customer feedback tracking
- Trend identification

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: Custom components with [Lucide React](https://lucide.dev/) icons
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library

### Backend
- **API**: Next.js API Routes (serverless functions)
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation ORM
- **Validation**: TypeScript + Prisma Client

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Type Checking**: TypeScript
- **Database GUI**: Prisma Studio

### Deployment
- **Hosting**: [Vercel](https://vercel.com/) (recommended)
- **Database**: Supabase, Railway, or any PostgreSQL provider
- **CI/CD**: Automatic deployments via Git

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download: https://nodejs.org/
   - Check version: `node -v`

2. **npm** (comes with Node.js)
   - Check version: `npm -v`

3. **PostgreSQL** (v12 or higher)
   - **Option A**: Local installation from https://www.postgresql.org/download/
   - **Option B**: Cloud database (Supabase, Railway, Neon) - Recommended for beginners

4. **Git** (optional, but recommended)
   - Download: https://git-scm.com/

### Recommended Tools

- **Code Editor**: [VS Code](https://code.visualstudio.com/)
- **VS Code Extensions**:
  - Prisma
  - Tailwind CSS IntelliSense
  - ESLint
  - TypeScript and JavaScript Language Features

---


## 📁 Project Structure

```
coffee-business-analysis/
│
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── page.tsx                 # Home page (/)
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   │
│   │   ├── dashboard/               # Dashboard pages
│   │   │   ├── overview/            # Main dashboard
│   │   │   │   └── page.tsx        # /dashboard/overview
│   │   │   ├── sales/               # Sales analytics
│   │   │   │   └── page.tsx        # /dashboard/sales
│   │   │   ├── customers/           # Customer management
│   │   │   │   └── page.tsx        # /dashboard/customers
│   │   │   ├── products/            # Product tracking
│   │   │   │   └── page.tsx        # /dashboard/products
│   │   │   └── reports/             # Financial reports
│   │   │       └── page.tsx        # /dashboard/reports
│   │   │
│   │   └── api/                     # API Routes
│   │       ├── customers/
│   │       │   └── route.ts        # Customer CRUD
│   │       ├── products/
│   │       │   └── route.ts        # Product CRUD
│   │       ├── sales/
│   │       │   └── route.ts        # Sales data
│   │       └── analytics/
│   │           └── route.ts        # Analytics calculations
│   │
│   ├── components/                  # React Components
│   │   ├── ui/                     # Basic UI components
│   │   ├── layout/                 # Layout components
│   │   ├── charts/                 # Chart components
│   │   └── dashboard/              # Dashboard widgets
│   │
│   ├── lib/                        # Utility functions
│   │   ├── prisma.ts              # Prisma client instance
│   │   └── utils.ts               # Helper functions
│   │
│   └── types/                      # TypeScript types
│       └── index.ts               # Type definitions
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Seed data script
│
├── public/                         # Static files
│   ├── images/                    # Images
│   └── data/                      # Static data
│
├── Configuration Files
├── .env                           # Environment variables (SECRET!)
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js config
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
├── postcss.config.js              # PostCSS config
└── README.md                      # This file
```



## Resources

- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## Acknowledgments

- [Next.js](https://nextjs.org/) by Vercel
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
