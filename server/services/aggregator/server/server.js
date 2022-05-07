import express from 'express';
import bodyParser from 'body-parser';
import api from '../api/index.js'


const start = (options) => {
    return new Promise((resolve, reject) => {
      if (!options.port) {
        reject(new Error('The server must be started with an available port'))
      }
  
      const app = express()

      /*app.use((err, req, res, next) => {
        reject(new Error('Something went wrong!, err:' + err))
        res.status(500).send('Something went wrong!')
      })*/
  
      api(app, options)
  
      const server = app.listen(options.port, () => resolve(server))
    })
  }

  export default Object.assign({}, {start})