'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Feature {
  id: string
  title: string
  description: string
  icon: ReactNode
}

interface FeatureGridProps {
  title: string
  subtitle?: string
  features: Feature[]
}

export default function FeatureGrid({
  title,
  subtitle,
  features,
}: FeatureGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group"
            >
              <div className="glass card-hover p-8 rounded-2xl h-full flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-green-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:text-green-400 transition-colors">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-green-500 group-hover:w-full transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
