import axios from "axios";
import "./Profile.css";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { totalPrice, totalCartItems } = useContext(ProductContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          const decodedToken = parseJwt(authToken);
          const userId = decodedToken.user.id;

          const response = await axios.get(
            `http://localhost:8000/user/${userId}`,
            {
              headers: {
                "auth-token": authToken,
              },
            }
          );
          setUser(response.data);
        }
      } catch (error){
        console.log("Error fetching user profile:", error);

      }
    };
    fetchUser();
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  const deleteHandle = () => {
    
    axios
      .delete(`http://localhost:8000/user/${user._id}`)
      .then(() => {
        enqueueSnackbar("User Deleted", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar("Error while deleting user", { variant: "error" })});

  };

  return (
    <div className="profile">
      {user && (
        <>
          <div className="profileContainer">
            <div className="profileImg">
              <img src={user.image} alt="profileImage" />
            </div>
            <div className="profileInfo">
              <table>
                <tr>
                  <th>Username</th>
                  <td>{user.username} </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{user.address} </td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{user.mobile} </td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td>{user.password} </td>
                </tr>
                <tr>
                  <th>Cart Items</th>
                  <td>{totalCartItems()} items </td>
                </tr>
                <tr>
                  <th>Total Amount</th>
                  <td>$ {totalPrice()} </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="operationProfile">
            <Link to={`/editprofile/${user._id}`}>
              <button>Edit Profile</button>
            </Link>
            <button onClick={() => deleteHandle()}>Delete Profile</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
