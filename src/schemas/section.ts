import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { filterUnique } from "../utils/unique";

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
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
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
      type: 'blockContent',
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
        type: 'reference', to: { type: 'direction' }, options: {
          filter: filterUnique
        }
      }]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
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
})
