import express from 'express'
const router = express.Router()
import bodyParser from 'body-parser';
import config from '../config/index.js'
import axios from 'axios'

const jsonParser = bodyParser.json()

router.post('/register', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/register';
    //const response = await request(uri)

    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


  router.post('/login', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/login';
    //const response = await request(uri)
    console.log(req.body)
    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE DATA =============")
      console.log(r.data)
      //console.log("============== FULL  STATUS  ============")
     
      if(r.data.accessToken){
      res.json(r.data)
      }

      if(r.response.status != 200){
        res.status(r.response.status).send("An error has occured")
      }
    }).catch(r=>{
      if(!r)
      return
      console.log("=================catch=================")
      console.log(r)
      if(r.response.status == 400){
        res.status(r.response.status).send("Account not found")
      }else{
        res.status(r.response.status).send("An error has occured!")
      }
    })
    
  })

  router.post('/logout', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/logout';
    //const response = await request(uri)
   
    axios.delete(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


  router.post('/refreshToken', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/refresh-token';
    //const response = await request(uri)
   
    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


export default router;