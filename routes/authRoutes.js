import express from 'express'
import { register, login, refresh } from '../controllers/authController.js'

const auth_router = express.Router()

auth_router.post("/register", register)
auth_router.post("/login", login)
auth_router.post("/refresh", refresh)

export default auth_router
