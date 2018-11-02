import { removeSpaces } from '../utils'

test('Remove spaces', () => {
  expect(removeSpaces(' text text ')).toEqual('text text')
  expect(removeSpaces('Text ')).toEqual('Text')
  expect(removeSpaces(' Text')).toEqual('Text')
  expect(typeof removeSpaces('Text')).toBe('string')
})