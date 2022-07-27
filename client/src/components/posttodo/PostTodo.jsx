import React, { useState } from "react";
import axios from "axios";
import "./PostTodo.css";

const PostTodo = () => {
  const [txt, settxt] = useState("");
  return (
    <div>
      <div className='new-todo'>
        <input
          type='text'
          className='text'
          value={txt}
          onChange={(e) => settxt(e.target.value)}
        />
        <button
          className='send'
          onClick={() => {
            axios
              .post("http://localhost:8888/todo", {
                todo: txt,
              })
              .then((res) => {
                console.log(res.data.msg);
              });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PostTodo;
