import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ApplicationForm from '@/components/ApplicationForm'

export const metadata: Metadata = {
  title: 'Join | AI Ops Council',
  description:
    'Apply to join the Council of AI Operators. Share your war stories, share your solutions.',
}

export default function Join() {
  return (
    <>
      <Hero
        title="Join the Council"
        subtitle="Apply to Become a Member"
        description="We're looking for serious operators running real AI systems in production. Tell us about yourself and one of your production war stories."
      />

      {/* Application Form Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Application</h2>
            <p className="text-gray-400 text-lg">
              Fill out the form below and we'll review your application. We're selective—we want
              operators who have real production experience and insights to share with the community.
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-2xl border border-cyan-500/30 mb-16">
            <ApplicationForm />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass p-8 rounded-xl border border-cyan-500/20">
              <h3 className="text-white font-bold text-lg mb-4">What We're Looking For</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Production AI/ML experience (not just research or hobby)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Real war stories and battle scars from incidents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Openness to sharing knowledge and learning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Commitment to no-hype, practical discussions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Experience with at least one serious scale challenge</span>
                </li>
              </ul>
            </div>

            <div className="glass p-8 rounded-xl border border-red-500/20 bg-red-500/5">
              <h3 className="text-white font-bold text-lg mb-4">What You Won't Find</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Beginner-friendly tutorials</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Vendor pitches or marketing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Theoretical AI research discussions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Business development networking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Excessive hand-holding</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
            <p className="text-gray-300 text-base">
              <strong className="text-cyan-400">Got questions?</strong> We review applications on a
              rolling basis. You'll hear from us within 2-3 business days if we think there's a fit.
              If you have immediate questions, feel free to reach out.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
