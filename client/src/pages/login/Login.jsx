import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user1, setuser1] = useState({});
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
        className="register"
        onClick={() => {
          //   console.log(user);
          axios.post("http://localhost:8888/login", user).then((res) => {
            // setuser((prevVal) => ({
            //   ...prevVal,
            //   [user.username]: res.data.username,
            // }));
            setuser1(res.data);
            // console.log(res.data);
            console.log("user is ", user1);
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
