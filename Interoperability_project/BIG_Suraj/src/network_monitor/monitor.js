const { Telnet } = require('telnet-client')
const connection = new Telnet()

// these parameters are just examples and most probably won't work for your use-case.
const params = {
  host: '10.210.12.216',
  port: 3002,
  shellPrompt: '/ # ', // or negotiationMandatory: false
  timeout: 1500
}

connection.on('ready', prompt => {
  connection.exec(cmd, (err, response) => {
    console.log(response)
  })
})

connection.on('timeout', () => {
  console.log('socket timeout!')
  connection.end()
})

connection.on('close', () => {
  console.log('connection closed')
})

connection.connect(params)
