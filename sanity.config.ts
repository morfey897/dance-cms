import { SchemaTypeDefinition, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { deskStructure, schemaTypes } from './src'

export default defineConfig({
  name: 'default',
  title: 'kalipso',

  projectId: '2wnia9h8',
  dataset: 'production',

  plugins: [
    visionTool(),
    deskTool({ structure: deskStructure, })
  ],

  schema: {
    types: schemaTypes.filter(({ type }) => type != 'divider') as SchemaTypeDefinition[],
  },
})
