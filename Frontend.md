# CITA-CBA Frontend Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Features](#key-features)
5. [Page Architecture](#page-architecture)
6. [Component Library](#component-library)
7. [State Management](#state-management)
8. [Styling & Design](#styling--design)
9. [Performance Optimizations](#performance-optimizations)
10. [Authentication Flow](#authentication-flow)

---

## Overview

CITA (Coffee Intelligence & Tracking Analytics) is a modern, full-stack web application built with Next.js 14, designed to help coffee business owners manage and analyze their operations. The frontend is built with React Server Components, TypeScript, and Tailwind CSS, following modern web development best practices.

**Key Characteristics:**
- Server-side rendering (SSR) for optimal performance
- Progressive Web App (PWA) capabilities
- Multi-tenant architecture with user isolation
- Real-time data visualization
- Responsive design for mobile and desktop

---

## Technology Stack

### Core Framework
- **Next.js 14.0.4** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type safety

### Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **tailwind-merge 2.6.0** - Merge Tailwind classes
- **clsx 2.1.1** - Conditional className utility

### Data Fetching & Caching
- **TanStack React Query 5.90.12** - Server state management
- **React Query DevTools** - Development debugging

### UI Components & Icons
- **Lucide React 0.294.0** - Icon library
- **Recharts 2.10.3** - Chart library for data visualization

### Authentication
- **NextAuth.js 4.24.13** - Authentication solution
- **bcryptjs 3.0.3** - Password hashing

### Utilities
- **date-fns 3.0.0** - Date manipulation
- **react-hot-toast 2.6.0** - Toast notifications

### PWA
- **next-pwa 5.6.0** - Progressive Web App capabilities

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group routes
│   │   ├── auth/
│   │   │   ├── login/page.tsx    # Login page
│   │   │   └── signup/page.tsx   # Signup page
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── overview/page.tsx     # Main dashboard
│   │   ├── customers/page.tsx    # Customer management
│   │   ├── products/page.tsx     # Product management
│   │   ├── orders/page.tsx       # Order management
│   │   ├── sales/page.tsx        # Sales analytics
│   │   └── reports/page.tsx      # Reports page
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── customers/            # Customer CRUD
│   │   ├── products/             # Product CRUD
│   │   ├── orders/               # Order CRUD
│   │   └── health/               # Health check
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── providers.tsx             # Context providers
│   ├── error.tsx                 # Global error boundary
│   └── offline/page.tsx          # PWA offline page
│
├── components/                   # Reusable components
│   ├── error-boundary.tsx        # Error boundary component
│   ├── loading-skeleton.tsx      # Loading states
│   ├── monitoring-dashboard.tsx  # Dev monitoring UI
│   ├── query-provider.tsx        # React Query provider
│   ├── install-prompt.tsx        # PWA install prompt
│   └── optimized-image.tsx       # Image optimization
│
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── performance-monitor.ts    # Performance tracking
│   ├── error-logger.ts           # Error logging
│   ├── analytics.ts              # Analytics tracking
│   ├── memory-cache.ts           # In-memory caching
│   ├── api-cache.ts              # API response caching
│   ├── api-error-handler.ts      # Centralized error handling
│   ├── sanitize-input.ts         # Input sanitization
│   ├── rate-limiter.ts           # Rate limiting
│   ├── fetch-with-retry.ts       # Retry logic
│   ├── env.ts                    # Environment validation
│   └── web-vitals.ts             # Web Vitals reporting
│
├── hooks/                        # Custom React hooks
│   └── use-cached-data.ts        # Data fetching hook
│
└── styles/
    └── globals.css               # Global styles
```

---

## Key Features

### 1. Authentication & Authorization
- **Multi-tenant system**: Each user has isolated data
- **Secure authentication**: NextAuth.js with JWT sessions
- **Protected routes**: Middleware-based route protection
- **Password hashing**: bcryptjs for secure storage

### 2. Dashboard Overview
- **Real-time metrics**: Revenue, orders, customers, products
- **Interactive charts**: Sales trends, category breakdown
- **Recent activity**: Latest orders and customers
- **Quick actions**: Direct access to key features

### 3. Customer Management
- **CRUD operations**: Create, read, update, delete customers
- **Search & filter**: Find customers quickly
- **Import/Export**: CSV support for bulk operations
- **Customer insights**: Total spent, order history

### 4. Product Management
- **Inventory tracking**: Stock levels, low stock alerts
- **Category organization**: Coffee, pastries, merchandise
- **Profit margins**: Automatic calculation
- **Bulk operations**: Import/export, clear all

### 5. Order Management
- **Order creation**: Multi-item orders with quantities
- **Status tracking**: Pending, completed, cancelled
- **Order history**: Complete audit trail
- **Revenue calculation**: Real-time totals

### 6. Sales Analytics
- **Visual charts**: Bar charts, pie charts, line graphs
- **Time-based analysis**: Daily, weekly, monthly trends
- **Category performance**: Best-selling categories
- **Revenue tracking**: Historical data

### 7. Reports
- **Comprehensive insights**: All metrics in one place
- **Data visualization**: Charts and graphs
- **Export capability**: Generate reports for stakeholders

---

## Page Architecture

### Server Components vs Client Components

**Server Components (Default):**
- All dashboard pages (overview, customers, products, orders, sales, reports)
- Data fetching happens on the server
- Better performance, smaller JavaScript bundles
- Direct database access via Prisma

**Client Components ('use client'):**
- Interactive forms (login, signup)
- Components with useState, useEffect
- Event handlers (onClick, onChange)
- Toast notifications

### Data Fetching Pattern

```tsx
// Server Component - Direct DB access
export default async function CustomersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')
  
  const customers = await prisma.customer.findMany({
    where: { userId: session.user.id }
  })
  
  return <CustomersTable customers={customers} />
}
```

### Loading States

Each page has a dedicated `loading.tsx`:
```tsx
// app/dashboard/customers/loading.tsx
export default function Loading() {
  return <LoadingSkeleton />
}
```

### Error Boundaries

Each section has error handling:
```tsx
// app/dashboard/error.tsx
'use client'
export default function Error({ error, reset }) {
  return <ErrorUI error={error} retry={reset} />
}
```

---

## Component Library

### Core Components

#### 1. LoadingSkeleton
**Purpose**: Provide visual feedback during data loading

**Usage**:
```tsx
<LoadingSkeleton 
  count={5}           // Number of skeleton rows
  variant="table"     // table, card, list
/>
```

**Features**:
- Animated shimmer effect
- Multiple variants (table, card, list)
- Configurable count
- Matches actual content layout

#### 2. ErrorBoundary
**Purpose**: Catch and handle React errors gracefully

**Features**:
- Component-level error catching
- User-friendly error messages
- Retry functionality
- Error logging to monitoring system

#### 3. MonitoringDashboard
**Purpose**: Real-time performance and error monitoring (dev only)

**Features**:
- Performance metrics tracking
- Error log viewer
- Analytics event tracking
- Web Vitals monitoring
- Only visible in development mode

#### 4. OptimizedImage
**Purpose**: Lazy-loaded, optimized images

**Features**:
- Automatic format optimization (WebP, AVIF)
- Lazy loading
- Blur-up effect
- Responsive sizing

---

## State Management

### React Query (TanStack Query)

**Configuration**:
```tsx
// Query client with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes
      gcTime: 10 * 60 * 1000,     // 10 minutes
      refetchOnWindowFocus: true,
      retry: 3,
    }
  }
})
```

**Usage Pattern**:
```tsx
// Custom hook for data fetching
const { data, isLoading, error } = useCachedData(
  'customers',
  async () => {
    const res = await fetch('/api/customers')
    return res.json()
  }
)
```

**Benefits**:
- Automatic caching
- Background refetching
- Optimistic updates
- Retry on failure
- Stale-while-revalidate

### Memory Cache

**Server-side caching** for expensive operations:
```tsx
import { memoryCache } from '@/lib/memory-cache'

const stats = await memoryCache.getOrSet(
  'dashboard-stats',
  async () => calculateStats(),
  5 * 60 * 1000  // 5 min TTL
)
```

---

## Styling & Design

### Tailwind CSS Configuration

**Custom Colors**:
```js
colors: {
  slate: {
    50-900  // Primary brand color
  }
}
```

**Design Tokens**:
- Primary: `slate-700` to `slate-900`
- Background: `gray-50` to `white`
- Accents: `blue-600`, `green-600`, `red-600`

### Component Patterns

#### Cards
```tsx
<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
  {/* Content */}
</div>
```

#### Buttons
```tsx
<button className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all shadow-md">
  Action
</button>
```

#### Gradients
- Primary: `from-slate-700 to-slate-900`
- Background: `from-slate-50 via-white to-gray-50`

---

## Performance Optimizations

### 1. Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Reduced initial bundle size

### 2. Image Optimization
- Next.js Image component
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading

### 3. Caching Strategy
- **React Query**: Client-side data caching (5 min)
- **Memory Cache**: Server-side caching
- **HTTP Headers**: Static asset caching (1 year)

### 4. Database Optimization
- **Indexes** on frequently queried fields
- **Connection pooling**
- **Selective field loading**

### 5. Bundle Optimization
- Tree shaking (removes unused code)
- Code minification
- Package optimization (lucide-react, recharts)

### Performance Metrics
- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Bundle Size**: ~82 KB (first load)

---

## Authentication Flow

### Login Process
1. User enters credentials
2. Client sends POST to `/api/auth/signin`
3. NextAuth validates credentials against database
4. Password compared with bcrypt
5. JWT session token generated
6. User redirected to dashboard

### Session Management
```tsx
// Server component
const session = await getServerSession(authOptions)
if (!session) redirect('/auth/login')

// Client component
const { data: session } = useSession()
```

### Route Protection
**Middleware** (`middleware.ts`):
```tsx
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  
  if (!token && isDashboardRoute) {
    return NextResponse.redirect('/auth/login')
  }
}
```

### Data Isolation
Every database query filters by `userId`:
```tsx
const customers = await prisma.customer.findMany({
  where: { userId: session.user.id }  // Multi-tenant isolation
})
```

---

## Progressive Web App (PWA)

### Features
- **Installable**: Add to home screen
- **Offline capable**: Service worker caching
- **App-like**: Standalone display mode
- **Push notifications**: Ready (not implemented)

### Manifest Configuration
```json
{
  "name": "CITA - Coffee Business Analytics",
  "short_name": "CITA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#334155",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192" },
    { "src": "/icon-512.png", "sizes": "512x512" }
  ]
}
```

### Service Worker
- Caches static assets
- Network-first for API calls
- Cache-first for images
- Offline fallback page

---

## Development Tools

### Monitoring Dashboard
**Access**: Development mode only (purple button, top-right)

**Features**:
- **Performance**: Page load times, API response times
- **Errors**: Caught errors with stack traces
- **Analytics**: User events and actions
- **Web Vitals**: LCP, FID, CLS metrics

### React Query DevTools
**Access**: Development mode (bottom-right icon)

**Features**:
- View all queries and their state
- Manually refetch queries
- See cache contents
- Debug stale/fresh data

### Bundle Analyzer
**Command**: `npm run analyze`

**Features**:
- Visual bundle size chart
- Identify large dependencies
- Optimize imports

---

## Best Practices Followed

1. **TypeScript**: Full type safety throughout
2. **Error Boundaries**: Graceful error handling
3. **Loading States**: Visual feedback for all async operations
4. **Accessibility**: Semantic HTML, keyboard navigation
5. **SEO**: Meta tags, sitemap, robots.txt
6. **Security**: Input sanitization, rate limiting, CSRF protection
7. **Performance**: Code splitting, lazy loading, caching
8. **Testing**: Error logging, monitoring, analytics

---

## Common Patterns

### Adding a New Page

1. Create page file: `app/dashboard/new-page/page.tsx`
2. Add loading state: `app/dashboard/new-page/loading.tsx`
3. Add to navigation
4. Protect with authentication
5. Add to sitemap

### Creating a New Component

1. Create file: `components/my-component.tsx`
2. Add TypeScript types
3. Export component
4. Add to storybook (if applicable)
5. Document usage

### Making API Calls

```tsx
// Using fetch with retry
import { fetchWithRetry } from '@/lib/fetch-with-retry'

const data = await fetchWithRetry('/api/customers')
```

---

## Troubleshooting

### Common Issues

**Issue**: "Hydration mismatch"
**Solution**: Ensure client and server render the same content initially

**Issue**: "Session not found"
**Solution**: Check NextAuth configuration, verify database connection

**Issue**: "Slow page load"
**Solution**: Check React Query DevTools, optimize database queries

---

## Future Enhancements

- [ ] Dark mode
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Real-time updates (WebSockets)
- [ ] Advanced filtering
- [ ] Data export (Excel, PDF)
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

*Last Updated: December 2024*