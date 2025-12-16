# ☕ Coffee Business Analysis Platform

A comprehensive, full-stack business analytics platform designed specifically for coffee ventures. Track sales, manage customers, analyze product performance, and make data-driven decisions to grow your coffee business.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192)
![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Features Guide](#key-features-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

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

## ✨ Features

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

## 📦 Prerequisites

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

## 🚀 Installation

### Step 1: Navigate to Project

```bash
cd coffee-business-analysis
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~300MB, takes 2-3 minutes).

**Packages Installed:**
- Next.js and React
- Prisma and Prisma Client
- Tailwind CSS
- Recharts
- Lucide React (icons)
- TypeScript and type definitions
- Development tools (ESLint, PostCSS, etc.)

---

## ⚙️ Configuration

### Step 1: Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### Step 2: Configure Database URL

Edit the `.env` file and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

#### Example Configurations:

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/coffee_business?schema=public"
```

**Supabase (Cloud):**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

**Railway (Cloud):**
```env
DATABASE_URL="postgresql://postgres:password@containers-us-west-xx.railway.app:7432/railway"
```

**Important Notes:**
- ⚠️ Never commit the `.env` file to Git (it's in `.gitignore`)
- ⚠️ Keep your database credentials secure
- ✅ Use `.env.example` as a template only

---

## 🗄️ Database Setup

### Option A: Cloud Database (Recommended for Beginners)

#### Using Supabase (Free Tier Available)

1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Click "New Project"
4. Fill in project details:
   - Name: `coffee-business-analysis`
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
5. Wait for project to be provisioned (~2 minutes)
6. Go to **Settings** → **Database**
7. Copy the **Connection String** (URI format)
8. Paste it in your `.env` file as `DATABASE_URL`

#### Using Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click on the database → "Connect" tab
5. Copy the "Postgres Connection URL"
6. Paste it in your `.env` file

### Option B: Local PostgreSQL

#### macOS (using Homebrew)
```bash
brew install postgresql
brew services start postgresql
createdb coffee_business
```

#### Ubuntu/Debian
```bash
sudo apt-get install postgresql
sudo service postgresql start
sudo -u postgres createdb coffee_business
```

#### Windows
1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. Use pgAdmin to create a database named `coffee_business`

### Initialize Database Schema

Once your database is configured:

```bash
# Push the schema to your database
npm run db:push
```

This creates all necessary tables:
- `Customer`
- `Product`
- `Order`
- `OrderItem`
- `MarketResearch`
- `FinancialMetric`

### Seed Sample Data (Optional but Recommended)

```bash
npm run db:seed
```

This adds sample data:
- 8 coffee products (Espresso, Cappuccino, Latte, etc.)
- 5 sample customers
- 50 orders (last 30 days)
- 3 market research entries
- 6 months of financial data

---

## 🎮 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at:
- **URL**: http://localhost:3000
- **Hot Reload**: Enabled (changes update automatically)
- **API Routes**: http://localhost:3000/api/*

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Other Useful Commands

```bash
# Open Prisma Studio (Database GUI)
npm run db:studio

# Run linter
npm run lint

# Update database schema
npm run db:push

# Regenerate Prisma Client
npx prisma generate
```

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

---

## 📖 Key Features Guide

### 1. Dashboard Overview (`/dashboard/overview`)

**What You'll See:**
- Total revenue (current month)
- Total orders count
- Active customers
- Revenue trend chart (last 30 days)
- Top 5 selling products
- Recent orders table
- Customer activity chart

**How to Use:**
- View real-time business metrics
- Identify sales trends
- Monitor top-performing products
- Track recent transactions

### 2. Sales Analytics (`/dashboard/sales`)

**What You'll See:**
- Sales performance over time
- Revenue vs. expenses comparison
- Profit margin trends
- Sales by category
- Payment method distribution
- Peak hours analysis

**How to Use:**
- Analyze sales patterns
- Compare revenue and costs
- Identify profitable products
- Optimize staffing for peak hours

### 3. Customer Management (`/dashboard/customers`)

**What You'll See:**
- Complete customer list
- Customer details (name, email, phone)
- Purchase history
- Loyalty points
- Visit frequency
- Total spent per customer

**How to Use:**
- Track customer behavior
- Identify VIP customers
- Manage loyalty rewards
- Analyze customer lifetime value

### 4. Product Performance (`/dashboard/products`)

**What You'll See:**
- Product inventory list
- Stock levels
- Sales performance per product
- Profit margins
- Low stock alerts
- Category performance

**How to Use:**
- Monitor inventory
- Identify best sellers
- Track profit margins
- Reorder low-stock items

### 5. Financial Reports (`/dashboard/reports`)

**What You'll See:**
- Profit & Loss statements
- Revenue breakdown
- Expense categories
- Monthly comparisons
- Profit trends
- Cash flow analysis

**How to Use:**
- Generate financial reports
- Track business profitability
- Monitor expenses
- Make budget decisions

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Customers API

#### Get All Customers
```http
GET /api/customers
```

**Response:**
```json
[
  {
    "id": "clx123...",
    "name": "Sarah Johnson",
    "email": "sarah.j@email.com",
    "phone": "+1-555-0101",
    "totalSpent": 245.50,
    "visitCount": 12,
    "loyaltyPoints": 245
  }
]
```

#### Create Customer
```http
POST /api/customers
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123"
}
```

### Products API

#### Get All Products
```http
GET /api/products
```

#### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Cappuccino",
  "description": "Espresso with steamed milk",
  "category": "Coffee",
  "price": 4.50,
  "cost": 1.20,
  "stock": 100
}
```

### Sales API

#### Get Sales Data
```http
GET /api/sales?startDate=2024-01-01&endDate=2024-01-31
```

### Analytics API

#### Get Business Metrics
```http
GET /api/analytics
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "New Project"
5. Import your repository
6. Add `DATABASE_URL` environment variable
7. Click "Deploy"

Your site will be live at: `https://your-project.vercel.app`

---

## 👨‍💻 Development Guide

### Adding a New Page

1. Create folder in `src/app/dashboard/`:
```bash
mkdir src/app/dashboard/inventory
```

2. Create `page.tsx`:
```tsx
export default function InventoryPage() {
  return (
    <div>
      <h1>Inventory Management</h1>
    </div>
  )
}
```

### Adding a New API Endpoint

1. Create folder in `src/app/api/`:
```bash
mkdir src/app/api/suppliers
```

2. Create `route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const suppliers = await prisma.supplier.findMany()
  return NextResponse.json(suppliers)
}
```

### Adding a Database Table

1. Edit `prisma/schema.prisma`:
```prisma
model Supplier {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
}
```

2. Push to database:
```bash
npm run db:push
```

---

## 🐛 Troubleshooting

### Port 3000 in use
```bash
npx kill-port 3000
```

### Database connection error
1. Check PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Ensure database exists

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Prisma errors
```bash
npx prisma generate
npm run db:push
```

---

## 📚 Resources

- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) by Vercel
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ☕ and ❤️ for coffee business owners**

*Last Updated: December 2024*