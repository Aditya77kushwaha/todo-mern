const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json("Hello world")
})

app.post("/todo", async (req, res) => {
    console.log(req.body.todo)
    res.json({ msg: "Success" })
})

app.listen(port, () => {
    console.log("Server running on port ", port)
})