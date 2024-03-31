// Read these docs for full next-sanity/studio info:
// https://github.com/sanity-io/next-sanity#readme

'use client' // render this comp on the browser in the client.

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
export default function AdminPage() {
  return <NextStudio config={config} />
}
