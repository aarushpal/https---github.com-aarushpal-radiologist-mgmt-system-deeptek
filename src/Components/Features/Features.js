import React, { useState } from "react";
import "./Features.css";
import { AddRadiologistModal } from "../AddRadiologistModal/AddRadiologistModal";

export const Features = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddRadiologistModal = () => setAddModalOpen(!isAddModalOpen);

  return (
    <div
      className="features-container
  "
    >
      <div className="features-inner-container">
        <div className="admin-action-div">
          <div className="admin-action-div-heading">
            <p>Admin actions</p>
          </div>

          <div className="admin-action-div-buttons">
            <div class="main-container">
              <button
                class="button primary new"
                onClick={toggleAddRadiologistModal}
              >
                Add Radiologist
              </button>
            </div>

            <div
              className={`modal-container ${
                isAddModalOpen ? "open-modal" : ""
              }`}
              onClick={toggleAddRadiologistModal}
            ></div>
            <div
              className={`modal-window ${isAddModalOpen ? "open-modal" : ""}`}
            >
              <AddRadiologistModal onClose={toggleAddRadiologistModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
