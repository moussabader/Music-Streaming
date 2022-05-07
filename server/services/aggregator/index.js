import events from 'events'
import server from './server/server.js'
import config from './config/index.js'

const eventEmitter = new events()
console.log('--- Aggregator ---')
//console.log(config)
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})


server.start({
  port: config.port,
  services:config.servicesSettings
}).then(app => {
  console.log(`Server started succesfully, running on port: ${config.port}.`)
  app.on('close', () => {
    rep.disconnect()
  })
})



eventEmitter.emit('boot.ready')