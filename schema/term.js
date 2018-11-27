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
  term: {
    optional: true,
    type: String,
    pattern: /^[а-яА-Я |]+$/g,
  },
  terms: {
    optional: true,
    type: Object,
  }
}

export default schema
