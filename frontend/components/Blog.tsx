'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Blog() {
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden min-h-screen pt-24 md:pt-32"
      id="blog"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-charcoal to-graphite" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-dark rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted && inView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={mounted && inView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              How AI Is Transforming <span className="text-gradient">Cricket Coaching</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mounted && inView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Inside CrickCoach AI
            </motion.p>
          </div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={mounted && inView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-12 space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              Cricket has always been a game of skill, discipline, and constant refinement. From adjusting a batsman&apos;s backlift to correcting a bowler&apos;s release point, even the smallest technical change can make a massive difference. Traditionally, these improvements relied heavily on in-person coaching, video replays, and subjective judgment.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Today, technology is changing that — and <strong className="text-accent">CrickCoach AI</strong> is at the forefront of this transformation.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              The Challenge with Traditional Coaching
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              While experienced coaches play a vital role in player development, traditional coaching comes with limitations:
            </p>
            
            <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4 text-lg">
              <li>Limited one-on-one time with coaches</li>
              <li>Difficulty in analyzing movements frame-by-frame</li>
              <li>Delayed feedback after practice sessions</li>
              <li>High costs for advanced performance analysis</li>
              <li>Limited access for grassroots and young players</li>
            </ul>
            
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              This often leaves players guessing what went wrong — and how to fix it.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              Enter CrickCoach AI: Smart Coaching, Anywhere
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              CrickCoach AI is an AI-powered mobile application designed to analyze cricket techniques for both batsmen and bowlers. By simply uploading a video of your action, players receive personalized, data-driven insights within minutes.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              <strong className="text-accent">No expensive equipment. No complicated setup. Just your game — analyzed intelligently.</strong>
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              How CrickCoach AI Works
            </h2>
            
            <div className="space-y-6 mt-8">
              <div className="bg-graphite/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-accent">1. Upload Your Video</h3>
                <p className="text-gray-300 leading-relaxed">
                  Record your batting or bowling action using a smartphone and upload it to the app.
                </p>
              </div>
              
              <div className="bg-graphite/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-accent">2. AI-Powered Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our advanced AI models analyze body movement, posture, angles, timing, and biomechanics.
                </p>
              </div>
              
              <div className="bg-graphite/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-accent">3. Personalized Feedback</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get clear, actionable insights highlighting strengths, areas of improvement, and potential injury risks.
                </p>
              </div>
              
              <div className="bg-graphite/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-accent">4. Track Your Progress</h3>
                <p className="text-gray-300 leading-relaxed">
                  Monitor improvements over time and refine your technique session by session.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              Built for Every Level of Cricketer
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              CrickCoach AI is designed to support the entire cricket ecosystem:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-graphite/30 rounded-xl p-5 border border-gray-700">
                <p className="text-gray-300"><strong className="text-white">Beginners</strong> – Learn correct fundamentals from the start</p>
              </div>
              <div className="bg-graphite/30 rounded-xl p-5 border border-gray-700">
                <p className="text-gray-300"><strong className="text-white">Intermediate Players</strong> – Identify and fix technical gaps</p>
              </div>
              <div className="bg-graphite/30 rounded-xl p-5 border border-gray-700">
                <p className="text-gray-300"><strong className="text-white">Professional & Semi-Pro Players</strong> – Fine-tune performance with precision</p>
              </div>
              <div className="bg-graphite/30 rounded-xl p-5 border border-gray-700">
                <p className="text-gray-300"><strong className="text-white">Coaches & Academies</strong> – Scale expert analysis across multiple players</p>
              </div>
              <div className="bg-graphite/30 rounded-xl p-5 border border-gray-700 md:col-span-2">
                <p className="text-gray-300"><strong className="text-white">Parents</strong> – Get expert-level insights for young, aspiring cricketers</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              <strong className="text-accent">Expert coaching is no longer limited by location or availability.</strong>
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              Reducing Injury Risk with Smart Insights
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              One of the most powerful features of CrickCoach AI is its ability to detect movement patterns that may lead to injuries, especially in fast bowlers and all-rounders. By identifying stress points early, players can make corrections before injuries occur — helping them stay fit and consistent throughout the season.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              The Future of Cricket Coaching
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Cricket is evolving, and so is coaching. With AI-driven insights, players can now make informed decisions about their technique, backed by data rather than guesswork.
            </p>
            
            <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl my-8">
              <p className="text-gray-300 leading-relaxed text-lg">
                <strong className="text-accent">CrickCoach AI doesn&apos;t replace coaches — it empowers them.</strong>
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mt-2">
                It bridges the gap between traditional expertise and modern technology.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
              Elevate Your Game with CrickCoach AI
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Whether you are training for competitive cricket or simply aiming to improve your technique, CrickCoach AI gives you the tools to train smarter.
            </p>
            
            <div className="text-center my-12">
              <p className="text-2xl font-bold text-accent mb-4">
                🎯 Analyze. Improve. Perform.
              </p>
              <p className="text-gray-300 text-lg">
                Experience the future of cricket coaching — today.
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-8 border-t border-gray-700 mt-12">
              <a href="/download" className="btn-premium text-lg inline-block">
                Download CrickCoach AI
              </a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

