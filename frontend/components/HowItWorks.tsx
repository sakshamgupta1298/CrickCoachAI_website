'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Record Your Action',
    description: 'Use the mobile app to record your batting or bowling technique. Our AI works with any standard video format.',
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Advanced computer vision analyzes your technique frame-by-frame, identifying key biomechanical markers and performance metrics.',
  },
  {
    number: '03',
    title: 'Get Insights',
    description: 'Receive detailed feedback with 3D visualizations, angle measurements, timing analysis, and personalized recommendations.',
  },
  {
    number: '04',
    title: 'Improve & Track',
    description: 'Implement the feedback, record again, and track your progress over time with comprehensive analytics and trend analysis.',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-charcoal to-graphite" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Transform your cricket technique in four simple steps
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-2xl font-bold text-deep-navy">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-accent to-transparent mx-auto mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

