import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import FeatureGrid from '@/components/FeatureGrid'
import Link from 'next/link'
import {
  GitBranch,
  Zap,
  BarChart3,
  Lock,
  Gauge,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products | AI Ops Council',
  description: 'Discover products built by and for AI operators. Starting with ClawAPI.',
}

const clawAPIFeatures = [
  {
    id: '1',
    title: 'Multi-Model Routing',
    description:
      'Intelligently route requests across multiple models with built-in cost optimization.',
    icon: <GitBranch size={28} />,
  },
  {
    id: '2',
    title: 'Latency Optimization',
    description:
      'Advanced caching, batching, and routing strategies to minimize response times.',
    icon: <Zap size={28} />,
  },
  {
    id: '3',
    title: 'Cost Efficiency',
    description:
      'Real-time cost tracking and intelligent model selection to optimize inference spend.',
    icon: <BarChart3 size={28} />,
  },
  {
    id: '4',
    title: 'Production Observability',
    description:
      'Deep insights into model performance, errors, and cost with operator-focused dashboards.',
    icon: <Gauge size={28} />,
  },
  {
    id: '5',
    title: 'Secure API Access',
    description:
      'Enterprise-grade security with fine-grained access control and audit logging.',
    icon: <Lock size={28} />,
  },
  {
    id: '6',
    title: 'Fallback Logic',
    description:
      'Automatic failover strategies to ensure reliability even when models are down or degraded.',
    icon: <Zap size={28} />,
  },
]

export default function Products() {
  return (
    <>
      <Hero
        title="Our Products"
        subtitle="Built by Operators, for Operators"
        description="Tools designed with real production challenges in mind. No hype—just solutions that work at scale."
      />

      {/* ClawAPI Showcase */}
      <ProductShowcase
        title="ClawAPI"
        subtitle="Council's First Product"
        description="Build AI applications that automatically select the best model for each task — from lightweight chat to complex reasoning — without changing your client code."
        highlights={[
          'Multi-model routing and intelligent fallback',
          'Cost-efficient inference at scale',
          'Production-grade observability',
          'Enterprise security and compliance',
          'Real-time performance monitoring',
          'Built from operator feedback',
        ]}
        cta={{ text: 'Visit ClawAPI.io', href: 'https://clawapi.io/' }}
        accentColor="green"
      />

      {/* Features */}
      <FeatureGrid
        title="ClawAPI Features"
        subtitle="Everything you need for production AI operations"
        features={clawAPIFeatures}
      />

      {/* Coming Soon */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Coming Soon
          </h2>
          <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
            We're building more tools based on direct feedback from council members.
            Have an idea for what operators actually need?{' '}
            <span className="text-cyan-400 font-semibold">Join us and help shape it.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="glass p-8 rounded-xl border border-cyan-500/20 text-center hover:border-cyan-400 transition-all"
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/10 to-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">?</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Next Product</h3>
                <p className="text-gray-400 text-sm">
                  {idx === 1
                    ? 'Member ideas welcome'
                    : idx === 2
                      ? 'Built from operator feedback'
                      : 'Your input shapes what we build'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want Early Access?
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Join the council and get early access to ClawAPI and all future products.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Apply Now</span>
          </Link>
        </div>
      </section>
    </>
  )
}
