import { defineType, Rule as ValidationRule } from 'sanity';
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
    fieldset: lang === i18nConfig.defaultLocale ? undefined : 'translations',
    validation: (Rule: ValidationRule) => Rule.custom<string>((value, context) => {
      if (context.type?.name !== 'string' && context.type?.name !== 'text') return true;
      if (lang === i18nConfig.defaultLocale) {
        if (!value) return {
          message: `Can't be empty`,
        };
        if (value.trim().length < 4) return {
          message: `Should type more than 3 symbols`,
        };
      }
      return true;
    }),
  }))
})



export const localeString = defineType(localeFactory('string'));
export const localeText = defineType(localeFactory('text'));
export const localeBlockContent = defineType(localeFactory('blockContent'));
