const createError = require('http-errors')
const { authSchema } = require('../helpers/validationSchema')
//const user = require('../Models/User.model')
const user = require('../../../models/User')
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyUserRole, UserIdFromAccessToken } = require('../helpers/jwt_helper')
const { sender, confirmEmail }= require('../helpers/Mailing.service')
const bcrypt = require('bcrypt')

module.exports = {
    register: async(req,res,next)=>{
        try {
           const result = await authSchema.validateAsync(req.body) 
    
            const exist = await user.findOne({email : result.email})
            if(exist) 
                throw createError.Conflict(`${result.email} is already been registered`)
        
            const User = new user(result)
            const savedUser = await User.save()
           
            const accessToken = await signAccessToken(savedUser.id)
            const refreshToken = await signRefreshToken(savedUser.id)
            sender(result.email,refreshToken,req.headers.host,result.username)
    
            res.send({accessToken, refreshToken })
        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }      
    },
    
    login: async(req,res,next)=>{
        try {
           console.log(req.body)
             const result = await authSchema.validateAsync(req.body)
             const User = await user.findOne({ email: result.email})
     
             console.log(User)
             if (!User) throw createError.NotFound("User not registered")
     
             const isMatch = await User.isValidPassword(result.password)
             if(!isMatch) throw createError.Unauthorized("Username or Password is not valid")
     
             const accessToken = await signAccessToken(User.id)
             const refreshToken = await signRefreshToken(User.id)
     
             res.send({accessToken, refreshToken})
        } catch (error) {
            if(error.isJoi === true) return next(createError.BadRequest("invalid Username or Password")) 
            next(error)
        }
     },

     refreshToken: async(req,res,next)=>{
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
    
            const NewAccessToken = await signAccessToken(userId)
            const NewRefreshToken = await signRefreshToken(userId)
    
            console.log('s')
            res.send({NewAccessToken, NewRefreshToken})
        } catch (error) {
            next(error)
        }
    },

    logout: async(req,res,next)=>{
        try {
            let { refreshToken } = req.body
            let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
            let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
        
            // now just concat the hashed random number to the end of the token
            refreshToken = refreshToken + hashedRandomNumberToAppend;
            return res.status(200).json('logout');  
    
        } catch (error) {
            next(error)
        }
    },

    getIdFromAccessToken: async(req,res,next)=>{
        try {
            let { accessToken } = req.body
            let userId = await UserIdFromAccessToken(accessToken)
            res.send(userId)
            
        } catch (error) {
            next(error)
        }
    },

    ConfirmAccount: async(req,res,next)=>{
        try {
            confirmEmail(req, res)
            
        } catch (error) {
            next(error)
        }
    }
}