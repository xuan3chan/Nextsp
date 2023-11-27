import React from "react";

import "../../assets/css/Login.css"
function LoginFromNew(props) {
  return (
    <div>
      <input
        type="radio"
        name="optionScreen"
        id="SignIn"
        hidden
        checked
      ></input>
      <input type="radio" name="optionScreen" id="SignUp" hidden></input>

      <section>
        <div id="logo">
          <h1>Spotify</h1>
        </div>

        <nav>
          <label for="SignIn">Sign In</label>
          <label for="SignUp">Sign Up</label>
        </nav>

        <form action="" id="SignInFormData">
          <input type="text" id="username" placeholder="Username"></input>
          <input type="password" id="password" placeholder="Password"></input>
          <span>
            <input type="checkbox" id="staySingedIn" checked></input>
            <label for="staySingedIn">stay Signed In</label>
          </span>
          <button type="button" title="Sing In">
            Sing In
          </button>

          <a id="forgotPassword">forgot Password?</a>
        </form>

        <form action="" id="SignUpFormData">
          <input type="text" id="name" placeholder="Name Complete"></input>
          <input type="email" id="email" placeholder="E-mail"></input>
          <input
            type="password"
            id="password"
            placeholder="New Password"
          ></input>
          <span>
            <input type="checkbox" id="staySingedUp"></input>
            <label for="staySingedUp">stay Signed In</label>
          </span>
          <button type="button" title="Sing Up">
            Sing Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginFromNew;
