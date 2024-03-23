import React, { useState } from "react";
import "./AddRadiologistModal.css";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { AddRadiologistValidation } from "../../validation/AddRadiologistValidation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const AddRadiologistModal = ({ onClose, loadRadiologists }) => {
  const [radiologist, setRadiologist] = useState({
    name: "",
    email: "",
    username: "",
    contactNumber: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [contactNumber, setContactNumber] = useState("");
  const [validContactNumber, setValidContactNumber] = useState(true);

  const validateContactNumber = (contactNumber) => {
    const contactNumberPattern = /^\+?[1-9]\d{11}$/;

    return contactNumberPattern.test(contactNumber);
  };

  const handleContactNumberChange = (value) => {
    setContactNumber(value);
    setValidContactNumber(validateContactNumber(value));
    console.log(value);
  };

  // const handleChange = (e) => {
  //   setRadiologist({ ...radiologist, [e.target.name]: e.target.value });
  // };
  const handleValidation = (event) => {
    event.preventDefault();
    setErrors(AddRadiologistValidation(radiologist));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation(e);
    validateContactNumber(contactNumber);
    if (
      Object.keys(errors).length === 0 &&
      radiologist.name &&
      radiologist.email
    ) {
      try {
        radiologist.contactNumber = contactNumber;
        const response = await axiosInstance.post(
          "/api/radiologists/",
          radiologist
        );
        toast.success("New radiologist added successfully!");
        // console.log("Radiologist added successfully");
        // console.log(response);
        onClose();
        loadRadiologists(10, 0);
      } catch (error) {
        console.error("Error adding radiologist:", error);
        toast.error("Failed to add new radiologist. Please try again later.");
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="add-radiologist-modal">
      <h2>Add New Radiologist</h2>
      <form>
        <div className="fields-div">
          <label htmlFor="name">Name</label>
          {errors.name && (
            <p style={{ color: "red", lineHeight: "0%" }}>{errors.name}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          //   value={name}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, name: event.target.value }))
          }
          value={radiologist.name}
        />
        <div className="fields-div">
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p style={{ color: "red", lineHeight: "0%" }}>{errors.email}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={radiologist.email}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <div className="fields-div">
          <label htmlFor="username">Username</label>
          {errors.username && (
            <p style={{ color: "red", lineHeight: "0%" }}>{errors.username}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={radiologist.username}
          onChange={(event) =>
            setRadiologist((prev) => ({
              ...prev,
              username: event.target.value,
            }))
          }
        />

        <div className="fields-div">
          <label htmlFor="contact-number">Contact</label>
          {!validContactNumber && (
            <p style={{ color: "red", lineHeight: "0%" }}>
              Please enter a valid phone number.
            </p>
          )}
        </div>

        <PhoneInput
          country={"in"}
          value={contactNumber}
          onChange={handleContactNumberChange}
          inputProps={{
            required: true,
          }}
        />

        {/* {errors.contactNumber && (
          <p style={{ color: "red", lineHeight: "0%" }}>
            {errors.contactNumber}
          </p>
        )} */}

        <div className="fields-div">
          <label htmlFor="radiologist-type">Radiologist Type</label>
        </div>

        <select
          id="radiologistTypeDropdown"
          name="type"
          value={radiologist.type}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, type: event.target.value }))
          }
        >
          <option value="" disabled defaultValue>
            Enter Radiologist Type
          </option>
          <option value="Diagnostic">Diagnostic</option>
          <option value="Interventional">Interventional</option>
          <option value="Nuclear Medicine">Nuclear Medicine</option>
          <option value="Neuroradiologist">Neuroradiologist</option>
          <option value="Pediatric">Pediatric</option>
          <option value="Musculoskeletal">Musculoskeletal</option>
          <option value="Breast Imaging">Breast Imaging</option>
          <option value="Cardiothoracic">Cardiothoracic</option>
          <option value="Abdominal">Abdominal</option>
          <option value="Emergency">Emergency</option>
        </select>
        <div className="submit-cancel-buttons">
          <button id="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button id="cancel-button" onClick={handleCancel} type="">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
