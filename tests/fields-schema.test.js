import fieldsSchema from '../utils/fields-schema'

describe('Fields schema', () => {
  test(('Reject existing'), () => expect(fieldsSchema({
    name: {
      optional: false,
    },
  }, {})).rejects.toMatch('not exist'))

  test(('Resolve existing'), () => expect(fieldsSchema({
    name: {
      optional: false,
    },
  }, {
    name: '',
  })).resolves.toMatch('Success'))

  test(('Reject type'), () => expect(fieldsSchema({
    name: {
      type: String,
    },
  }, {
    name: false,
  })).rejects.toMatch('type error'))

  test(('Resolve type'), () => expect(fieldsSchema({
    name: {
      type: Boolean
    }
  }, {
    name: false,
  })).resolves.toBe('Success'))

  test(('Reject min'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        min: 4,
      },
    }
  }, {
    name: 'Tes',
  })).rejects.toBe('min'))

  test(('Resolve min'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        min: 3,
      },
    }
  }, {
    name: 'Tes',
  })).resolves.toBe('Success'))

  test(('Reject max'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        max: 2,
      },
    }
  }, {
    name: 'Tes',
  })).rejects.toBe('max'))

  test(('Resolve max'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        max: 3,
      },
    }
  }, {
    name: 'Tes',
  })).resolves.toBe('Success'))

  test(('Reject min/max number'), () => expect(fieldsSchema({
    name: {
      type: Number,
      length: {
        min: 2,
        max: 5,
      },
    }
  }, {
    name: 6,
  })).rejects.toBe('max'))

  test(('Resolve min/max number'), () => expect(fieldsSchema({
    name: {
      type: Number,
      length: {
        min: 2,
        max: 5,
      },
    }
  }, {
    name: 3,
  })).resolves.toBe('Success'))

  test(('Reject pattern'), () => expect(fieldsSchema({
    name: {
      type: String,
      pattern: /^[a-z_]+$/g,
    }
  }, {
    name: 'TEST TEST',
  })).rejects.toBe('pattern'))

  test(('Resolve pattern'), () => expect(fieldsSchema({
    name: {
      type: String,
      pattern: /^[a-z_]+$/g,
    }
  }, {
    name: 'test_test',
  })).resolves.toBe('Success'))
})
