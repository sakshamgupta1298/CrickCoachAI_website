'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import PartnershipForm from './PartnershipForm'

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

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
            Download the CrickCoach AI app and start your journey to better performance today
          </p>

          {/* Store Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/crickcoach-ai/id6758755963"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-[1.02] active:scale-[0.99]"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  width={180}
                  height={54}
                  priority
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.saksham_5.cricketcoachmobile"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-[1.02] active:scale-[0.99]"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  priority
                />
              </a>
            </div>
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

