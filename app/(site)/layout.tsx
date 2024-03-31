import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Link from 'next/link'
import { getPages } from '@/sanity/sanity-utils'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'

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
  const pages = await getPages() // server side QROQ query to grab data from sanity

  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10 px-5">
        <header className="flex items-center justify-between">
          <Link
            href="/
"
            className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent text-lg font-extrabold"
          >
            Home
          </Link>
          <div className="flex items-center gap-5 text-sm  text-gray-600">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>
        <ReactQueryProvider>
          <main className="py-20">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
