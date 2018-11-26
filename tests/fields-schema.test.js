import fieldsSchema, { Error } from '../utils/fields-schema'

describe('Fields schema', () => {
  it(('Reject existing'), () => expect(fieldsSchema({
    name: {
      optional: false,
    },
  }, {})).rejects.toThrow(Error.NOT_EXIST('name').message))

  it(('Resolve existing'), () => expect(fieldsSchema({
    name: {
      optional: false,
    },
  }, {
    name: '',
  })).resolves.toBe())

  it(('Reject type'), () => expect(fieldsSchema({
    name: {
      type: String,
    },
  }, {
    name: false,
  })).rejects.toThrow(Error.WRONG_TYPE('name').message))

  it(('Resolve type'), () => expect(fieldsSchema({
    name: {
      type: Boolean
    }
  }, {
    name: false,
  })).resolves.toBe())

  it(('Reject min'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        min: 4,
      },
    }
  }, {
    name: 'Tes',
  })).rejects.toThrow(Error.MIN('name', 4).message))

  it(('Resolve min'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        min: 3,
      },
    }
  }, {
    name: 'Tes',
  })).resolves.toBe())

  it(('Reject max'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        max: 2,
      },
    }
  }, {
    name: 'Tes',
  })).rejects.toThrow(Error.MAX('name', 2).message))

  it(('Resolve max'), () => expect(fieldsSchema({
    name: {
      type: String,
      length: {
        max: 3,
      },
    }
  }, {
    name: 'Tes',
  })).resolves.toBe())

  it(('Reject min/max number'), () => expect(fieldsSchema({
    name: {
      type: Number,
      length: {
        min: 2,
        max: 5,
      },
    }
  }, {
    name: 6,
  })).rejects.toThrow(Error.MAX('name', 5).message))

  it(('Resolve min/max number'), () => expect(fieldsSchema({
    name: {
      type: Number,
      length: {
        min: 2,
        max: 5,
      },
    }
  }, {
    name: 3,
  })).resolves.toBe())

  it(('Reject pattern'), () => expect(fieldsSchema({
    name: {
      type: String,
      pattern: /^[a-z_]+$/g,
    }
  }, {
    name: 'TEST TEST',
  })).rejects.toThrow(Error.PATTERN('name', '/^[a-z_]+$/g').message))

  it(('Resolve pattern'), () => expect(fieldsSchema({
    name: {
      type: String,
      pattern: /^[a-z_]+$/g,
    }
  }, {
    name: 'test_test',
  })).resolves.toBe())
})
