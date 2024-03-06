import React, { useState } from "react";
import "./AddRadiologistModal.css";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export const AddRadiologistModal = ({ onClose }) => {
  const [radiologist, setRadiologist] = useState({
    name: "",
    email: "",
    username: "",
    contactNumber: "",
    type: "",
  });

  // const handleChange = (e) => {
  //   setRadiologist({ ...radiologist, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/radiologists/",
        radiologist
      );
      toast.success("New radiologist added successfully!");
      // console.log("Radiologist added successfully");
      // console.log(response);
      onClose();
    } catch (error) {
      console.error("Error adding radiologist:", error);
      toast.error("Failed to add new radiologist. Please try again later.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div class="add-radiologist-modal">
      <h2>Add New Radiologist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          //   value={name}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, name: event.target.value }))
          }
          value={radiologist.name}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={radiologist.email}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, email: event.target.value }))
          }
        />
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

        <select
          id="radiologistTypeDropdown"
          name="type"
          value={radiologist.type}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, type: event.target.value }))
          }
        >
          <option value="" disabled selected>
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

        <button>Submit</button>
        <button onClick={handleCancel} type="">
          Cancel
        </button>
      </form>
    </div>
  );
};
