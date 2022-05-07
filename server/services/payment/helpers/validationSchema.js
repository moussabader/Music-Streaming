const joi = require('@hapi/joi')

const authSchema = joi.object({
    username: joi.string().alphanum().min(4).max(10),
    email: joi.string().email().lowercase(),
    password : joi.string().min(8), 
    profile : {
        firstName: joi.string().alphanum().min(4).max(10),
        lastName: joi.string().alphanum().min(4).max(10),
        avatar: joi.string().alphanum(),
        bio: joi.string().alphanum().min(0).max(100),
        birthday: joi.date()
    }
        
})

module.exports = {
    authSchema,
}