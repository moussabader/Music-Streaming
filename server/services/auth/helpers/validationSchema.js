const joi = require('@hapi/joi')

const authSchema = joi.object({
    username: joi.string().alphanum().min(4).max(10),
    email: joi.string().email().lowercase().required(),
    password : joi.string().min(8).required()
})

module.exports = {
    authSchema,
}