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
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={(inView || mounted) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-sm mt-2"
            >
              by <span className="text-accent">AthcoaSpace AI</span>
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
                Welcome to CrickCoach AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
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
              
              <h3 className="text-xl font-semibold mb-3 text-white mt-6">1. Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Name and email address when you register or contact us</li>
                <li>Organization or academy name (if applicable)</li>
                <li>Contact information provided through partnership inquiries</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">2. Video Content</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Cricket technique videos you upload for analysis</li>
                <li>Video metadata (duration, file size, format)</li>
                <li>Analysis results and performance metrics generated from your videos</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">3. Usage Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Device information (model, operating system, unique device identifiers)</li>
                <li>App usage patterns and features accessed</li>
                <li>Performance analytics and improvement tracking data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-white mt-6">4. Technical Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version (for web services)</li>
                <li>Cookies and similar tracking technologies</li>
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
              <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
                <li>To provide, maintain, and improve our AI-powered cricket coaching services</li>
                <li>To analyze your cricket technique videos and generate personalized feedback</li>
                <li>To send you APK downloads, updates, and service-related communications</li>
                <li>To respond to your inquiries, partnership requests, and provide customer support</li>
                <li>To track your progress and provide performance analytics over time</li>
                <li>To enhance our AI models and improve analysis accuracy</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </motion.div>

            {/* Data Storage and Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Storage and Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information and video content. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Your videos are encrypted during transmission and storage</li>
                <li>Access to your data is restricted to authorized personnel only</li>
                <li>We use secure servers and follow industry-standard security practices</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
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
                We do not sell your personal information or video content. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our Service (e.g., cloud storage, email services, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                <li><strong>Coaches/Academies:</strong> If you are part of a coaching program, your data may be shared with your authorized coach or academy</li>
              </ul>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data and videos</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:admin@crickcoachai.com" className="text-accent hover:underline">admin@crickcoachai.com</a>
              </p>
            </motion.div>

            {/* Cookies and Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Types of cookies we use:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </motion.div>

            {/* Children&apos;s Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information and video content for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal data within 30 days, unless we are required to retain it for legal purposes.
              </p>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our Service, you consent to the transfer of your information to these countries.
              </p>
            </motion.div>

            {/* Changes to This Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="bg-graphite/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong>Email:</strong> <a href="mailto:admin@crickcoachai.com" className="text-accent hover:underline">admin@crickcoachai.com</a></p>
                <p><strong>Website:</strong> <a href="https://www.crickcoachai.com" className="text-accent hover:underline">www.crickcoachai.com</a></p>
              </div>
            </motion.div>
          </div>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 text-sm">
              by <span className="text-accent">AthcoaSpace AI</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

