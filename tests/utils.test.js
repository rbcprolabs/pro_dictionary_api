import removeSpaces from '../src/utils/remove-spaces'

test('Remove spaces', () => {
  expect(' text text '::removeSpaces()).toEqual('text text')
  expect('Text '::removeSpaces()).toEqual('Text')
  expect(' Text'::removeSpaces()).toEqual('Text')
  expect(typeof 'Text'::removeSpaces()).toBe('string')
})
