import InstanceofSwith from '../utils/instanceof-switch'

class TestError {}

class TestError1 {}

class TestError2 {}

describe('Instanceof Builder', () => {
  it('Case', () => {
    new InstanceofSwith(new TestError())
      .case(TestError, () => {
        expect(true).toBe(true)
      })
      .default(() => {
        expect(true).toBe(false)
      })
  })
  it('Multiple cases', () => {
    new InstanceofSwith(new TestError1())
      .case(TestError, () => {
        expect(false).toBe(true)
      })
      .case(TestError1, () => {
        expect(true).toBe(true)
      })
      .case(TestError2, () => {
        expect(false).toBe(true)
      })
      .default(() => {
        expect(false).toBe(true)
      })
  })
  it('Default', () => {
    new InstanceofSwith(new TestError())
      .case(TestError1, () => {
        expect(false).toBe(true)
      })
      .default(() => {
        expect(true).toBe(true)
      })
  })
})


