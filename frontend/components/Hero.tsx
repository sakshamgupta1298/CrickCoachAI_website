'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; targetY: number; duration: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate particles only on client
    if (typeof window !== 'undefined') {
      const width = window.innerWidth || 1920
      const height = window.innerHeight || 1080
      const particleData = Array.from({ length: 20 }, () => {
        const initialY = Math.random() * height
        return {
          x: Math.random() * width,
          y: initialY,
          targetY: Math.random() * height,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        }
      })
      setParticles(particleData)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-charcoal to-charcoal" />
      
      {/* Animated background particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0.3,
              }}
              animate={{
                y: [particle.y, particle.targetY, particle.y],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
              AI-Powered Performance Analysis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Elevate Your{' '}
            <span className="text-gradient">Cricket</span>
            <br />
            Performance with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed max-w-xl"
          >
            Transform your batting and bowling technique through intelligent video analysis. 
            Get personalized, data-driven feedback that refines your game and drives consistent improvement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#download" className="btn-premium text-lg">
              Download App
            </a>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="btn-premium-outline text-lg"
            >
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl mx-4 bg-charcoal rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://drive.google.com/file/d/1RPEeEi-L3QhhSURp_GUvFMvzxGW8a7T-/preview"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="CrickCoach AI Demo Video"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

