import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import "./EditProfile.css";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setMobile(res.data.mobile);
        setPassword(res.data.password);
      })
      .catch((error) => {
        enqueueSnackbar("An error has occured!", { variant: "error" });
        console.log("Error fetching user profile:", error);
      });
  }, []);

  const updateHandle = () => {
    const updateData = {
      username,
      email,
      address,
      mobile,
      password,
    };
    axios
      .put(`http://localhost:8000/user/${id}`, updateData)
      .then(() => {
        enqueueSnackbar("Profile Updated!", { variant: "success" });
        console.log("Profile updated");
        navigate("/profile");
      })
      .catch((error) => {
        enqueueSnackbar("An error has occured!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="editProfile">
      <h2>Update Your Profile</h2>
      <div className="profileInfo editProfileInfo">
        <table>
          <tr>
            <th>Username</th>
            <td>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Mobile</th>
            <td>
              <input
                type="number"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Password</th>
            <td>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="operationProfile">
        <button onClick={updateHandle}>Update Profile</button>
        <button onClick={() => navigate("/profile")}>Go back</button>
      </div>
    </div>
  );
};

export default EditProfile;
