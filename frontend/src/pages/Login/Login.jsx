import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import profileImg from "../../Images/profile.jpg";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    image: "",
  });

  const changeHandeler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register  = async ()=>{
    console.log("Register function executed", formData)
    try {
      const responce = await axios.post("http://localhost:8000/user/register")
    } catch (error) {
      
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignupContainer">
        <h1>{state}</h1>
        <div className="loginFields">
          {state === "Register" ? (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="profileImage">
                    <img src={profileImg} alt="profileImg" />
                  </label>
                  <input type="file" name="image" id="profileImage" hidden />
                </div>
                <div className="field">
                  <label htmlFor="username">Username:</label>
                  <input onChange={changeHandeler} value={formData.username} type="text" id="username" name="username" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input onChange={changeHandeler} value={formData.email} type="email" id="email" name="email" />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input onChange={changeHandeler} value={formData.password} type="text" id="password" name="password" />
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
                  <input onChange={changeHandeler} value={formData.email} type="email" id="email" name="email" />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input onChange={changeHandeler} value={formData.password} type="text" id="password" name="password" />
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
