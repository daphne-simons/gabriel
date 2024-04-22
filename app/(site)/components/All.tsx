import React from 'react'
import SearchOptionsList from './SearchOptionsList'
import SearchSideBar from './SearchSideBar'

export default function All() {
  return (
    <>
      {/* Options List */}
      <div className="w-2/3">
        <SearchOptionsList />
      </div>
      {/* Side bar - Gallery, info, links*/}
      <div className="w-1/2 flex flex-col pr-32 pt-6">
        <SearchSideBar />
      </div>
    </>
  )
}
