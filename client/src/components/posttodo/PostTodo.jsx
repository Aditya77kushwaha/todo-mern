import React, { useState } from "react";
import axios from "axios";
import "./PostTodo.css";

const PostTodo = () => {
  const [txt, settxt] = useState("");
  return (
    <div className="body">
    <div className="wrapper">
      <div className="search-input">
        <input
          type='text'
          className='text'
          value={txt}
          onChange={(e) => settxt(e.target.value)}
          placeholder="Add a new task.."
        />
        <button
          className='icon'
          onClick={() => {
            axios
              .post("http://localhost:8888/todo", {
                todo: txt,
              })
              .then((res) => {
                console.log(res.data.msg);
              });
          }}
          disabled={true}
        >
          <div className="icon"> <i class="fas fa-plus-square"></i></div>
        </button>
      </div>
    </div>
    </div>

    
  );
};

export default PostTodo;
