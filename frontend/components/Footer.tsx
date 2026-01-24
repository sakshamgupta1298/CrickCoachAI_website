'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    if (pathname === '/') {
      // Already on home page, scroll to section
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // On another page, navigate to home page with hash
      window.location.href = `/${hash}`
    }
  }

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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

  const links = {
    product: [
      { name: 'Features', href: '#features', isHash: true, isDownload: false },
      { name: 'How It Works', href: '#how-it-works', isHash: true, isDownload: false },
      { name: 'Download App', href: '#download', isHash: true, isDownload: true },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Support', href: '#' },
      { name: 'Partnership', href: '#partnership' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  }

  return (
    <footer className="relative bg-charcoal border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center mb-4">
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
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI-powered cricket coaching platform transforming performance through intelligent video analysis.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => {
                if (link.isDownload) {
                  // Download App - special handling
                  return (
                    <li key={link.name}>
                      <a
                        href={pathname === '/' ? '#download' : '/download'}
                        onClick={handleDownloadClick}
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                } else if (link.isHash) {
                  // Hash link - navigate to home page section
                  return (
                    <li key={link.name}>
                      <a
                        href={`/${link.href}`}
                        onClick={(e) => handleHashClick(e, link.href)}
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                } else {
                  // Regular link
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => {
                const isExternal = link.href.startsWith('#') || link.href.startsWith('http')
                const Component = isExternal ? 'a' : Link
                const props = isExternal ? { href: link.href } : { href: link.href }
                
                return (
                  <li key={link.name}>
                    <Component
                      {...props}
                      className="text-gray-400 hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Component>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => {
                if (link.href.startsWith('#')) {
                  // Hash link - navigate to home page section
                  return (
                    <li key={link.name}>
                      <a
                        href={`/${link.href}`}
                        onClick={(e) => handleHashClick(e, link.href)}
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                } else if (link.href.startsWith('http')) {
                  // External link
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                } else {
                  // Internal link
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-accent transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} CrickCoach AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

