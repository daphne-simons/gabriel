'use client'
import React from 'react'
import SearchOptionsList from './SearchOptionsList'
import { useState } from 'react'

interface ResultsComponentProps {
  chosenService: string
  chosenGemLevel: string
}
export default function ResultsComponent({
  chosenService,
  chosenGemLevel,
}: ResultsComponentProps) {
  /* FIX: setProducts is unused here
   * Maybe this could be a regular variable?
   */
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
      { gem: 'Sapphire', level: 'Essential', cost: '2000-4000' },
      { gem: 'Emerald', level: 'Comprehensive', cost: '4000-6000' },
      { gem: 'Ruby', level: 'Premium', cost: '6000-10000' },
    ],
  })
  return (
    <>
      {/* Options List and Side bar with Gallery, info, links*/}
      <div>
        <SearchOptionsList
          options={products.options}
          chosenService={chosenService}
          chosenGemLevel={chosenGemLevel}
        />
      </div>
    </>
  )
}
