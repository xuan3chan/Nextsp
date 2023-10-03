import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post("", { userName, password })
      .then((res) =>
        localStorage.setItem("accessToken", JSON.stringify(res.data))
      )
      .catch((err) => console(err));
    navigate("/");
  };
  return (
    <div className="body">
      <div className="boxl">
        <div className="form">
          <h1 className="h2">Sign in</h1>
          <div className="inputBox">
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <Link className="link" to="/a">
              Register
            </Link>
          </div>
          <input type="submit" value="Login" onClick={() => handleLogin()} />
        </div>
      </div>
    </div>
  );
};
