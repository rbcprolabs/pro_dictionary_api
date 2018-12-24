import Joi from 'joi'

const term = Joi.string().regex(/^[а-яa-z ,.|:_-–—]{2,160}$/i)

const schema = {
  dictionaryId: Joi.string(),
  fullTerm: Joi.string(),
  parent: Joi.string(),
  term,
  termLowCase: Joi.string().regex(/^[а-яa-z ,.|:_-–—]{2,160}$/),
  childrens: Joi.array().items(term),
  synonyms: Joi.array().items(term),
}

const basePut = {
  dictionaryId: schema.dictionaryId.required(),
  parentId: Joi.string(),
}

export const put = {
  ...basePut,
  term: schema.term.required(),
}

export const putAll = {
  ...basePut,
  terms: Joi.array().items(Joi.object().keys({
    term: schema.term.required(),
  })).required(),
}

export const update = {
  ...schema,
}
