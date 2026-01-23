'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Stat {
  value: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: '12500', label: 'Players Coached', suffix: '+' },
  { value: '45000', label: 'Videos Analyzed', suffix: '+' },
  { value: '320', label: 'Coaches Using', suffix: '+' },
  { value: '45', label: 'Academies Partnered', suffix: '+' },
  { value: '23', label: 'Avg Improvement', suffix: '%' },
]

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0')
  const numValue = parseInt(value.replace(/,/g, ''))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = numValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, numValue)
      setDisplayValue(Math.floor(current).toLocaleString())
      
      if (step >= steps) {
        clearInterval(timer)
        setDisplayValue(numValue.toLocaleString())
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numValue])

  return (
    <span>
      {displayValue}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="section bg-gradient-to-b from-charcoal to-graphite relative overflow-hidden"
      id="stats"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-dark rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient">Cricket Community</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of players, coaches, and academies transforming cricket performance with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {inView ? (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-gray-400 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

