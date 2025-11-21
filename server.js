import express from 'express'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.send("<h1>Api is Working!</h1>")
})

app.listen(port, () => console.log(`Server is listening in port ${port}`))