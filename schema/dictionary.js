const schema = {
  name: {
    type: String,
    pattern: /^[а-яА-Я ]+$/g,
    length: {
      min: 2,
      max: 100,
    },
  },
  slug: {
    type: String,
    pattern: /^[a-z_]+$/g,
    length: {
      min: 2,
      max: 100,
    },
  },
  isFlat: {
    type: Boolean,
  },
  isOpen: {
    type: Boolean,
  },
}

export default schema

export const updateSchema = {
  ...schema,
  name: {
    optional: true,
  },
  slug: {
    optional: true,
  },
  isFlat: {
    optional: true,
  },
  isOpen: {
    optional: true,
  },
}
