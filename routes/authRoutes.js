import express from 'express'
import { celebrate, Joi } from 'celebrate'
import { register, login, refresh } from '../controllers/authController.js'
import { jwt_verify_refresh } from '../helpers/token.js'

const auth_router = express.Router()

auth_router.post("/register", celebrate({
    
    body : Joi.object({
            name : Joi.string().required(),
            age : Joi.number().integer().min(18).required(),
            email : Joi.string().email().required(),
            pass : Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!<>@#$%*?]).{8,}$")).required().messages({
                "string.pattern.base" : "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
                "string.empty" : "Password cannot be empty",
                "any.required" : "Password is required"
            }),
            conf_pass : Joi.string().valid(Joi.ref('pass')).messages({
                "any.only" : "Confirm password doesn't match with the password!"
            })
        })

}), register)

auth_router.post("/login", celebrate({

    body : Joi.object(
        {
            email : Joi.string().email().required(),
            pass : Joi.string().required()
        })
        
}), login)

auth_router.post("/refresh", jwt_verify_refresh, refresh)

export default auth_router
