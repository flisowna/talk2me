import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

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
