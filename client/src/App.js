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
                  console.log(res.data);
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
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
