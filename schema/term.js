const schema = {
  // dictionary id
  dictionaryId: {
    type: String,
  },
  // term id
  parentId: {
    optional: true,
    type: String,
  },
}

export default schema

export const put = {
  ...schema,
  term: {
    type: String,
  },
}

export const putAll = {
  ...schema,
  terms: {
    optional: true,
    type: Object,
  },
}
