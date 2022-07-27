const express = require('express')
const app = express()
const port = 8888
const cors = require("cors")
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
    database: "todopern"
})



app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json("Hello world")
})

app.post("/todo", async (req, res) => {
    // console.log(req.body.todo)
    const newTodo = await pool.query("insert into todo (description) values($1)", [req.body.todo])
    res.json({ msg: req.body.todo })
})

app.listen(port, () => {
    console.log("Server running on port ", port)
})