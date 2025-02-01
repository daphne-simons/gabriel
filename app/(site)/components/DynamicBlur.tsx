'use client'
import React from 'react'
import Image from 'next/image'
import { Project } from '@/sanity/models/sanity-client-models'

const DynamicBlur = ({ projectData }: { projectData: Project }) => {
  console.log('dynamic blur, projectData', projectData)
  if (!projectData.imageUrl || !projectData.blurData) {
    return null // Or a fallback UI
  }

  return (
    <div>
      <Image
        className="object-cover hover:scale-125 transition duration-500 ease-in-out"
        src={projectData.imageUrl}
        alt={projectData.altText || `Image for ${projectData.name}`}
        fill
        sizes="100vw"
        placeholder="blur"
        // uses the builtin Sanity lqip low quality image for blur
        blurDataURL={projectData.blurData}
        quality={100}
      />
    </div>
  )
}

export default DynamicBlur
