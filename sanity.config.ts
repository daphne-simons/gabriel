import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import 'dotenv/config'
// import project from './sanity/schemas/project-schema'
import schemas from './sanity/schemas'
// const sanId = process.env.SANITY_PROJECT_ID || 'DEFAULT'

const config = defineConfig({
  projectId: 'z5623np1',
  dataset: 'production',
  title: 'My Personal Website',
  apiVersion: '2024-03-16', // todays date - American styles
  basePath: '/admin',
  plugins: [structureTool()], // formally known as deskTool()
  schema: { types: schemas },
  // useCdn: false, -- dont think this needs to be in the config, but does need to be in the Client.
})

export default config
