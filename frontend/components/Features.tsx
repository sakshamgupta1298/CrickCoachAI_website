'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'AI-Powered Video Analysis',
    description: 'Advanced computer vision analyzes every frame of your batting and bowling action, identifying technique flaws and strengths with precision.',
    icon: '🎯',
    color: 'from-accent to-accent-dark',
  },
  {
    title: 'Real-Time Feedback',
    description: 'Get instant, actionable insights on your technique. Understand angles, balance, timing, and alignment in real-time.',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Personalized Coaching',
    description: 'Receive tailored recommendations based on your playing style, position, and performance goals.',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time with detailed analytics, performance trends, and milestone achievements.',
    icon: '📊',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: '3D Motion Analysis',
    description: 'Visualize your technique in 3D with skeletal tracking, joint angles, and motion path analysis.',
    icon: '🔬',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Coach Collaboration',
    description: 'Share insights with your coach or academy. Enable collaborative coaching with shared access to your analysis.',
    icon: '🤝',
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden"
      id="features"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-charcoal to-deep-navy" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Everything you need to elevate your cricket performance, powered by cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

