const _associations = {
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'ґ': 'g',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'e',
  'є': 'ye',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'i',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'h',
  'ц': 'c',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'sch',
  'ъ': '',
  'ы': 'i',
  'ь': '',
  'э': 'e',
  'ю': 'yu',
  'я': 'ya',
}

export default function cyrillicToTranslit(input, spaceReplacement) {
  if (!input) return ''

  let newStr = ''
  for (let i = 0; i < input.length; i++) {
    const isUpperCaseOrWhatever = input[i] === input[i].toUpperCase()
    let strLowerCase = input[i].toLowerCase()
    if (strLowerCase === ' ' && spaceReplacement) {
      newStr += spaceReplacement
      continue
    }
    let newLetter = _associations[strLowerCase]
    newStr += ('undefined' === typeof newLetter)
      ? isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase
      : isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter
  }
  return newStr
}
