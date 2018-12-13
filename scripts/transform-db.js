const
  fs = require('fs'),
  readline = require('readline')

try {
  require('./prepare-db/index')
} catch (_error) {
  console.error(`
    Cant't find transformator.
    Make file with name index.js in ./prepre-db
    Content for example:\n
    module.exports = function (dbItem) {
      dbItem.title.s = dbItem.title.s.replace('^', '?')
      return dbItem
    }
  `)
  process.exit(1)
}

const transform = require('./prepare-db/index')

const lineReader = readline.createInterface({
  input: fs.createReadStream('./scripts/prepare-db/input')
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
  fs.writeFileSync('./scripts/prepare-db/result', result)
})
