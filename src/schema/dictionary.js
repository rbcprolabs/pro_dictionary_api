import Joi from 'joi'

const schema = {
  name: Joi.string().regex(/^[а-я ]{2,80}$/i),
  slug: Joi.string().regex(/^[a-z_]{2,80}$/),
  isFlat: Joi.boolean(),
  isOpen: Joi.boolean(),
  placeholderRule: Joi.string().regex(/^[а-яa-z0-9 ,.|:_-–—]{2,160}$/i),
}

export const put = {
  ...schema,
  name: schema.name.required(),
  slug: schema.slug.required(),
  isFlat: schema.isFlat.required(),
}

export const update = {
  ...schema,
}
