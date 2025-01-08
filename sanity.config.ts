import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import schemas from './sanity/schemas'

const config = defineConfig({
  projectId: 'z5623np1',
  dataset: 'production',
  title: 'Gabriel Studio',
  apiVersion: '2024-03-16', // todays date - American styles
  basePath: '/admin',
  plugins: [structureTool()], // formally known as deskTool()
  schema: { types: schemas },
  // useCdn: false, // dont think this needs to be in the config, but does need to be in the client-config.
})

export default config
