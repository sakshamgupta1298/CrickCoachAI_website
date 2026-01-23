'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Vikash Yadav',
    role: 'Professional Cricketer',
    image: '👤',
    text: 'The 3D analysis from CrickCoach AI gave me a clear understanding of my backlift angle, while the tailored 7-day training plan addressed my specific batting flaws. Within just a few weeks, my batting consistency improved significantly.',
    rating: 5,
  },
  {
    name: 'Kshitiz Kumar',
    role: 'Professional Cricketer',
    image: '👤',
    text: 'CrickCoach AI completely transformed my bowling technique. It helped me clearly understand my injury risk areas, which is invaluable as a bowler. The 3D analysis gave me precise insights into my backlift angle, and within just a few weeks, my consistency improved significantly.',
    rating: 5,
  },
  {
    name: 'Tanmay Tripathi',
    role: 'Academy Director',
    image: '👤',
    text: 'Our academy has partnered with CrickCoach AI, and the results speak for themselves. Our players show measurable improvement, and parents love the transparency.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Parent',
    image: '👤',
    text: 'My son has been using CrickCoach AI for 3 months, and his coach has noticed significant improvement in his bowling action. The detailed feedback is incredible.',
    rating: 5,
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden"
      id="testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-charcoal to-deep-navy" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Join thousands of players, coaches, and academies achieving better results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-accent/50 transition-all duration-300">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

