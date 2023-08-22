import { defineField, defineType } from 'sanity';
import { JoystickIcon } from '@sanity/icons';

export default defineType({
  name: 'callToAction',
  title: 'Call To Action',
  type: 'document',
  icon: JoystickIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'internalUrl',
      title: 'Internal url',
      type: 'object',
      fields: [
        { title: 'Anchor', name: 'anchor', type: 'reference', to: { type: 'tag' } },
        { title: 'Page', name: 'page', type: 'reference', to: { type: 'page' } },
      ],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External url',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
  ],

  preview: {
    select: {
      title: 'title',
      externalUrl: 'externalUrl',
      internalSlug: 'internalUrl.page.slug.current',
      internalAnchor: 'internalUrl.anchor.tag',
    },
    prepare({ title, externalUrl, internalSlug, internalAnchor }) {
      return {
        title,
        subtitle: ((internalSlug || internalAnchor) && `${[internalSlug || "/", internalAnchor].filter(Boolean).join("#")}`) || externalUrl || "undefined"
      }
    },
  },
})
