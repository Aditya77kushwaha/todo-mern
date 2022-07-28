import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

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

function App() {
  const [txt, settxt] = useState("");
  const [todos, settodos] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8888/todos").then((res) => {
      settodos(res.data);
    });
  });
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
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
                        axios.get("http://localhost:8888/todos").then((res) => {
                          settodos(res.data);
                        });
                      });
                  }}
                >
                  Done
                </button>
                <button className="edit" onClick={openModal}>
                  Edit
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Edit `{todos[x].desc}`
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
                            .get("http://localhost:8888/todos")
                            .then((res) => {
                              settodos(res.data);
                            });
                        });
                      closeModal();
                    }}
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

export default App;
