const i = require('../')

i(['request', 'underscore'], { path: `${__dirname}/foo` }, err => {
  if (err) throw err
  console.log('Installed in foo!')
})

i(err => {
  if (err) throw err
  console.log('Installed in test!')
})

i({ path: `${__dirname}/bar` }, err => {
  if (err) throw err
  console.log('Installed in bar!')
})

var str = ''
const stream = new require('stream').Writable({
  write: function(chunk, encoding, next) {
    str += chunk.toString()
    next()
  }
})
i({ stdout: stream, stderr: stream, args: ['--verbose'] }, err => {
  if (err) throw err
  if (!str) throw new Error('Didn\'t write to stream')

  console.log('Installed with stream!')
})
