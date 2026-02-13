import { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import ProductShowcase from '@/components/ProductShowcase'
import {
  Zap,
  Brain,
  DollarSign,
  Shield,
  GitBranch,
  Activity,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Ops Council | Private Guild for Real AI Operators',
  description:
    'Council of AI Operators is the private guild for people operating real AI systems at scale. Discuss production agent orchestration, prompt engineering, cost optimization, and more.',
  openGraph: {
    title: 'AI Ops Council',
    description: 'Private Guild for Real AI Operators',
    type: 'website',
  },
}

const features = [
  {
    id: '1',
    title: 'Production Agent Orchestration',
    description:
      'Real-world challenges of scaling agent systems in production environments.',
    icon: <Zap size={28} />,
  },
  {
    id: '2',
    title: 'Prompt & Context Engineering',
    description:
      'Advanced techniques for working with 100k+ token regimes and optimizing context windows.',
    icon: <Brain size={28} />,
  },
  {
    id: '3',
    title: 'Cost & Latency Wars',
    description:
      'Strategies for balancing inference costs, performance, and quality at scale.',
    icon: <DollarSign size={28} />,
  },
  {
    id: '4',
    title: 'Jailbreak Defense & Red-Teaming',
    description:
      'Production-grade security: defending against and testing adversarial inputs.',
    icon: <Shield size={28} />,
  },
  {
    id: '5',
    title: 'Multi-Model Routing & Fallback Logic',
    description:
      'Building resilient systems that intelligently route across multiple models.',
    icon: <GitBranch size={28} />,
  },
  {
    id: '6',
    title: 'Observability & Logging',
    description:
      'Instrumentation strategies for understanding behavior of AI systems in prod.',
    icon: <Activity size={28} />,
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Private Guild for Real AI Operators"
        subtitle="Council of AI Operators is the private guild for people operating real AI systems at scale."
        description="Discuss production agent orchestration, prompt engineering at scale, cost optimization, jailbreak defense, and the unglamorous reality of turning research into revenue. Serious operators only. Bring your logs, not your whitepapers."
        cta={{ text: 'Apply to Join', href: '/join' }}
        secondaryCta={{ text: 'Learn More', href: '/about' }}
      />

      {/* We Discuss Section */}
      <FeatureGrid
        title="We Discuss"
        subtitle="The topics that matter to operators running AI at scale"
        features={features}
      />

      {/* Products Section */}
      <ProductShowcase
        title="ClawAPI"
        subtitle="Council's First Product"
        description="ClawAPI: Build AI applications that automatically select the best model for each task — from lightweight chat to complex reasoning — without changing your client code. A unified execution layer for intelligent agents, reasoning systems, and domain-specific workflows — built for real-world complexity."
        highlights={[
          'Multi-model routing with intelligent model selection',
          'Latency optimization with caching and batching',
          'Real-time cost tracking and inference optimization',
          'Production-grade observability and dashboards',
          'Enterprise-grade security and access control',
          'Automatic failover and resilience strategies',
        ]}
        cta={{ text: 'Visit ClawAPI', href: 'https://clawapi.io/' }}
        accentColor="green"
      />
    </>
  )
}
