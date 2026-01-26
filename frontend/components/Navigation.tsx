'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle hash navigation when landing on home page
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [pathname])

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    if (pathname === '/') {
      // Already on home page, just scroll to section
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // On another page, navigate to home page with hash (always use absolute path)
      window.location.href = `/${hash}`
    }
  }
  
  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    if (pathname === '/') {
      // On home page, scroll to download section
      const element = document.querySelector('#download')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // On another page, navigate to /download page
      window.location.href = '/download'
    }
  }

  const navItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Partnership', href: '#partnership' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-icon.png"
                alt="CrickCoach AI Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gradient -ml-2">CrickCoach AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.href.startsWith('#')) {
                // Hash link - always use absolute path to home page
                return (
                  <a
                    key={item.name}
                    href={`/${item.href}`}
                    onClick={(e) => handleHashClick(e, item.href)}
                    className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                )
              } else {
                // Regular link
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                )
              }
            })}
            <a 
              href={pathname === '/' ? '#download' : '/download'} 
              onClick={handleDownloadClick}
              className="btn-premium"
            >
              Download App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] md:hidden"
              />
              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-charcoal shadow-2xl z-[60] md:hidden overflow-y-auto"
              >
                <div className="p-6">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src="/logo-icon.png"
                          alt="CrickCoach AI Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-lg font-bold text-gradient -ml-2">CrickCoach AI</span>
                    </Link>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white hover:text-accent transition-colors p-2"
                      aria-label="Close menu"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Menu Items */}
                  <nav className="space-y-6">
                    {navItems.map((item) => {
                      if (item.href.startsWith('#')) {
                        // Hash link - always use absolute path to home page
                        return (
                          <a
                            key={item.name}
                            href={`/${item.href}`}
                            onClick={(e) => handleHashClick(e, item.href)}
                            className="block text-white hover:text-accent transition-colors text-lg font-medium py-2"
                          >
                            {item.name}
                          </a>
                        )
                      } else {
                        // Regular link
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-white hover:text-accent transition-colors text-lg font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )
                      }
                    })}
                    <a 
                      href={pathname === '/' ? '#download' : '/download'} 
                      onClick={handleDownloadClick}
                      className="btn-premium w-full mt-6 block text-center"
                    >
                      Download App
                    </a>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

