const jwt = require('jsonwebtoken')
const createError  =require('http-errors')
const { token } = require('morgan')
//const User = require('../Models/User.model')
const User = require('../../../models/User')


module.exports  ={
    
    verifyAccessToken: (req,res,next)=>{
        if(!req.headers['authorization']) 
            return next(createError.Unauthorized())

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token  = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=> {
            if (err){   
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return next(createError.Unauthorized(message))           
            }

            req.payload = payload
            next()
        })
    },
    
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload)=>{
                if (err) return reject(createError.Unauthorized())
                const userId = payload.audience
                let user = await User.findById(userId)

                console.log(user.ROLE)
                resolve(userId)
            })
        })
    },

    verifyUserRole : (userRole) => {
        return (req, res, next) => {
            if(!req.headers['authorization']) 
            return next(createError.Unauthorized())

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token  = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload)=> {
            if (err){   
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return next(createError.Unauthorized(message))           
            }
            
            const userId = payload.audience
            let user = await User.findById(userId)

            if(user.ROLE !== userRole){
               res.status(401)
               return res.send('Not allowed') 
            }

            next()
            
        })
          
        }
      },

      UserIdFromAccessToken: (req,res,next)=>{
        if(!req.headers['authorization']) 
            return next(createError.Unauthorized())

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token  = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, payload)=> {
            if (err){   
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return next(createError.Unauthorized(message))           
            }

            const userId = payload.audience
                let user = await User.findById(userId)

                console.log(user.ROLE)
                resolve(userId)
        })
    },

      
}