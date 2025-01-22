'use client'
import React from 'react'
import SearchOptionsList from './SearchOptionsList'
import { Project, Tier } from '@/sanity/models/sanity-client-models'

interface ResultsComponentProps {
  chosenCategory: string | null
  projects: Project[]
  tiers: Tier[]
}
export default function ResultsComponent({
  chosenCategory,
  projects,
  tiers,
}: ResultsComponentProps) {
  return (
    <>
      {/* Options List and Side bar with Gallery, info, links*/}
      <>
        <SearchOptionsList
          tiers={tiers}
          chosenCategory={chosenCategory}
          projects={projects}
        />
      </>
    </>
  )
}
