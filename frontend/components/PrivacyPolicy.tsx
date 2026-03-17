'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function PrivacyPolicy() {
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
      className="section relative overflow-hidden min-h-screen"
      id="privacy"
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
          animate={(inView || mounted) ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={(inView || mounted) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Privacy <span className="text-gradient">Policy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={(inView || mounted) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Last Updated: March 17, 2026
            </motion.p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={(inView || mounted) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to CrickCoach AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                By using our Service, and where required, providing explicit consent within the app, you agree to this Privacy Policy. If you do not agree, please do not use the Service.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed">
                We collect only the data necessary to provide and improve our core services.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-white mt-6">1. Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Name and email address (when registering or contacting us)</li>
                <li>Organization or academy name (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">2. Video Content &amp; AI Processing</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                We allow users to upload cricket videos for technique analysis.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>
                  Videos are processed using our pose detection system to extract structured data such as body keypoints and movement metrics.
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold text-white">Important:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Raw video files are NOT shared with third-party AI services</li>
                <li>Videos are used only within our system for processing and analysis</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                After processing, only non-visual structured data (e.g., numerical pose/keypoint data in CSV format) may be sent to third-party AI services such as Google Gemini to generate feedback and analysis.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                This processed data does not contain raw video or visual identity information.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3. Usage Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Device type, OS version</li>
                <li>App usage patterns and features used</li>
                <li>Performance and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">4. Technical Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>IP address (for security and diagnostics)</li>
                <li>Approximate location (derived from IP, not precise GPS)</li>
                <li>Cookies (for web services)</li>
              </ul>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use your data only for legitimate purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
                <li>To provide AI-based cricket coaching and analysis</li>
                <li>To process videos and generate feedback</li>
                <li>To improve our AI models and accuracy</li>
                <li>To provide performance tracking and insights</li>
                <li>To communicate updates and support responses</li>
                <li>To ensure security and prevent misuse</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-6">
                <span className="font-semibold text-white">Text-to-Speech:</span> Our app may use on-device text-to-speech to read analysis results. This processing occurs locally and no data is shared externally.
              </p>
            </motion.div>

            {/* User Consent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">User Consent</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We respect your right to control your data.
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
                <li>
                  Before uploading videos or using AI analysis features, users are clearly informed about how their data will be processed.
                </li>
                <li className="font-semibold text-white">
                  Users must provide explicit consent before:
                </li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-10 mt-2">
                <li>Uploading videos</li>
                <li>Using AI-powered analysis features</li>
                <li>Sharing processed data with third-party AI services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Users may choose not to use these features.
              </p>
            </motion.div>

            {/* Data Sharing and Disclosure */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do NOT sell your data.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share data only in the following cases:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">1. Third-Party AI Services</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>We may share processed, non-identifiable data (CSV format only) with Google Gemini to generate personalized cricket analysis and feedback for the user.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                These providers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Do not receive raw video</li>
                <li>Are contractually obligated to protect your data</li>
                <li>Cannot use your data for independent purposes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">2. Service Providers</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Cloud storage, analytics, and infrastructure providers</li>
                <li>Only to operate and improve our service</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3. Legal Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>When required by law or government authorities</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">4. Business Transfers</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>In case of merger, acquisition, or sale (with notice)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">5. With Your Consent</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>When you explicitly approve sharing</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">Data Protection Standard</h3>
              <p className="text-gray-300 leading-relaxed">
                All third-party service providers are contractually obligated to provide the same level of data protection as described in this Privacy Policy and in accordance with applicable privacy laws.
              </p>
            </motion.div>

            {/* Data Minimization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Minimization</h2>
              <p className="text-gray-300 leading-relaxed">
                We only collect and process data that is strictly necessary to deliver core app functionality.
              </p>
            </motion.div>

            {/* Data Storage and Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Storage and Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement strong security measures:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Encryption during data transmission and storage</li>
                <li>Restricted access to authorized personnel</li>
                <li>Secure cloud infrastructure</li>
                <li>Regular monitoring and updates</li>
              </ul>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion</li>
                <li>Object to certain processing</li>
                <li>Request data portability</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, contact:{' '}
                <a href="mailto:admin@crickcoachai.com" className="text-accent hover:underline">
                  admin@crickcoachai.com
                </a>
              </p>
            </motion.div>

            {/* Account Deletion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Account Deletion</h2>
              <p className="text-gray-300 leading-relaxed">
                You can request account deletion at any time. (Ensure this feature is also available inside the app to comply with Apple guidelines.)
              </p>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Retention</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Data is retained only as long as necessary</li>
                <li>
                  Upon account deletion:
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-6 mt-2">
                    <li>Data is deleted or anonymized within 30 days</li>
                  </ul>
                </li>
                <li>Some data may be retained if required by law</li>
              </ul>
            </motion.div>

            {/* Children’s Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Children’s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect data from children. If detected, it will be deleted immediately.
              </p>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your data may be processed in countries outside your location. We ensure appropriate safeguards are in place.
              </p>
            </motion.div>

            {/* Changes to This Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this policy periodically. Updates will be posted with a revised &quot;Last Updated&quot; date.
              </p>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Contact Us</h2>
              <div className="text-gray-300 space-y-2">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:admin@crickcoachai.com" className="text-accent hover:underline">
                    admin@crickcoachai.com
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a href="https://www.crickcoachai.com" className="text-accent hover:underline">
                    https://www.crickcoachai.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

