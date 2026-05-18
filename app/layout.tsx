import type { Metadata } from 'next'
import { Lora, Raleway } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMergedNavigation } from '@/lib/markdown'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Naturliglivsmestring — Online mental coaching',
    template: '%s | Naturliglivsmestring',
  },
  description:
    'Online mental coaching til dig, der kæmper med angst, stress, mistrivsel eller manipulation. Blid, empatisk støtte i dit eget tempo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { items } = getMergedNavigation()
  return (
    <html lang="da" className={`h-full ${lora.variable} ${raleway.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-raleway), system-ui, sans-serif' }}>
        <Header items={items} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
