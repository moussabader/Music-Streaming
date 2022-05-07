const express = require('express')
const morgan = require ('morgan')
const creteError = require ('http-errors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require ('cors')

require('dotenv').config({ path: '../../.env' })

require('../../db')

const profileRoute = require('./Routes/profile.route')


const limiter = rateLimit({
    max:5,
    windowMs: 1 * 60 * 1000,
    standardHeaders: true,
	legacyHeaders: false, 
})

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(limiter)
app.use(helmet.xssFilter());
app.use(helmet.hsts());

app.use(cors({
    origin: '*'
}));

app.use('/user', profileRoute)


app.get('/', (req, res) => {
  res.send('user service')
})

app.use(async(req,res,next)=>{
    // const error = new Error ("Not found")
    // error.status = 404
    // next(error)
    next(creteError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error :{
            status: err.status || 500,
            message: err.message,
        }
    })
})

 const PORT =  3003

 app.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })