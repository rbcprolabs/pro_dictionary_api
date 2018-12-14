const
  fs = require('fs'),
  readline = require('readline')

try {
  require('./transform-db/index')
} catch (_error) {
  console.error(`
    Cant't find transformator.
    Make file with name index.js in ./transform-db
    Content for example:\n
    module.exports = function (dbItem) {
      dbItem.title.s = dbItem.title.s.replace('^', '?')
      return dbItem
    }
  `)
  process.exit(1)
}

const transform = require('./transform-db/index')

const lineReader = readline.createInterface({
  input: fs.createReadStream('./scripts/transform-db/input')
})

let result = ''

function appendToResult(line) {
  result += line + '\n'
}

lineReader.on('line', (line) => {
  appendToResult(
    JSON.stringify(
      transform(
        JSON.parse(
          line
        )
      )
    )
  )
})

lineReader.on('close', () => {
  fs.writeFileSync('./scripts/transform-db/result', result)
})
