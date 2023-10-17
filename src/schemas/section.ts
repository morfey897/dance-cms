import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { filterUnique } from "../utils/unique";
import i18nConfig from '../../i18n.config';

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Internal name',
      type: 'string',
    }),
    defineField({
      name: 'menuName',
      title: 'Menu',
      type: 'localeString',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor',
      type: "reference",
      to: { type: 'tag' },
    }),
    defineField({
      name: 'wrapper',
      title: 'Wrapper',
      type: "reference",
      to: { type: 'wrapper' },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'reference',
        to: { type: 'asset' },
        options: {
          filter: filterUnique
        }
      }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to action',
      type: 'reference',
      to: { type: 'callToAction' },
    }),
    defineField({
      name: 'divisions',
      title: 'Divisions',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'direction' }, { type: 'price' }],
        options: {
          filter: filterUnique
        }
      }]
    })
  ],
  preview: {
    select: {
      title: `name`,
      subtitle: `headline.${i18nConfig.defaultLocale}`,
      image: 'images.0.image',
    },
    prepare({ title, subtitle, image }) {
      return {
        title,
        subtitle,
        media: image,
      }
    },
  },
  options: {
    languageFilter: true,
  },
})
