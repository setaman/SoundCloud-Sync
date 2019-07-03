const express = require('express')
const app = express()
const port = 3005

// Background communication logic

const { fork } = require('child_process')

const backgroundProcess = fork('../../src/background/index.js')
backgroundProcess.on('message', msg => {
  console.log(msg)
})

app.listen(port, () => {
  // process.send('Background server running on' + port)
  console.info('Background server running on ' + port)
})

app.get('/', (req, res) => {
  res.send('Background server running on ' + port)
})

app.get('/init', (req, res) => {
  res.send('Start initialization')
})
