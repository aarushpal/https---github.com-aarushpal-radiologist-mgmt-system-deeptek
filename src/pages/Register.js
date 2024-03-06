import "./Register.css";
import React, { useState } from "react";
import axios from "axios";

import RegisterImage from "../static/login-image.png";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";

export const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
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
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="heading">
          <p>Register</p>
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
            <img src={RegisterImage} alt="" />
          </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                required
                id="Name"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <input
                type="email"
                placeholder="Enter Email"
                required
                id="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
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

              <select
                id="role"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, role: event.target.value }))
                }
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button
                type="submit"
                // onClick={handleSubmission}
                // disabled={submitButtonDisabled}
              >
                Submit
              </button>
            </form>

            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
    </>
  );
};
