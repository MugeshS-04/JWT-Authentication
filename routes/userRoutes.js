import express from 'express'
import { getDetails, setDetails } from '../controllers/userController.js'
import { jwt_verify_access } from '../helpers/token.js'
import { celebrate, Joi } from 'celebrate'

const user_router = express.Router()

user_router.get('/details', jwt_verify_access, getDetails)

user_router.post('/setdetails', celebrate({
    
    body : Joi.object({
            name : Joi.string(),
            age : Joi.number().integer().min(18),
            email : Joi.string().email().required(),
        })

}), jwt_verify_access, setDetails)

export default user_router