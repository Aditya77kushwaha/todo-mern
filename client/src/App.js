import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [txt, settxt] = useState("");
  const [todos, settodos] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8888/todos").then((res) => {
      settodos(res.data);
    });
  });
  return (
    <div className="App">
      <div className="new-todo">
        <input
          type="text"
          className="text"
          value={txt}
          onChange={(e) => settxt(e.target.value)}
        />
        <button
          className="send"
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
          Send
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
