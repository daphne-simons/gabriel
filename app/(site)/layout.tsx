import type { Metadata } from 'next'
import '../globals.css'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'Gabriel',
  description: '',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/moon-imgs/first-q.png',
        href: '/moon-imgs/first-q.png',
      },
      // {
      //   media: '(prefers-color-scheme: dark)',
      //   url: '/images/icon.png',
      //   href: '/images/icon-dark.png',
      // },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
