'use client'
import React from 'react'
import SearchOptionsList from './SearchOptionsList'
import { Project } from '@/sanity/models/project'

interface ResultsComponentProps {
  chosenCategory: string | null
  projects: Project[]
}
export default function ResultsComponent({
  chosenCategory,
  projects,
}: ResultsComponentProps) {
  const options = [
    { gem: 'Sapphire', level: 'Essential', cost: '2000-4000' },
    { gem: 'Emerald', level: 'Comprehensive', cost: '4000-6000' },
    { gem: 'Ruby', level: 'Premium', cost: '6000-10000' },
  ]

  return (
    <>
      {/* Options List and Side bar with Gallery, info, links*/}
      <div>
        <SearchOptionsList
          options={options}
          chosenCategory={chosenCategory}
          projects={projects}
        />
      </div>
    </>
  )
}
