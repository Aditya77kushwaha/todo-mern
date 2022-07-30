import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Home.css"
// import { UserContext } from "../../Context";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Home({ client, setclient }) {
  const [txt, settxt] = useState("");
  const [todos, settodos] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8888/todos/${client._id}`).then((res) => {
      settodos(res.data);
    });
  });
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="wrapper">
      <div className="search-input">
        <input
          type="text"
          className="text"
          value={txt}
          onChange={(e) => settxt(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className="icon"
          onClick={() => {
            console.log(client._id, client.username);
            axios
              .post("http://localhost:8888/todo", {
                userId: client._id,
                desc: txt,
              })
              .then((res) => {
                axios
                  .get(`http://localhost:8888/todos/${client._id}`)
                  .then((res) => {
                    settodos(res.data);
                  });
                settxt("");
              });
          }}
        >
      <div className="send"> <i class="fas fa-plus-square"style={{fontSize:"22px",color:"red" }}></i></div>
        </button>
        
        <ul className="delete-box">
          {Object.keys(todos)?.map((x, ind) => {
            return (
              <li className="todo-list" key={ind}>
                <p className="desc">
                {ind + 1 + "."}
                {/* {todos[x].desc} */}
                {todos[x].desc}</p>
                <button
                  className="delete-btn"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:8888/todos/${todos[x]._id}`)
                      .then((res) => {
                        axios
                          .get(`http://localhost:8888/todos/${client._id}`)
                          .then((res) => {
                            settodos(res.data);
                          });
                      });
                  }}
                >
                 <i className="remove" class="fas fa-check" style={{fontSize:"20px",color:"red" }}></i>
                </button>
               
                <button className="edit" onClick={openModal}>
                <i class="fas fa-pencil-alt" style={{fontSize:"20px",color:"red"}}></i>
                </button>
                <Modal className="poppups"
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    <span>Edit</span> <br />``{todos[x].desc}``
                  </h2>
                  <button onClick={closeModal}>Cancel</button>

                  <input
                    type="text"
                    className="text"
                    value={txt}
                    onChange={(e) => settxt(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      axios
                        .put(`http://localhost:8888/todos/${todos[x]._id}`, {
                          desc: txt,
                        })
                        .then((res) => {
                          settxt("");
                          axios
                            .get(`http://localhost:8888/todos/${client._id}`)
                            .then((res) => {
                              settodos(res.data);
                            });
                        });
                      closeModal();
                    }}
                    disabled={!txt}
                  >
                    Okay
                  </button>
                </Modal>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
