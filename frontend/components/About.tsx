'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden min-h-screen"
      id="about"
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
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About <span className="text-gradient">Us</span>
            </motion.h1>
          </div>

          {/* CrickCoach AI Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              CrickCoach AI
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                CrickCoach AI is an AI-powered mobile application built to transform the way cricketers train and improve. By simply uploading a video, players receive personalized, data-driven analysis of their technique—whether batting or bowling—helping them identify flaws, reduce injury risk, and unlock better performance.
              </p>
              <p>
                Designed for cricketers of all levels—from beginners taking their first steps to professionals fine-tuning elite skills—CrickCoach AI makes expert-level coaching accessible to everyone. The platform also supports coaches, academies, clubs, teams, and parents of young players by providing consistent, objective, and easy-to-understand feedback.
              </p>
              <p>
                With CrickCoach AI, professional cricket coaching is no longer limited by location, time, or resources. Our intelligent analysis delivers instant insights directly to your mobile device, empowering players to train smarter, correct techniques faster, and elevate their game anytime, anywhere.
              </p>
            </div>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Our mission is simple: to democratize high-quality cricket coaching through technology. We aim to bridge the gap between talent and opportunity by using AI to deliver reliable, actionable, and affordable performance analysis to every cricketer who dreams of getting better.
            </p>
          </motion.div>

          {/* About the Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About the Founder
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                CrickCoach AI is founded by a passionate state-level cricketer who understands the game from the inside out. Having competed at the state level, the founder has experienced firsthand the challenges players face—limited access to expert coaching, lack of consistent feedback, and the difficulty of identifying technical mistakes at the right time.
              </p>
              <p>
                This deep connection to the sport, combined with a strong belief in the power of technology, led to the creation of CrickCoach AI. The vision was clear: build a tool that brings professional-level analysis to every player, regardless of where they train or who they train with.
              </p>
              <p className="text-accent font-semibold">
                CrickCoach AI is not just a product—it&apos;s built by a cricketer, for cricketers.
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-8"
          >
            <a href="/#download" className="btn-premium text-lg inline-block">
              Download App
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

