const schema = {
  term: {
    type: String,
    pattern: /^[а-яА-Я |]+$/g,
  },
  // dictionary id
  dictionaryId: {
    type: String,
  },
  // term id
  parentId: {
    optional: true,
    type: String,
  },
  terms: {
    optional: true,
    type: Array,
  }
}

export default schema
