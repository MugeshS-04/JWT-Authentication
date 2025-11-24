import express from 'express'
import { getDetails } from '../controllers/userController.js'
import { jwt_verify_access } from '../helpers/token.js'

const user_router = express.Router()

user_router.get('/details', jwt_verify_access, getDetails)

export default user_router