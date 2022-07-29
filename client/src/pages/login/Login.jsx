import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ client, setclient }) => {
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [islogin, setislogin] = useState(false);

  const history = useHistory();
  const handleChange = (e) => {
    setuser((prevVal) => ({ ...prevVal, [e?.target?.name]: e?.target?.value }));
  };

  return (
    <div className="register">
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="email"
        className="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="password"
        className="password"
        onChange={handleChange}
      />
      <button
        className="login"
        onClick={() => {
          setislogin(true);
          axios
            .post("http://localhost:8888/login", user)
            .then((res) => {
              setclient(res.data);
              localStorage.setItem("client", JSON.stringify(res.data));
            })
            .catch((e) => {
              console.log("LOGIN ERROR", e);
            })
            .finally(() => {
              setislogin(false);
              history.push("/");
            });
        }}
        disabled={islogin}
      >
        Login
        {islogin && (
          <>
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Loading...</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Login;
