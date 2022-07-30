const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
const mongoose = require("mongoose");
const { Todo, User } = require("./Model");
// const User = require("./Model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "Hanuman2912@",
//   host: "localhost",
//   port: 5432,
//   database: "todopern",
// });

mongoose.connect(
  process.env.MONGODB_URI,
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

//user routes
//REGISTER
app.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//todo routes
//get all todos of a user
app.get("/todos/:username", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.username });
    const todos = await Todo.find({ userId: user._id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todos = await Todo.findById(req.params.id);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  //   const todo = await Todo.findById(req.params.id);
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  try {
    await todo.delete();
    res.status(200).json("Todo has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new todo
app.post("/todo", async (req, res) => {
  console.log(req.body);
  // const newTodo = await pool.query("insert into todo (description) values($1)", [req.body.todo])
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});
