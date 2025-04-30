import type { Metadata } from 'next'
import '../globals.css'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'Gabriel',
  description: '',
  // icons: {
  //   icon: [
  //     {
  //       url: '/moon-imgs/full.png',
  //       href: '/moon-imgs/full.png',
  //     },

  //   ],
  // },
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
