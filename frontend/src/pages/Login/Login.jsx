import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./Login.css";
import profileImg from "../../Images/profile.jpg";
import loginAudio from "../../Images/Audio/login.wav";
import errorAudio from "../../Images/Audio/error.wav";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState("Login");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    image: null,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    new Audio(loginAudio).play();

    try {
      let user = { ...formData };

      // Upload image
      if (image) {
        const formDataUpload = new FormData();
        formDataUpload.append("user", image);

        const uploadResponse = await fetch(
          "http://localhost:8000/user/upload",
          {
            method: "POST",
            body: formDataUpload,
          }
        );

        if (!uploadResponse.ok) {
          console.error("Failed to upload image:", await uploadResponse.text());
          enqueueSnackbar("Failed to upload image", { variant: "error" });
          return;
        }

        const responseData = await uploadResponse.json();
        user.image = responseData.image_url;
      }

      // Register user
      const registerResponse = await fetch(
        "http://localhost:8000/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const addUserData = await registerResponse.json();

      if (registerResponse.ok) {
        window.location.replace("/login");
        new Audio(loginAudio).play();
        enqueueSnackbar("User registered successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to register user", { variant: "error" });
        // Handle failure, show error message or log details
      }
    } catch (error) {
      new Audio(errorAudio).play();
      console.error("An error occurred:", error);
      enqueueSnackbar(
        "An error occurred. Please check the console for details.",
        { variant: "error" }
      );
    }
  };

  const login = async () => {
    new Audio(loginAudio).play();
    console.log("Login Function executed", formData);

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        new Audio(errorAudio).play();
        console.log("Failed to login:", await response.text());
        enqueueSnackbar("Failed to login", { variant: "error" });
        return;
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        enqueueSnackbar("Loggin Successfull", { variant: "success" });
        window.location.replace("/");
        new Audio(loginAudio).play();
      } else {
        new Audio(errorAudio).play();
        console.log(responseData.error);
      }
    } catch (error) {
      new Audio(errorAudio).play();
      console.error("Error during login:", error);
    }
  };

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
                    <img
                      src={image ? URL.createObjectURL(image) : profileImg}
                      alt="profileImg"
                    />
                  </label>
                  <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="profileImage"
                    hidden
                  />
                </div>
                <div className="field">
                  <label htmlFor="username">Username:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.username}
                    type="text"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.email}
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.password}
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="btnField">
                <button id="loginMainBtn" onClick={register}>
                  Register
                </button>
                <p>Already have an account?</p>
                <button onClick={() => setState("Login")}>Login here</button>
              </div>
            </div>
          ) : (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.email}
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.password}
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="btnField">
                <button id="loginMainBtn" onClick={login}>
                  Login
                </button>
                <p>Create an account</p>
                <button
                  onClick={() => {
                    new Audio(loginAudio).play();
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
