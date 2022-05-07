const joi = require('@hapi/joi')

//U can use joi to validate schema in ur project

const authSchema = joi.object({
    // username: joi.string().alphanum().min(4).max(10).required(),
    // email: joi.string().email().lowercase().required(),
    // password : joi.string().min(8).required()
})

module.exports = {
    authSchema,
}