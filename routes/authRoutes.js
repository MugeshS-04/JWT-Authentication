import express from 'express'
import { register, login, refresh } from '../controllers/authController.js'
import { jwt_verify_refresh } from '../helpers/token.js'

const auth_router = express.Router()

auth_router.post("/register", register)
auth_router.post("/login", login)
auth_router.post("/refresh", jwt_verify_refresh, refresh)

export default auth_router
