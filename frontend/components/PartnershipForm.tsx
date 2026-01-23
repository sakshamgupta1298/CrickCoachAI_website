'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function PartnershipForm() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    inquiry_type: 'academy',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${apiBaseUrl}/api/partnership-inquiry`, formData)
      
      if (response.data.status === 'success') {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          organization: '',
          message: '',
          inquiry_type: 'academy',
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting partnership inquiry:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
        id="partnership-form"
      >
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Organization
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
            placeholder="Academy/Club/Organization name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Inquiry Type *
          </label>
          <select
            required
            value={formData.inquiry_type}
            onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
            className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
          >
            <option value="academy">Cricket Academy</option>
            <option value="club">Cricket Club</option>
            <option value="coach">Individual Coach</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-graphite/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="Tell us about your partnership interest..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Partnership Inquiry'}
        </button>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-accent/20 border border-accent rounded-lg text-accent text-center"
          >
            ✓ Thank you for your interest! We'll be in touch soon.
          </motion.div>
        )}
      </motion.form>
    </div>
  )
}

