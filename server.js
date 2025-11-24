import express from 'express'
import dotenv from 'dotenv'
import auth_router from './routes/authRoutes.js'
import user_router from './routes/userRoutes.js'

const app = express()
const port = 8080

dotenv.config()
app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.send("<h1>Api is Working!</h1>")
})

app.use("/auth/", auth_router)
app.use("/user/", user_router)

app.listen(port, () => console.log(`Server is listening in port ${port}`))