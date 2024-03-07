import React, { useState, useEffect } from "react";
import "./EditRadiologistModal.css";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export const EditRadiologistModal = ({ onClose, selectedRadiologist }) => {
  const [radiologist, setRadiologist] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    contactNumber: "",
    type: "",
  });

  useEffect(() => {
    // console.log(radiologist.id);
    if (selectedRadiologist) {
      setRadiologist(selectedRadiologist);
    }
  }, [selectedRadiologist]);

  // const handleChange = (e) => {
  //   setRadiologist({ ...radiologist, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div class="add-radiologist-modal">
      <h2>Update Radiologist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={radiologist.name}
          onChange={(event) =>
            setRadiologist((prev) => ({ ...prev, name: event.target.value }))
          }
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
