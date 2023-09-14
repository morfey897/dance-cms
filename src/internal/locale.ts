import { defineType } from 'sanity';
import i18nConfig from '../../i18n.config';

function capitalize(str: string | undefined) {
  str = str || "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const localeFactory = (type: 'string' | 'text' | 'blockContent') => ({
  title: `Localized ${type}`,
  name: `locale${capitalize(type)}`,
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: i18nConfig.locales.map(lang => ({
    title: (i18nConfig.translation as Record<string, { title: string }>)[lang]?.title,
    name: lang,
    type: type,
    fieldset: lang === i18nConfig.defaultLocale ? undefined : 'translations'
  }))
})



export const localeString = defineType(localeFactory('string'));
export const localeText = defineType(localeFactory('text'));
export const localeBlockContent = defineType(localeFactory('blockContent'));
