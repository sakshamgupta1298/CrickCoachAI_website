'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const apiBaseUrl = '/api'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await axios.post(`${apiBaseUrl}/contact`, formData)
      
      if (response.data.status === 'success') {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setTimeout(() => {
          setSuccess(false)
        }, 5000)
      }
    } catch (error: any) {
      console.error('Error submitting contact form:', error)
      setError(error.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden min-h-screen"
      id="contact"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-charcoal to-graphite" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-dark rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Get In <span className="text-gradient">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-xl max-w-2xl mx-auto"
            >
              Have a question or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-sm mt-2"
            >
              by <span className="text-accent">AthcoaSpace AI</span>
            </motion.p>
          </div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-accent/50 transition-all duration-300">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <a 
                href="mailto:admin@crickcoachai.com" 
                className="text-accent hover:underline"
              >
                admin@crickcoachai.com
              </a>
            </div>
            <div className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-accent/50 transition-all duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2 text-white">Website</h3>
              <a 
                href="https://www.crickcoachai.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.crickcoachai.com
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/20 border border-accent rounded-lg text-accent text-center"
                >
                  ✓ Thank you for your message! We&apos;ll get back to you soon.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Response Time</h3>
            <p className="text-gray-300 leading-relaxed">
              We typically respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please mention it in your message subject line.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

