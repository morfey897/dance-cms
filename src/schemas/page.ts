import { defineField, defineType } from 'sanity'
import { DashboardIcon } from '@sanity/icons'
import { filterUnique } from '../utils/unique';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DashboardIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fieldsets: [
    {
      name: 'seo', title: 'SEO', options: {
        collapsible: true,
      }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .trim()
          .slice(0, 200)
      },
      validation: Rule => Rule.custom((value) => {
        if (!value?.current) return true;
        const isValid = /^\/[\w\d]*/.test(value.current);
        return isValid || 'Slug should start from symbol "/" and contain a-z or 0-9 symbols';
      })
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{
        type: 'reference', to: { type: 'section' }, options: {
          filter: filterUnique
        }
      }],
      group: 'content'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      group: 'seo',
      fieldset: 'seo',
    }),
    defineField({
      name: 'ogTitle',
      title: 'OG title',
      type: 'string',
      group: 'seo',
      fieldset: 'seo',
    }),
    defineField({
      name: 'ogDescription',
      title: 'OG description',
      type: 'text',
      group: 'seo',
      fieldset: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'reference',
      to: { type: 'asset' },
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      ogImage: 'ogImage.image.asset',
    },
    prepare({ title, slug, ogImage }) {
      return {
        title,
        media: ogImage,
        subtitle: `${slug?.current}`
      }
    },
  },
})