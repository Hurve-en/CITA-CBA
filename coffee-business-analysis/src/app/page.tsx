import Link from 'next/link'
import { ArrowRight, BarChart3, Users, Coffee, TrendingUp, DollarSign, FileText } from 'lucide-react'
import { InstallPrompt } from '@/components/install-prompt'
import type { Metadata } from 'next'

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: 'Home',
  description: 'CITA - Comprehensive analytics and management platform for coffee businesses. Track sales, manage inventory, analyze customers, and grow your coffee shop.',
  openGraph: {
    title: 'CITA - Coffee Business Analytics Platform',
    description: 'Transform your coffee business with data-driven insights',
    images: ['/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">CITA</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login"
              className="px-6 py-2 text-gray-700 font-medium hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-950 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(100,116,139,0.08),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <Coffee className="w-4 h-4" />
              <span>Brew Better Business Decisions</span>
            </div>
          </div>

          <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 animate-slide-up">
            Transform Your
            <span className="block bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent animate-slide-up-delay-1">
              Coffee Business
            </span>
          </h1>

          <p className="text-center text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up-delay-2">
            CITA Comprehensive analytics and insights to help you make data-driven decisions, 
            track performance, and grow your coffee venture with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-3">
            <Link 
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link 
              href="/auth/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for coffee businesses to track, analyze, and optimize operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Sales Analytics"
              description="Track revenue trends, identify peak hours, and monitor sales performance across all products and categories."
              gradient="from-blue-500 to-cyan-500"
              delay="0ms"
            />

            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Customer Insights"
              description="Understand customer behavior, track loyalty points, and identify your most valuable customers."
              gradient="from-purple-500 to-pink-500"
              delay="100ms"
            />

            <FeatureCard
              icon={<Coffee className="w-8 h-8" />}
              title="Product Performance"
              description="Monitor inventory levels, analyze product profitability, and optimize your menu offerings."
              gradient="from-slate-500 to-slate-700"
              delay="200ms"
            />

            <FeatureCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Financial Reports"
              description="Generate detailed P&L statements, track expenses, and monitor cash flow with ease."
              gradient="from-green-500 to-emerald-500"
              delay="300ms"
            />

            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Real-time Dashboard"
              description="Get instant access to key metrics and KPIs with beautiful, interactive visualizations."
              gradient="from-indigo-500 to-blue-500"
              delay="400ms"
            />

            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Multi-Tenant Support"
              description="Each user gets their own isolated data. Perfect for multiple coffee shop locations."
              gradient="from-gray-500 to-slate-600"
              delay="500ms"
            />

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            
            <div className="animate-fade-in-up">
              <div className="text-5xl font-bold mb-2">Unlimited</div>
              <div className="text-slate-300 text-lg">Orders Per User</div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="text-5xl font-bold mb-2">Secure</div>
              <div className="text-slate-300 text-lg">Data Isolation</div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="text-5xl font-bold mb-2">Free</div>
              <div className="text-slate-300 text-lg">To Get Started</div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join coffee entrepreneurs using data to make better decisions. Create your free account today.
          </p>
          <Link 
            href="/auth/signup"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            Create Free Account
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm">
            © 2025 CITA. Built for coffee businesses.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/auth/login" className="text-gray-600 hover:text-slate-900 text-sm transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup" className="text-gray-600 hover:text-slate-900 text-sm transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>

      {/* INSTALL PROMPT */}
      <InstallPrompt />

    </main>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient,
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay: string
}) {
  return (
    <div 
      className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="w-5 h-5 text-slate-600" />
      </div>
    </div>
  )
}