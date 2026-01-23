import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CrickCoach AI - AI-Powered Cricket Coaching',
  description: 'Premium AI-powered cricket coaching platform that analyzes batting and bowling techniques through video intelligence.',
  keywords: 'cricket coaching, AI cricket, cricket analysis, batting technique, bowling technique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

