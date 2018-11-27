// Alias for serverless local invoke
const { spawn } = require('child_process')

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const
  api = process.argv[2],
  method = process.argv[3]

if (api === undefined || method === undefined) {
  console.error('\x1b[31mAPI or method not exist. \n\x1b[33mFor example: yarn invoke-local dictionary getAll\x1b[0m')
  process.exit(1)
}

const
  funcName = `${method.capitalize().match(/[A-Z][a-z]+/g).join('-').toLowerCase()}`,
  mockPath = `mocks/${api}/${funcName}.json`,
  fullFuncName = `${api}-${funcName}`


const child = spawn('node', ['node_modules/serverless/bin/serverless', 'invoke', 'local', '--function' ,fullFuncName, '--path', mockPath])

process.stdin.pipe(child.stdin)

child.stdout.on('data', (data) =>
  console.log(data.toString('utf8'))
)

child.stdin.on('close', () =>
  process.exit(0)
)
