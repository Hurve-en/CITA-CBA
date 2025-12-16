# Coffee Business Analysis Platform

A comprehensive business analysis platform for coffee ventures, featuring market research, financial analytics, customer insights, and growth tracking.

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your database:
```bash
# Copy environment variables
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Project Structure

```
src/
 app/                    # Next.js 14 app directory
    api/               # API routes
    dashboard/         # Dashboard pages
    page.tsx           # Home page
 components/            # React components
    ui/               # Reusable UI components
    layout/           # Layout components
    charts/           # Chart components
    dashboard/        # Dashboard-specific components
 lib/                  # Utility functions
 types/                # TypeScript types

prisma/
 schema.prisma         # Database schema
 seed.ts              # Database seeding script
```

## Features

-  Sales Analytics Dashboard
-  Customer Management & Insights
-  Product Performance Tracking
-  Financial Metrics & Reports
-  Growth Opportunity Analysis
-  Market Research Tools

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Deployment

The easiest way to deploy is using Vercel (https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your DATABASE_URL environment variable
4. Deploy!

## License

MIT
