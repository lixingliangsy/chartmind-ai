import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChartMind AI - AI Chart Generator',
  description: 'Turn data into stunning charts in seconds with AI',
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
