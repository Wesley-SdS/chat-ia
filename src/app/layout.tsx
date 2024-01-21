import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IntelliFlow',
  description: 'IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="pt">
      
      <body className={inter.className}>
      
        
        {children}
        <SpeedInsights />
    
      </body>
 
    </html>

   
  )
}
