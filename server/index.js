const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./Model");

// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "Hanuman2912@",
//   host: "localhost",
//   port: 5432,
//   database: "todopern",
// });

mongoose.connect(
  "mongodb+srv://user:user123@cluster0.czd6hbi.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err); 
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.post("/todo", async (req, res) => {
  console.log(req.body)
  // const newTodo = await pool.query("insert into todo (description) values($1)", [req.body.todo])
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});
