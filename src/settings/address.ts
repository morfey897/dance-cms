import { defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons'


export default defineType({
  name: 'address',
  title: 'Address',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'place',
      title: 'Place',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
    }),
    defineField({
      name: 'building',
      title: 'Building',
      type: 'string',
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
    }),
    defineField({
      name: 'geo',
      title: 'Geo position',
      type: 'geopoint',
    }),
  ],
  preview: {
    select: {
      place: 'place',
      country: 'country',
      city: 'city',
      street: 'street',
      building: 'building',
    },
    prepare: ({ place, country, city, street, building }) => {
      return {
        title: place,
        subtitle: [building, street, city, country].filter(a => !!a).join(" ")
      }
    }
  }
});