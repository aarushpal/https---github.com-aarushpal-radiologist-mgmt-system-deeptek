import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import { toast } from "react-toastify";

const Navbar = () => {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // const [login, setLogin] = useState(false);
  // useEffect(() => {
  //   setLogin(isLoggedIn());
  // }, [login]);

  // const logout = () => {
  //   doLogout(() => {
  //     setLogin(false);
  //     navigate("/");
  //   });
  // };

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

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <p>
          DEEP<span className="tek">TEK</span>
        </p>
      </div>
      {/* <div className="navbar-left-content"></div>
        </div> */}
      <div className="navbar-mid">
        <div className="home-div">
          <a href="#home">Home</a>
        </div>
        <div className="about-div">
          <a href="#About">About</a>
        </div>
        <div className="contact-div">
          <a href="#Contact Us">Contact Us</a>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn && (
          <div className="login">
            <button class="login-button" onClick={doLogout}>
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
