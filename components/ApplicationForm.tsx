'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle, Loader } from 'lucide-react'

interface FormData {
  name: string
  email: string
  discord: string
  role: string
  yearsExperience: string
  warStory: string
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    discord: '',
    role: '',
    yearsExperience: '',
    warStory: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address'
    if (!formData.discord.trim()) newErrors.discord = 'Discord username is required'
    if (!formData.role.trim()) newErrors.role = 'Role is required'
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Experience level is required'
    if (!formData.warStory.trim()) newErrors.warStory = 'War story is required'
    if (formData.warStory.trim().length < 50)
      newErrors.warStory = 'Story must be at least 50 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('loading')

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Application received! We\'ll review and be in touch soon.')
        setFormData({
          name: '',
          email: '',
          discord: '',
          role: '',
          yearsExperience: '',
          warStory: '',
        })
      } else {
        setStatus('error')
        setMessage('Failed to submit. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Name */}
      <motion.div variants={itemVariants}>
        <label htmlFor="name" className="block text-white font-semibold mb-2 text-sm">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all ${
            errors.name ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.name}</span>
          </p>
        )}
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants}>
        <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all ${
            errors.email ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </motion.div>

      {/* Discord */}
      <motion.div variants={itemVariants}>
        <label htmlFor="discord" className="block text-white font-semibold mb-2 text-sm">
          Discord Username
        </label>
        <input
          type="text"
          id="discord"
          name="discord"
          value={formData.discord}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all ${
            errors.discord ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
          placeholder="username#0000"
        />
        {errors.discord && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.discord}</span>
          </p>
        )}
      </motion.div>

      {/* Role / Organization */}
      <motion.div variants={itemVariants}>
        <label htmlFor="role" className="block text-white font-semibold mb-2 text-sm">
          Role / Organization <span className="text-gray-500 font-normal">(anonymous OK)</span>
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all ${
            errors.role ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
          placeholder="e.g., ML Engineer at StartupXYZ"
        />
        {errors.role && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.role}</span>
          </p>
        )}
      </motion.div>

      {/* Years of Experience */}
      <motion.div variants={itemVariants}>
        <label htmlFor="yearsExperience" className="block text-white font-semibold mb-2 text-sm">
          Years in AI Operations
        </label>
        <select
          id="yearsExperience"
          name="yearsExperience"
          value={formData.yearsExperience}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg glass text-white bg-transparent focus:outline-none focus:border-cyan-400 transition-all cursor-pointer ${
            errors.yearsExperience ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
        >
          <option value="">Select experience level</option>
          <option value="1">Less than 1 year</option>
          <option value="1-2">1-2 years</option>
          <option value="2-5">2-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {errors.yearsExperience && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.yearsExperience}</span>
          </p>
        )}
      </motion.div>

      {/* War Story */}
      <motion.div variants={itemVariants}>
        <label htmlFor="warStory" className="block text-white font-semibold mb-2 text-sm">
          Production War Story <span className="text-gray-500 font-normal">(what broke & how you fixed it)</span>
        </label>
        <textarea
          id="warStory"
          name="warStory"
          value={formData.warStory}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all resize-none ${
            errors.warStory ? 'border-red-500/50' : 'border-cyan-500/30'
          }`}
          placeholder="Tell us about a production incident. What happened? How did you handle it?"
        />
        {errors.warStory && (
          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <AlertCircle size={14} />
            <span>{errors.warStory}</span>
          </p>
        )}
        <p className="text-gray-500 text-xs mt-2">
          {formData.warStory.length} / 50+ characters
        </p>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        variants={itemVariants}
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold py-4 rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {status === 'loading' ? (
          <>
            <Loader size={18} className="animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          'Submit Application'
        )}
      </motion.button>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 rounded-lg bg-green-500/10 border border-green-500/50"
        >
          <Check className="text-green-400" size={20} />
          <p className="text-green-400 text-sm">{message}</p>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 rounded-lg bg-red-500/10 border border-red-500/50"
        >
          <AlertCircle className="text-red-400" size={20} />
          <p className="text-red-400 text-sm">{message}</p>
        </motion.div>
      )}
    </motion.form>
  )
}
