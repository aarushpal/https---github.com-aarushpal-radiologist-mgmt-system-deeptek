import "./Register.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SignupValidation } from "../validation/SignupValidation";
import RegisterImage from "../static/login-image.png";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

export const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({});
  // const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  // const handleInput = (event) => {
  //   const newObj = { ...values, [event.target.name]: event.target.value };
  //   setValues(newObj);
  // };

  const handleValidation = (event) => {
    event.preventDefault();
    setErrors(SignupValidation(values));
  };

  // useEffect(() => {
  //   setErrors(SignupValidation(values));
  // }, [values]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleValidation(event);
    if (
      Object.keys(errors).length === 0 &&
      values.email &&
      values.password &&
      values.name
    ) {
      try {
        console.log("Errors", errors);
        const response = await axios.post(
          "http://localhost:6060/auth/signup",
          values
        );

        console.log("Response from backend:", response.data);

        navigate("/login");
      } catch (error) {
        console.error("Error submitting form:", error);
        console.log(values);
      }
    } else {
      console.log(errors, values);
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="heading">
          <p>Sign Up</p>
        </div>
        <div className="image-content-div">
          <div className="image">
            <img src={RegisterImage} alt="" />
          </div>
          <div className="content">
            <form>
              <div className="fields-div name-fields-div">
                <div className="label-div">
                  <label htmlFor="name">Name</label>
                </div>

                {errors.name && (
                  <div className="error-div">
                    <label style={{ color: "red" }}>{errors.name}</label>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter Name"
                id="Name"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
              />

              <div className="fields-div">
                <div className="label-div">
                  <label htmlFor="email">Email</label>
                </div>

                {errors.email && (
                  <div className="error-div">
                    <label style={{ color: "red", lineHeight: "0%" }}>
                      {errors.email}
                    </label>
                  </div>
                )}
              </div>
              <input
                type="email"
                placeholder="Enter Email"
                id="Email"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />

              <div className="fields-div">
                <div className="label-div">
                  <label htmlFor="password">Password</label>
                </div>

                {errors.password && (
                  <div className="error-div">
                    <label style={{ color: "red", lineHeight: "80%" }}>
                      {errors.password}
                    </label>
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
                // disabled={submitButtonDisabled}
                // disabled={submitButtonDisabled}
              >
                Submit
              </button>
            </form>

            <Link to="/login" style={{ marginBottom: "20px" }}>
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
