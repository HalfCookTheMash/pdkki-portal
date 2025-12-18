import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Pangkalan Data Konsultan Kekayaan Intelektual (PDKKI)',
  description: 'Pangkalan Data Konsultan Kekayaan Intelektual (PDKKI)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <Navbar />

        <div className="flex-grow"> 
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  )
}
