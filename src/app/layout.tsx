import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { LanguageProvider } from '@/context/LanguageContext';
import Footer from '@/components/footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Pangkalan Data Konsultan Kekayaan Intelektual (PDKKI)',
  description: 'Pangkalan Data Konsultan Kekayaan Intelektual (PDKKI)',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <LanguageProvider>
          <Navbar />

              <div className="flex-grow"> 
                {children}
              </div>
        
            <AccessibilityWidget/>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
