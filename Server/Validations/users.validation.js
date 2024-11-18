const Joi = require('joi')

const usersValidation = Joi.object({
    username : Joi.string().required().min(3).max(100) ,
    email : Joi.string().email().required(),
    password : Joi.string().min(8).max(50).required(),
    userProfile : Joi.string(),
    verify : Joi.boolean().default(false)
})

module.exports = usersValidation ;