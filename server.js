import express from 'express'
import auth_router from './routes/authRoutes'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded())


app.get("/", (req, res) => {
    res.send("<h1>Api is Working!</h1>")
})

app.post("/auth", auth_router)

app.listen(port, () => console.log(`Server is listening in port ${port}`))