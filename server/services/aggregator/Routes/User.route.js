import express from 'express'
const router = express.Router()
import bodyParser from 'body-parser';
import config from '../config/index.js'
import axios from 'axios'

const jsonParser = bodyParser.json()

router.get('/getAll', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.user.url+':'+config.services.user.port+'/user/getAll';
    //const response = await request(uri)

    axios.get(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


  router.get('/getOne/:id', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.user.url+':'+config.services.user.port+'/user/getOne/'+req.params['id'];
    //const response = await request(uri)

    axios.get(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })

 
  router.delete('/delete/:id', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.user.url+':'+config.services.user.port+'/user/deleteUser/'+req.params['id'];
    //const response = await request(uri)

    axios.delete(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })


  })


    router.patch('/update/:id', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/update/'+req.params['id'];
      //const response = await request(uri)
  
      axios.patch(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })



    router.put('/follow/:id/:f', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/follow/'+req.params['id']+'/'+req.params['f'];
      //const response = await request(uri)
  
      axios.put(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })

    router.put('/unfollow/:id/:f', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/unfollow/'+req.params['id']+'/'+req.params['f'];
      //const response = await request(uri)
  
      axios.put(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })


    router.get('/followers/:id', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/followers/'+req.params['id'];
      //const response = await request(uri)
  
      axios.get(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })

    router.get('/following/:id', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/following/'+req.params['id'];
      //const response = await request(uri)
  
      axios.get(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })


    router.post('/confirmPasswordUpdate/:id', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/confirmPasswordUpdate/'+req.params['id'];
      //const response = await request(uri)
  
      axios.post(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })

    router.post('/resetPassword/:id', jsonParser, (req, res) => {
      //const token = 
      const uri = config.services.user.url+':'+config.services.user.port+'/user/resetPassword/'+req.params['id'];
      //const response = await request(uri)
  
      axios.post(uri,req.body).then(r=>{
        //console.log("============== RESPONSE =============")
        //console.log(r.data)
        res.json(r.data)
      })
      
    })
 

export default router;