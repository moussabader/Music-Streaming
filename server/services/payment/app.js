const express = require('express')
const morgan = require ('morgan')
const creteError = require ('http-errors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require ('cors')


require('dotenv').config({ path: '../../.env' })

require('../../db')


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const paymentRoute = require('./Routes/payment.route')

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
app.use('/payment', paymentRoute)

app.get('/', (req, res) => {
  res.send('payment service')
})

app.use(async(req,res,next)=>{
   
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

 const PORT =  3006

 app.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })