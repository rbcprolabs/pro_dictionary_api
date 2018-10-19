import cyrillicToTranslit from '../utils/cyrillicToTranslit'

test('Cyrillic to translit', () => {
  expect(cyrillicToTranslit('Овощи')).toEqual('Ovoschi')
  expect(cyrillicToTranslit('Живой мертвец', '_')).toEqual('ZHivoi_mertvec')
  expect(typeof cyrillicToTranslit('Транслит')).toBe('string')
})
