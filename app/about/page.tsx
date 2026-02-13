import { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import { Users, Target, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | AI Ops Council',
  description: 'Learn about the Council of AI Operators and who should join our private guild.',
}

const whoShouldJoin = [
  {
    id: '1',
    title: 'ML/AI Engineers',
    description:
      'Building and deploying AI systems in production. You know what happens when models fail at 2 AM.',
    icon: <Users size={28} />,
  },
  {
    id: '2',
    title: 'Platform Teams',
    description:
      'Running inference infrastructure and orchestration layers. You\'ve debugged latency issues nobody else understands.',
    icon: <Lightbulb size={28} />,
  },
  {
    id: '3',
    title: 'DevOps/SRE',
    description:
      'Managing reliability and scaling of AI workloads. You\'ve navigated cost-quality tradeoffs more times than you can count.',
    icon: <Target size={28} />,
  },
]

export default function About() {
  return (
    <>
      <Hero
        title="About the Council"
        subtitle="Who We Are"
        description="A private community of serious operators sharing knowledge on production AI systems."
      />

      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
            <div className="glass p-8 md:p-12 rounded-2xl border border-cyan-500/30">
              <p className="text-lg text-gray-300 mb-6">
                <strong className="text-cyan-400">Council of AI Operators</strong> is the private
                guild for people operating real AI systems at scale. We discuss:
              </p>
              <ul className="text-gray-300 space-y-3 ml-6 mb-8">
                <li>• Production agent orchestration & reliability</li>
                <li>• Prompt & context engineering at 100k+ token regimes</li>
                <li>• Cost & latency wars</li>
                <li>• Jailbreak defense & red-teaming in prod</li>
                <li>• Multi-model routing, fallback logic, observability</li>
                <li>• The unglamorous reality of turning research into revenue</li>
              </ul>
              <p className="text-lg text-gray-300 font-semibold">
                Serious operators only. Bring your logs, not your whitepapers.
              </p>
            </div>
          </div>

          {/* Who Should Join */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Who Should Join?
            </h2>
            <FeatureGrid title="" features={whoShouldJoin} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            What You Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'War Story Sharing',
                description:
                  'Real incidents, real solutions. Learn from others\' production battles without the corporate smoothing.',
              },
              {
                title: 'Tool & Technique Exchange',
                description:
                  'Discover how other operators solve routing, fallback logic, observability, and cost optimization challenges.',
              },
              {
                title: 'Early Access to Products',
                description:
                  'First to know about tools built by and for operators. Shape the products we build together.',
              },
              {
                title: 'No Hype, No Marketing',
                description:
                  'Just people who actually run AI systems, discussing what works and what doesn\'t in production.',
              },
            ].map((benefit, idx) => (
              <div key={idx} className="glass p-8 rounded-xl border border-cyan-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-green-500/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-500" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is NOT */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            What This Is NOT
          </h2>
          <div className="glass p-8 md:p-12 rounded-2xl border border-red-500/20 bg-red-500/5">
            <ul className="text-gray-300 space-y-3 text-lg">
              <li>❌ A networking group for business development</li>
              <li>❌ A forum for discussing research papers in isolation</li>
              <li>❌ A place for vendor pitches or marketing</li>
              <li>❌ For hobbyists or students (nothing against you—just different audience)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
