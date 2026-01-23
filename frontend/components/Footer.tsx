'use client'

import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#' },
      { name: 'Download App', href: '#download' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Partnership', href: '#partnership' },
      { name: 'Privacy Policy', href: '#' },
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
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
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
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

