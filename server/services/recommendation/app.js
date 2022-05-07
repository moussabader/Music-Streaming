const express = require('express')
const morgan = require ('morgan')
const creteError = require ('http-errors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cron = require('node-cron');

require('dotenv').config({ path: '../../.env' })

require('../../db')

const modelToCSV = require('./Routes/modelToCSV.route')
const generateCSV = require('./helpers/generateCSV')

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

app.get('/', async(req,res,next)=>{
     res.send("basic user")
})

app.use('/modelToCSV', modelToCSV)

//Cron every night at midnight
cron.schedule('0 0 * * *', generateCSV.generate);
cron.schedule('0 0 * * *', generateCSV.generateMusic);

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

 const PORT =  3001

 app.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })