import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: Rule => Rule.regex(/\w{2,}/i).error(`A tag should be more than 2 characters and contain A-Z, a-z, 0-9, and '-'.`),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    })
  ],
  preview: {
    select: {
      tag: 'tag',
      description: 'description',
    },
    prepare: ({ description, tag }) => {
      return {
        title: `#${tag}`,
        subtitle: description,
      }
    }
  }
})
