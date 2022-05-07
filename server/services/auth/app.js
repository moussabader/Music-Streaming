const express = require('express')
const morgan = require ('morgan')
const creteError = require ('http-errors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config({ path: '../../.env' })
//require('./helpers/init_mongodb')
require('../../db')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const { verifyUserRole } = require('./helpers/jwt_helper')

const AuthRoute = require('./Routes/Auth.route')


//const MailRoute = require('./Routes/Mailing.route')


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

app.get('/', verifyAccessToken, async(req,res,next)=>{
     res.send("basic user")
})

app.get('/admin', verifyAccessToken, verifyUserRole('ADMIN'), async(req,res,next)=>{
    res.send("admin user")
})

app.get('/premium', verifyAccessToken, verifyUserRole('PREMIUM_USER'), async(req,res,next)=>{
    res.send("admin user")
})

app.use('/auth', AuthRoute)
//app.use('/mailing', MailRoute)


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

 const PORT =  3001

 app.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })