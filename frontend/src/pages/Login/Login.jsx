import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [state, setState] = useState("Login");

  return (
    <div className="loginsignup">
      <div className="loginsignupContainer">
        <h1>{state}</h1>
        <div className="loginFields">
          {state === "Register" ? (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className="field">
                  <label htmlFor="mobile">Mobile:</label>
                  <input type="text" id="mobile" name="mobile" />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input type="text" id="password" name="password" />
                </div>
              </div>
              <div className="btnField">
                <button id="loginMainBtn">Register</button>
                <p>Allready have an account?</p>
                <button
                  onClick={() => {
                    setState("Login");
                  }}
                >
                  Login here
                </button>
              </div>
            </div>
          ) : (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input type="text" id="password" name="password" />
                </div>
              </div>
              <div className="btnField">
                <Link to="/">
                  <button id="loginMainBtn">Login</button>
                </Link>

                <p>Create an account</p>
                <button
                  onClick={() => {
                    setState("Register");
                  }}
                >
                  Register here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
