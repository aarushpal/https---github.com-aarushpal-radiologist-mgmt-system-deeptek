import React, { useState, useEffect } from "react";
import "./EditRadiologistModal.css";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { AddRadiologistValidation } from "../../validation/AddRadiologistValidation";

export const EditRadiologistModal = ({ onClose, selectedRadiologist }) => {
  const [radiologist, setRadiologist] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    contactNumber: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // console.log(radiologist.id);
    if (selectedRadiologist) {
      setRadiologist(selectedRadiologist);
    }
  }, [selectedRadiologist]);

  const handleValidation = (event) => {
    event.preventDefault();
    setErrors(AddRadiologistValidation(radiologist));
  };

  // const handleChange = (e) => {
  //   setRadiologist({ ...radiologist, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation(e);
    if (
      Object.keys(errors).length === 0 &&
      radiologist.name &&
      radiologist.email
    ) {
      try {
        const response = await axiosInstance.put(
          `/api/radiologists/${radiologist.id}`,
          radiologist
        );
        toast.success("Radiologist updated successfully!");
        // console.log("Radiologist added successfully");
        // console.log(response);
        onClose();
      } catch (error) {
        console.error("Error updating radiologist:", error);
        toast.error("Failed to update radiologist. Please try again later.");
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="add-radiologist-modal">
      <h2>Update Radiologist</h2>
      <form onSubmit={handleSubmit}>
        <div className="fields-div">
          <label htmlFor="name">Name</label>
          {errors.name && (
            <p style={{ color: "red", lineHeight: "0%" }}>{errors.name}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={radiologist.name}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <div className="fields-div">
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p style={{ color: "red", lineHeight: "0%" }}>{errors.email}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Email"
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
          placeholder="Username"
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
          {/* {!validContactNumber && (
            <p style={{ color: "red", lineHeight: "0%" }}>
              Please enter a valid phone number.
            </p>
          )} */}
        </div>
        <input
          type="text"
          placeholder="Mobile Number"
          name="contactNumber"
          id="mobile-number-input"
          value={radiologist.contactNumber}
          onChange={(event) =>
            setRadiologist((prev) => ({
              ...prev,
              contactNumber: event.target.value,
            }))
          }
        />
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
            Select Radiologist Type
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
          <button id="submit-button">Save</button>
          <button id="cancel-button" onClick={handleCancel} type="">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
