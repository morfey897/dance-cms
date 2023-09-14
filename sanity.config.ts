import { SchemaTypeDefinition, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { deskStructure, schemaTypes } from './src'
import { languageFilter } from '@sanity/language-filter'
import i18nConfig from "./i18n.config";

export default defineConfig({
  name: 'default',
  title: 'kalipso',

  projectId: '2wnia9h8',
  dataset: 'production',

  plugins: [
    visionTool(),
    deskTool({ structure: deskStructure, }),
    languageFilter({
      supportedLanguages: i18nConfig.locales.map(id => ({
        id,
        title: (i18nConfig.translation as Record<string, { title: string; }>)[id]?.title || id,
      })),
      defaultLanguages: [i18nConfig.defaultLocale],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        return !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name);
      }

    })
  ],

  schema: {
    types: schemaTypes.filter(({ type }) => type != 'divider') as SchemaTypeDefinition[],
  },
})
