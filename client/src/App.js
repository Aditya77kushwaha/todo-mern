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
        <div className="send"> <i class="fas fa-plus-square"style={{fontSize:"22px",color:"red" }}></i></div>
        </button>
        <hr/>
        <ul className="delete-box">
          {Object.keys(todos)?.map((x, ind) => {
            return (
              <li className="todo-list" key={ind}>
                {ind + 1 + ". "}
                <p className="desc">{todos[x].desc}</p>
                <button
                  className="delete-btn"
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
            
                  <i className="remove" class='fas fa-cut' style={{fontSize:"20px",color:"red" }}></i>
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
