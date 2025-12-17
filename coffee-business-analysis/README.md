# ☕ Coffee Business Analysis Platform
### Built by CITA

A comprehensive business analytics platform designed specifically for coffee ventures. Our team at CITA created this tool to help coffee shop owners track sales, manage customers, analyze product performance, and make data-driven decisions to grow their business.

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

We built this platform after spending weeks talking to coffee shop owners about their biggest headaches. Turns out, most were flying blind—making inventory decisions without sales data, pricing products without knowing actual profit margins, and guessing which customers were their most valuable.

So we built something better.

### What This Does:

- **📊 Dashboard Analytics** - See your real numbers in real-time
- **💰 Sales Tracking** - Know what's selling and when
- **👥 Customer Management** - Track who's buying and how often
- **☕ Product Analytics** - Understand which products actually make money
- **📈 Financial Reports** - Real P&L statements, not spreadsheet nightmares
- **🔍 Market Research** - Document insights as you learn

### Who This Is For:

- Coffee shop owners tired of guessing
- Managers who want real data
- Anyone running a coffee business who wishes they had better tools

---

## ✨ Features

We focused on building features that actually matter to coffee businesses. No fluff, just the stuff you need to make better decisions.

### Dashboard Overview
Real numbers at a glance. Revenue, orders, customers—everything you need to know how your day or month is going. Plus charts that actually tell you something useful.

### Sales Analytics
Daily, weekly, monthly—however you want to slice it. See what's selling, when it's selling, and how much money you're actually making after costs. We also show you your busiest times so you can staff appropriately.

### Customer Management
Keep track of who's buying from you. Built-in loyalty points system, purchase history, and easy ways to identify your VIP customers who keep your lights on.

### Product Performance
Know which products are winners and which are just taking up menu space. Track inventory, analyze profitability per item, and get alerts when you're running low on stock.

### Financial Reports
Clean P&L statements without the spreadsheet headache. Track expenses, monitor cash flow, and see your profit trends over time.

### Market Research
Document what you learn about your customers and competitors. Track trends, organize feedback, and keep all your insights in one place.

---

## 🛠 Tech Stack

We chose tools that are reliable, well-supported, and won't become obsolete next year:

### Frontend
- **Next.js 14** - Fast, modern, and great for SEO
- **TypeScript** - Catches bugs before they happen
- **Tailwind CSS** - Clean, consistent styling
- **Lucide React** - Beautiful icons
- **Recharts** - Charts that don't look like Excel

### Backend
- **Supabase** - Used for Backend Database, Auth, API, Storage , Real time updates
- **Next.js API Routes** - Simple serverless functions
- **PostgreSQL** - Rock-solid database that scales
- **Prisma** - Makes database work actually enjoyable

### Why These Choices?

We're a small team. We needed tools that are powerful but not complicated, popular enough to have good documentation, and stable enough that we're not rewriting everything next year. These fit the bill.

---

## 📦 Prerequisites

You'll need these installed on your computer:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - Either local or cloud (we recommend Supabase for simplicity)
3. **Git** (optional but helpful)

That's it. If you can install those three things, you can run this.

---

## 🚀 Installation

### Step 1: Get the code
```bash
cd coffee-business-analysis
```

### Step 2: Install dependencies
```bash
npm install
```

Takes a few minutes. Grab a coffee while you wait. ☕

---

## ⚙️ Configuration

### Step 1: Set up environment variables
```bash
cp .env.example .env
```

### Step 2: Add your database URL

Open `.env` and add your database connection:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

**Using Supabase?** (We recommend it—it's free and simple)
1. Go to [supabase.com](https://supabase.com)
2. Create a project
3. Copy the connection string
4. Paste it in your `.env` file

**Important:** Never commit your `.env` file to Git. It has your secrets in it.

---

## 🗄️ Database Setup

### Initialize the database
```bash
npm run db:push
```

This creates all the tables you need.

### Add sample data (optional but helpful)
```bash
npm run db:seed
```

This gives you sample products, customers, and orders to play with. Makes it easier to see how everything works before adding real data.

---

## 🎮 Running the Application

### Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

That's it. You're running.

### Other useful commands
```bash
npm run db:studio    # Visual database editor (super handy)
npm run build        # Build for production
npm run start        # Run production build
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
│   └── seed.js                    # Seed data script
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
View real-time business metrics, identify sales trends, monitor top-performing products, and track recent transactions.

### 2. Sales Analytics (`/dashboard/sales`)

**What You'll See:**
- Sales performance over time
- Revenue vs. expenses comparison
- Profit margin trends
- Sales by category
- Payment method distribution
- Peak hours analysis

**How to Use:**
Analyze sales patterns, compare revenue and costs, identify profitable products, and optimize staffing for peak hours.

### 3. Customer Management (`/dashboard/customers`)

**What You'll See:**
- Complete customer list
- Customer details (name, email, phone)
- Purchase history
- Loyalty points
- Visit frequency
- Total spent per customer

**How to Use:**
Track customer behavior, identify VIP customers, manage loyalty rewards, and analyze customer lifetime value.

### 4. Product Performance (`/dashboard/products`)

**What You'll See:**
- Product inventory list
- Stock levels
- Sales performance per product
- Profit margins
- Low stock alerts
- Category performance

**How to Use:**
Monitor inventory, identify best sellers, track profit margins, and reorder low-stock items.

### 5. Financial Reports (`/dashboard/reports`)

**What You'll See:**
- Profit & Loss statements
- Revenue breakdown
- Expense categories
- Monthly comparisons
- Profit trends
- Cash flow analysis

**How to Use:**
Generate financial reports, track business profitability, monitor expenses, and make budget decisions.

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

We recommend Vercel—it's free for small projects and works great with Next.js:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your repository
4. Add your `DATABASE_URL` environment variable
5. Click deploy

Done. Your site is live.

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

**Port 3000 already in use?**
```bash
npx kill-port 3000
```

**Database won't connect?**
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running
- Verify the database exists

**Something's broken?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

Still stuck? The error message usually tells you what's wrong. Read it carefully.

---

## 🤝 About the CITA Team

We're a small startup team building tools that actually help people. This platform is just the beginning—we're working on more features and tools for small businesses.

Have feedback? Want to contribute? Found a bug? We'd love to hear from you.

**Built with ☕ and real coffee shop experience**

---

## 📚 Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## 🙏 Credits

Shoutout to the teams behind Next.js, Prisma, Tailwind CSS, Recharts, and Lucide Icons. We're standing on the shoulders of giants.

---

**CITA** - Building tools that actually help  
*Last Updated: December 2024*