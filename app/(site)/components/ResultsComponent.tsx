'use client'
import React from 'react'
import SearchOptionsList from './SearchOptionsList'
import SearchSideBar from './SearchSideBar'
import { useState } from 'react'
export default function ResultsComponent() {
  const [products, setProducts] = useState({
    services: [
      'an identity',
      'a publication',
      'ephemera',
      'a website',
      'a design subscription',
      'something',
    ],
    options: [
      { gem: 'Sapphire', level: 'Essential Identity', cost: '2000-4000' },
      { gem: 'Emerald', level: 'Comprehensive Identity', cost: '4000-6000' },
      { gem: 'Ruby', level: 'Premium Identity', cost: '6000-10000' },
    ],
  })
  return (
    <>
      {/* Options List and Side bar with Gallery, info, links*/}
      <div>
        <SearchOptionsList options={products.options} />
      </div>
    </>
  )
}
