import express from 'express'
import { getDetails } from '../controllers/userController.js'

const user_router = express.Router()

user_router.get('/details', getDetails)

export default user_router