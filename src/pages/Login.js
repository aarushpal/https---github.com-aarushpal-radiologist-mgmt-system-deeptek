import React, { useState, useContext } from "react";
import "./Login.css";

import LoginImage from "../static/login-image.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axiosInstance from "../AxiosInstance";
import { LoginContext } from "../LoginContext";
import { LoginValidation } from "../validation/LoginValidation";

export const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleValidation = async (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleValidation(event);
    console.log("Errors", errors);
    if (Object.keys(errors).length === 0 && values.email && values.password) {
      try {
        const response = await axiosInstance.post("/auth/signin", values);
        if (!response.data.token) {
          setPasswordError(true);
          return;
        }
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
    } else {
      console.log("Validation Error: ", errors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="heading">
          <p>Login</p>
        </div>
        <div className="image-content-div">
          <div className="image">
            <img src={LoginImage} alt="" />
          </div>
          <div className="content">
            <form>
              <div className="fields-div">
                <div className="label-div">
                  <label htmlFor="email">Email</label>
                </div>

                {errors.email && (
                  <div className="error-div">
                    <label style={{ color: "red", alignSelf: "center" }}>
                      {errors.email}
                    </label>
                  </div>
                )}
              </div>

              <input
                type="email"
                placeholder="Enter Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />

              <div className="fields-div">
                <div className="label-div">
                  <label htmlFor="password">Password</label>
                </div>
                {passwordError && (
                  <div className="error-div">
                    {" "}
                    <label style={{ color: "red" }}>
                      Enter valid credentials*
                    </label>
                  </div>
                )}
                {errors.password && (
                  <div className="error-div">
                    <label style={{ color: "red" }}>{errors.password}</label>
                  </div>
                )}
              </div>

              <input
                type="password"
                placeholder="Enter Password"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />

              <button
                type="submit"
                onClick={handleSubmit}
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
      <Footer />
    </>
  );
};
