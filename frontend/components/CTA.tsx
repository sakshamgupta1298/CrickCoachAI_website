'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import PartnershipForm from './PartnershipForm'

export default function CTA() {
  const apiBaseUrl = "/api" 
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAppDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${apiBaseUrl}/api/app-download`, {
        email,
      })
      
      if (response.data.status === 'success') {
        setSuccess(true)
        setEmail('')
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting download request:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden"
      id="download"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-charcoal to-graphite" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-dark rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to <span className="text-gradient">Elevate</span> Your Game?
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Enter your email and we’ll send you the Android APK.
          </p>

          {/* App Download Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <form onSubmit={handleAppDownload} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Get Android APK'}
                </button>
              </div>
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent font-medium"
                >
                  ✓ APK sent to your email!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Partnership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-16 border-t border-gray-800"
            id="partnership"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Partner With Us
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Are you a coach, academy, or club? Let&apos;s work together to elevate cricket performance.
            </p>
            <PartnershipForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

