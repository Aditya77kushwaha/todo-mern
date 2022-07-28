import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [txt, settxt] = useState("");
  const [todos, settodos] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8888/todos").then((res) => {
      settodos(res.data);
    });
  });
  return (
    <div className="wrapper">
      <div className="search-input">
        <input
          type="text"
          className="text"
          value={txt}
          onChange={(e) => settxt(e.target.value)}
          placeholder="Add a new task.."
        />
        <button
          className="icon"
          onClick={() => {
            axios
              .post("http://localhost:8888/todo", {
                desc: txt,
              })
              .then((res) => {
                axios.get("http://localhost:8888/todos").then((res) => {
                  settodos(res.data);
                });
                settxt("");
              });
          }}
        >
        <div className="send"> <i class="fas fa-plus-square"></i></div>
        </button>
        <ul>
          {Object.keys(todos)?.map((x, ind) => {
            return (
              <li key={ind}>
                {ind + 1 + ". "}
                {todos[x].desc}
                <button
                  className="delete"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:8888/todos/${todos[x]._id}`)
                      .then((res) => {
                        console.log(res.data);
                        axios.get("http://localhost:8888/todos").then((res) => {
                          settodos(res.data);
                        });
                      });
                  }}
                >
                  Done
                </button>
                {/* <button
                  className="edit"
                  onClick={() => {
                    !txt && settxt(prompt("Enter new todo", txt));
                    console.log(txt);
                  }}
                >
                  Edit
                </button> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    
  );
}

export default App;
