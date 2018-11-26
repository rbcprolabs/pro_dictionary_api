/**
 * Remove space from start & end string
 * @param {string} text
 * @returns {string}
 *
 * @example
 * removeSpaces(" Text ") // "Text"
 */
export default function removeSpaces(text) {
  return text.replace(/(^\s*)|(\s*)$/g, '')
}
