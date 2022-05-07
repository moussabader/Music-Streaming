//import status from 'http-status'
import config from '../config/index.js'
import axios from 'axios'
import bodyParser from 'body-parser';
import audit from 'express-requests-logger'
import logger from 'bunyan'

import AuthRoute from '../Routes/Auth.route.js'
import StreamingRoute from '../Routes/Streaming.route.js'
import UserRoute from '../Routes/User.route.js'


const jsonParser = bodyParser.json()
const api =  (app, options) => {
  const {repo} = options
  
  // rate limiting
  const authApiLimiter = config.authApiLimiter

  const userApiLimiter = config.userApiLimiter

  const streamingApiLimiter = config.streamingApiLimiter

  //Rate limiting the auth service
  app.use('/auth', authApiLimiter)

  //Rate limiting the user service
  app.use('/user', userApiLimiter)

  //Rate limiting the user service
  app.use('/streaming', streamingApiLimiter)



  app.use(audit({
    logger: logger,
    excludeURLs: ['/streaming'], // Exclude paths 
    request: {
        maskBody: ['password'], // Mask 'password' field in incoming requests
        excludeHeaders: ['authorization'],
        //excludeBody: ['creditCard'],
        //maskHeaders: ['header1'],
        maxBodyLength: 100 
    },
    response: {
        maskBody: ['session_token'], // Mask 'session_token' field in response body
        excludeHeaders: ['*'], // Exclude all headers from responses,
        //excludeBody: [], 
        maskHeaders: ['header1'], 
        maxBodyLength: 100 
    }
}));


  app.get('/',jsonParser, (req, res) => {
    //console.log(req.body)
    res.send('Aggregator service is working')
  })


  app.get('/status', (req, res) => {
    // check all services by pinging route 
    // options.servicesSettings
  })


// Auth service 
  
 app.use('/api/auth', AuthRoute)
  

// Streaming service

 app.use('/api/song', StreamingRoute)


// User service

app.use('/api/user', UserRoute)


}

export default api;