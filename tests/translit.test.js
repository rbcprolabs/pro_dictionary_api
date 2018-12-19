import cyrillicToTranslit from '../src/utils/cyrillic-to-translit'

test('Cyrillic to translit', () => {
  expect(cyrillicToTranslit('Овощи')).toEqual('Ovoschi')
  expect(cyrillicToTranslit('Живой мертвец', '_')).toEqual('ZHivoi_mertvec')
  expect(typeof cyrillicToTranslit('Транслит')).toBe('string')
})
