import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Source_Code_Pro } from 'next/font/google'

const stag = localFont({
  src: [
    {
      path: '../../public/fonts/stag-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/stag-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/stag-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})

const source_code_pro = Source_Code_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talk To Me - Kleiner Fünf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={stag.className}>{children}</body>
    </html>
  )
}
