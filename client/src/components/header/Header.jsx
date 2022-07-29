import React from "react";
import { useHistory, Link } from "react-router-dom";

const Header = ({ client, setclient }) => {
  const history = useHistory();
  return (
    <div>
      {client?.username ? (
        <>
          <p>Hi {client?.username}</p>
          <button
            onClick={() => {
              localStorage.clear();
              setclient({});
              history?.push("/login");
            }}
            className="login-button"
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;
