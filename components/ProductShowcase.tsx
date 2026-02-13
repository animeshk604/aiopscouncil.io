'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ProductShowcaseProps {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  cta?: {
    text: string
    href: string
  }
  accentColor?: 'cyan' | 'green'
}

export default function ProductShowcase({
  title,
  subtitle,
  description,
  highlights,
  cta,
  accentColor = 'cyan',
}: ProductShowcaseProps) {
  const accentClasses = {
    cyan: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      text: 'text-cyan-400',
      gradient: 'from-cyan-500 to-green-500',
      glow: 'shadow-glow-md',
    },
    green: {
      border: 'border-green-500/30',
      bg: 'bg-green-500/5',
      text: 'text-green-400',
      gradient: 'from-green-500 to-cyan-500',
      glow: 'shadow-glow-green',
    },
  }

  const colors = accentClasses[accentColor]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute right-10 top-1/4 w-96 h-96 bg-gradient-to-br from-${accentColor}-500/10 to-transparent rounded-full blur-3xl`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className={`inline-block px-3 py-1 rounded-full border ${colors.border} ${colors.bg} ${colors.text} text-xs font-semibold mb-6`}>
              ◆ Latest Release
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-6 font-light">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {description}
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className={`w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                  </div>
                  <p className="text-gray-300 text-sm">{highlight}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {cta && (
              <Link
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r ${colors.gradient} text-white font-semibold hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95`}
              >
                <span>{cta.text}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className={`glass card-hover rounded-2xl p-8 md:p-12 border-2 ${colors.border} min-h-96 flex items-center justify-center relative overflow-hidden`}>
              {/* Animated gradient background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 blur-2xl`}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-6"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} mx-auto flex items-center justify-center shadow-glow-lg`}>
                    <span className="text-3xl">⚙️</span>
                  </div>
                </motion.div>
                <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{title}</h3>
                <p className="text-gray-400">Launching Soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
