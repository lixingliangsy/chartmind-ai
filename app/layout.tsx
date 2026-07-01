import type { Metadata } from 'next'

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
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}
