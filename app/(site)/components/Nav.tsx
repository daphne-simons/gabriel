import Link from 'next/link'
import React from 'react'
import { getPages } from '@/sanity/sanity-utils'

export default async function Nav() {
  const pages = await getPages() // server side QROQ query to grab data from sanity

  return (
    <div>
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
    </div>
  )
}
