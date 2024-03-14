import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import "../Sidebar/Sidebar.css";
import headerImg from "../../Images/3d_colorful_squares-1920x1080.jpg";
import searchIcon from "../../Images/search-icon.webp";
import { Link } from "react-router-dom";

import profileImg from "../../Images/profile.jpg";
import loginImg from "../../Images/login.jpg";
import cartImg from "../../Images/cart.png";
import logoutImg from "../../Images/logout.jpg";
import { ProductContext } from "../../context/ProductContext";
import axios from "axios";

const Header = ({ handleInputChange }) => {
  const { totalCartItems } = useContext(ProductContext);

  const [profileImage, setProfileImage] = useState(profileImg);
  const [user, setUser] = useState(null);

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
          setProfileImage(user.image);
        }
      } catch (error) {
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

  return (
    <div className="header">
      <img src={headerImg} alt="header" />
      <div className="headerContent">
        <h1>COM.com</h1>
        <nav className="navbar">
          <div className="search">
            <div className="searchText">
              <input
                type="text"
                placeholder="Search here..."
                onChange={handleInputChange}
              />
            </div>
            <button>
              <Link to="/search">
                <img src={searchIcon} alt="search" />
              </Link>
            </button>
          </div>
          <ul>
            <li>
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/laptop"
                style={{ color: "black", textDecoration: "none" }}
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                to="/desktop"
                style={{ color: "black", textDecoration: "none" }}
              >
                Desktops
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                style={{ color: "black", textDecoration: "none" }}
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ color: "black", textDecoration: "none" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ color: "black", textDecoration: "none" }}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="sidebar">
            <div className="sidebarContentUp">
              {user && (
                <Link to="/profile">
                  {localStorage.getItem("auth-token") ? (
                    <img src={user.image} alt="profile" id="profileImg" />
                  ) : (
                    <></>
                  )}
                </Link>
              )}
              <Link to="/cart">
                <img src={cartImg} alt="cart" />
              </Link>
              <div className="cartCountNo">{totalCartItems()}</div>
              {localStorage.getItem("auth-token") ? (
                <img
                  src={logoutImg}
                  alt="logout"
                  id="logoutImg"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    window.location.replace("/");
                  }}
                />
              ) : (
                <Link to="/login">
                  <img src={loginImg} alt="logout" id="logoutImg" />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
