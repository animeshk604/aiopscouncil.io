import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AI Ops Council | Private Guild for Real AI Operators',
  description:
    'Council of AI Operators is the private guild for people operating real AI systems at scale. Discuss production orchestration, prompt engineering, cost optimization, and more.',
  keywords: 'AI operators, production AI, agent orchestration, prompt engineering, AI ops',
  authors: [{ name: 'AI Ops Council' }],
  creator: 'AI Ops Council',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aiopscouncil.io',
    title: 'AI Ops Council | Private Guild for Real AI Operators',
    description: 'The private guild for people operating real AI systems at scale.',
    siteName: 'AI Ops Council',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ops Council',
    description: 'The private guild for people operating real AI systems at scale.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0a0e17" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-gradient-to-br from-gradient-from via-black to-gradient-to">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
