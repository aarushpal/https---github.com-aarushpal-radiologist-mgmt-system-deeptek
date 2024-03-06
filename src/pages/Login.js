import React, { useState, useContext } from "react";
import "./Login.css";

import LoginImage from "../static/login-image.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import axiosInstance from "../AxiosInstance";
import { LoginContext } from "../LoginContext";

export const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // const response = await axios.post(
      //   "http://localhost:6060/auth/signin",
      //   values
      // );
      const response = await axiosInstance.post("/auth/signin", values);
      setIsLoggedIn(true);
      toast.success("You are now logged in!");
      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      console.log("Response from backend:", response.data);
      console.log("Token :", response.data.token);

      navigate("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(values);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="heading">
          <p>Login</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="4"
            viewBox="0 0 130 4"
            fill="none"
          >
            <path
              d="M2 2H130"
              stroke="#FF9B26"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="image-content-div">
          <div className="image">
            <img src={LoginImage} alt="" />
          </div>
          <div className="content">
            <p className="form-heading">Login</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                required
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
              {/* <div className="error-msg">
                <b>{errorMsg}</b>
              </div> */}
              <button
                type="submit"
                // onClick={handleSubmission}
                // disabled={submitButtonDisabled}
              >
                Submit
              </button>
            </form>
            <Link to="/register">New User? Register Here</Link>
          </div>
        </div>
      </div>
    </>
  );
};
