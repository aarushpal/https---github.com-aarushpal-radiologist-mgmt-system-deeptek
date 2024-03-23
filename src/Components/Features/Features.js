import React, { useState } from "react";
import "./Features.css";
import { AddRadiologistModal } from "../AddRadiologistModal/AddRadiologistModal";

export const Features = ({
  handleSearch,
  setSearchValues,
  searchValues,
  loadRadiologists,
}) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  // const [searchBy, setSearchBy] = useState("name");
  // const [keyword, setKeyword] = useState("");

  const toggleAddRadiologistModal = () => setAddModalOpen(!isAddModalOpen);
  const handleSearchInFeatures = async (event) => {
    event.preventDefault(); // Prevent form submission
    // Call the handleSearch function passed from the parent component
    handleSearch();
  };

  const handleClear = () => {
    // Clear the search values
    setSearchValues({
      name: "",
      email: "",
      type: "",
      contactNumber: "",
      username: "",
    });
    // Trigger search to reload all radiologists data
    handleSearch();
  };

  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   type: "",
  //   contactNumber: "",
  //   username: "",
  // });

  // const handleSearch = async (event) => {
  //   event.preventDefault();

  //     try {
  //       const response = await axiosInstance.get("/auth/signin", values);

  //       navigate("/home");
  //     } catch (error) {
  //       console.error("Error submitting form:", error);

  //     }

  //   }
  // };

  return (
    <div
      className="features-container
  "
    >
      <div className="features-inner-container">
        <div className="filter-div">
          <form>
            <div className="name-filter-div filter-items">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Search by Name"
                onChange={(event) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
              />
            </div>
            <div className="username-filter-div filter-items">
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="Search by Username"
                onChange={(event) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
              />
            </div>
            <div className="email-filter-div filter-items">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Search by Email"
                onChange={(event) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="contactNumber-filter-div filter-items">
              <label htmlFor="">Contact</label>
              <input
                type="text"
                placeholder="Search by Contact"
                onChange={(event) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    contactNumber: event.target.value,
                  }))
                }
              />
            </div>
            <div className="type-filter-div filter-items">
              <label htmlFor="">Type</label>
              <input
                type="text"
                placeholder="Search by Type"
                onChange={(event) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    type: event.target.value,
                  }))
                }
              />
            </div>
            <button id="search-button" onClick={handleSearchInFeatures}>
              Search
            </button>
            <button id="clear-button" onClick={handleClear}>
              Clear
            </button>
          </form>
        </div>

        <div className="admin-action-div">
          {/* <div className="admin-action-div-heading">
            <p>Admin actions</p>
          </div> */}

          <div className="admin-action-div-buttons">
            <div className="main-container">
              <button
                className="button primary new"
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
              <AddRadiologistModal
                onClose={toggleAddRadiologistModal}
                loadRadiologists={loadRadiologists}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
