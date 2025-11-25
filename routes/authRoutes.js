import express from 'express'
import { register, login, refresh } from '../controllers/authController.js'
import { jwt_verify_refresh } from '../helpers/token.js'
import { register_validate, login_validate } from './validation.js'

const auth_router = express.Router()

auth_router.post("/register", register_validate, register)
auth_router.post("/login", login_validate, login)
auth_router.post("/refresh", jwt_verify_refresh, refresh)

export default auth_router
