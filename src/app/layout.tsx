import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'IntelliFlow - Assistente Inteligente',
    template: '%s | IntelliFlow',
  },
  description: 'IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados. Converse com IA de forma natural e eficiente.',
  keywords: ['IA', 'Chatbot', 'Assistente Inteligente', 'OpenAI', 'IntelliFlow', 'Chat AI'],
  authors: [{ name: 'Wesley Santos' }],
  creator: 'Wesley Santos',
  publisher: 'Wesley Santos',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'IntelliFlow - Assistente Inteligente',
    description: 'IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados.',
    siteName: 'IntelliFlow',
    images: [
      {
        url: '/images/avatar.png',
        width: 1200,
        height: 630,
        alt: 'IntelliFlow Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IntelliFlow - Assistente Inteligente',
    description: 'IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados.',
    images: ['/images/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/avatar.png" />
      </head>
      <body className={inter.className}>
      
        
        {children}
        <SpeedInsights />
    
      </body>
 
    </html>

   
  )
}
