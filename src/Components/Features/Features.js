import React, { useState } from "react";
import "./Features.css";
import { AddRadiologistModal } from "../AddRadiologistModal/AddRadiologistModal";

export const Features = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleAddRadiologistModal = () => setAddModalOpen(!isAddModalOpen);
  const toggleEditRadiologistModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteRadiologistModal = () =>
    setDeleteModalOpen(!isDeleteModalOpen);

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

            <div className="main-container">
              <button
                class="button primary edit"
                onClick={toggleEditRadiologistModal}
              >
                Update Radiologist Details
              </button>
            </div>

            <div
              className={`modal-container ${
                isEditModalOpen ? "open-modal" : ""
              }`}
              onClick={toggleEditRadiologistModal}
            ></div>
            <div
              className={`modal-window ${isEditModalOpen ? "open-modal" : ""}`}
            >
              <h2>Update Radiologist Details</h2>
              <p>
                Modal Description: Short paragraph about the content related to
                Modal. You can add UI elements or HTML components.
              </p>
            </div>

            <div className="main-container">
              <button
                class="button primary delete"
                onClick={toggleDeleteRadiologistModal}
              >
                Delete Radiologist
              </button>
            </div>

            <div
              className={`modal-container ${
                isDeleteModalOpen ? "open-modal" : ""
              }`}
              onClick={toggleDeleteRadiologistModal}
            ></div>
            <div
              className={`modal-window ${
                isDeleteModalOpen ? "open-modal" : ""
              }`}
            >
              <h2>Delete Radiologist</h2>
              <p>
                Modal Description: Short paragraph about the content related to
                Modal. You can add UI elements or HTML components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
