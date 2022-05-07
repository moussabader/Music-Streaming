import express from 'express'
import config from '../config/index.js'
const router = express.Router()
import bodyParser from 'body-parser';
import axios from 'axios'
import {createProxyMiddleware} from 'http-proxy-middleware';

const jsonParser = bodyParser.json()


router.use('/post', createProxyMiddleware({target: config.services.streaming.url+':'+config.services.streaming.port+'/songs/post', changeOrigin: true}));
router.put('/update/:id', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.streaming.url+':'+config.services.streaming.port+'/songs/update/'+req.params['id'];
    //const response = await request(uri)

    axios.put(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })

  router.delete('/delete/:id', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.streaming.url+':'+config.services.streaming.port+'/songs/delete/'+req.params['id'];
    //const response = await request(uri)

    axios.delete(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })

  router.get('/get-songs', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.streaming.url+':'+config.services.streaming.port+'/songs/get-songs';
    //const response = await request(uri)

    axios.get(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })















export default router;