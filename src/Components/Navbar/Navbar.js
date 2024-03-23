import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import Logo from "./static/logo.png";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import { toast } from "react-toastify";

const Navbar = () => {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const doLogout = () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("You have been logged out successfully!");

      navigate("/login");
    } catch (error) {
      console.log("Error logging out :", error);
    }
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
      toast.info("Please login first");
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img
          src={Logo}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      {/* <div className="navbar-left-content"></div>
        </div> */}
      <div className="navbar-mid">
        <div className="home-div">
          <a href="#" onClick={handleHomeClick}>
            Home
          </a>
        </div>
        <div className="about-div">
          <a href="#" onClick={handleAboutClick}>
            About
          </a>
        </div>
        <div className="contact-div">
          <a href="#" onClick={handleContactClick}>
            Contact Us
          </a>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn && (
          <div className="login">
            <button className="login-button" onClick={doLogout}>
              Logout
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <>
            <div className="login">
              <button class="login-button" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
            <div className="login">
              <button
                class="login-button"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
