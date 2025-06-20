import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

import schemas from './sanity/schemas'

const config = defineConfig({
  projectId: 'z5623np1',
  dataset: 'production',
  title: 'Gabriel Studio',
  apiVersion: '2024-03-16', // todays date - American styles
  basePath: '/admin',
  plugins: [
    structureTool(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Google Blue', value: '#1C73E8' },
        { label: 'Google Red', value: '#EA4335' },
        { label: 'Google Green', value: '#34A853' },
        { label: 'Google Orange', value: '#E37400' },
        { label: 'Custom...', value: 'custom' },
      ],
      enableSearch: true,
    }),
  ], // formally known as deskTool()
  schema: { types: schemas },
  // useCdn: false, // dont think this needs to be in the config, but does need to be in the client-config.
})

export default config
