import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setuser((prevVal) => ({ ...prevVal, [e?.target?.name]: e?.target?.value }));
  };
  return (
    <div className="register">
      <input
        type="text"
        name="username"
        value={user.username}
        placeholder="username"
        className="username"
        onChange={handleChange}
      />
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
          console.log(user);
          axios.post("http://localhost:8888/register", user).then((res) => {
            console.log(res.data);
          });
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
