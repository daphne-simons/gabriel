import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'
import Nav from './components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabriel',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10 px-5">
        <Nav />
        <ReactQueryProvider>
          <main className="py-20">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
