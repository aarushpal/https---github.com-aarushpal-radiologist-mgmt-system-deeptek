import React, { useContext, useEffect } from "react";
import "./Home.css";
import {
  faSortUp,
  faSortDown,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Features } from "../Components/Features/Features";
import Navbar from "../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { LoginContext } from "../LoginContext";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditRadiologistModal } from "../Components/EditRadiologistModal/EditRadiologistModal";

export default function Home({ ...props }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [sortColumn, setSortColumn] = useState("id");
  // const [sortDirection, setSortDirection] = useState("asc");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const toggleEditRadiologistModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteRadiologistModal = () =>
    setDeleteModalOpen(!isDeleteModalOpen);

  const { isLoggedIn } = useContext(LoginContext);
  const [selectedEditRadiologist, setSelectedEditRadiologist] = useState(null);
  const [selectedDeleteRadiologist, setSelectedDeleteRadiologist] =
    useState(null);

  const [radiologists, setRadiologists] = useState([]);
  const [radiologistContent, setRadiologistContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      loadRadiologists(5, 0);
    }
  }, [isLoggedIn]);

  const loadRadiologists = async (pageSize, pageNumber) => {
    try {
      const response = await axiosInstance.get(
        `/api/radiologists/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortConfig.key}&sortDir=${sortConfig.direction}`
        // {
        //   params: {
        //     sortBy: sortConfig.key,
        //     sortDir: sortConfig.direction,
        //   },
        // }
      );
      console.log("response data: ", response);

      setRadiologists(response.data.content);
    } catch (error) {
      console.error("Error fetching radiologists:", error);
    }
  };

  const handleSort = (key, direction) => {
    // let direction = "asc";
    // if (sortConfig.key === key && sortConfig.direction === "asc") {
    //   direction = "desc";
    // }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig.key !== null && sortConfig.direction !== "") {
      loadRadiologists(5, 0);
    }
  }, [sortConfig]);

  const changePage = async (pageNumber) => {
    try {
      if (
        pageNumber >= radiologistContent.pageNumber &&
        radiologistContent.lastPage
      ) {
        return;
      }
      if (
        pageNumber < radiologistContent.pageNumber &&
        radiologistContent.pageNumber == 0
      ) {
        return;
      }

      const response = await axiosInstance.get(
        `/api/radiologists/?pageSize=${radiologistContent.pageSize}&pageNumber=${pageNumber}&sortBy=${sortConfig.key}&sortDir=${sortConfig.direction}`
      );

      setRadiologistContent({
        content: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        pageSize: response.data.pageSize,
        lastPage: response.data.lastPage,
        pageNumber: pageNumber,
      });
      setRadiologists(response.data.content);
    } catch (error) {
      console.error("Error fetching radiologists:", error);
      toast.error("Error in loading radiologists");
    }
  };

  const handleEditRadiologist = (radiologist) => {
    toggleEditRadiologistModal();
    setSelectedEditRadiologist(radiologist);
  };

  const handleBeforeDelete = (radiologist) => {
    toggleDeleteRadiologistModal();
    setSelectedDeleteRadiologist(radiologist);
  };

  const handleDeleteRadiologist = async (radiologist) => {
    toggleDeleteRadiologistModal();
    setSelectedDeleteRadiologist(radiologist);
    console.log(selectedDeleteRadiologist);
    try {
      const response = await axiosInstance.delete(
        `/api/radiologists/${selectedDeleteRadiologist.id}`
      );
      // loadRadiologists(5, 0);
      handleAfterDeleteRadiologist();
      toast.success("Radiologist deleted successfully!");
    } catch (error) {
      console.error("Error deleting radiologist:", error);
      toast.error("Failed to delete radiologist. Please try again later.");
    }
  };

  const handleAfterEditRadiologist = () => {
    toggleEditRadiologistModal();
    setSelectedEditRadiologist(null);
    loadRadiologists(
      radiologistContent.pageSize,
      radiologistContent.pageNumber
    );
  };

  const handleAfterDeleteRadiologist = () => {
    toggleDeleteRadiologistModal();
    setSelectedDeleteRadiologist(null);
    loadRadiologists(
      radiologistContent.pageSize,
      radiologistContent.pageNumber
    );
  };

  return isLoggedIn ? (
    <>
      <Navbar />
      <Features />
      <div className="home-container">
        <table>
          <thead>
            <tr className="table-headers">
              <th>
                ID{" "}
                <button onClick={() => handleSort("id", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("id", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>

              <th>
                Name
                <button onClick={() => handleSort("name", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("name", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>
              <th>
                Username
                <button onClick={() => handleSort("username", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("username", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>
              <th>
                Email
                <button onClick={() => handleSort("email", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("email", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>
              <th>
                Contact
                <button onClick={() => handleSort("contactNumber", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("contactNumber", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>
              <th>
                Type
                <button onClick={() => handleSort("type", "asc")}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  className="button-padding"
                  onClick={() => handleSort("type", "desc")}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </th>
              <th>DICOM Actions</th>
              <th>Radiologist Actions</th>
            </tr>
          </thead>
          <tbody>
            {radiologists.map((radiologist, index) => (
              <tr key={radiologist.id}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>{radiologist.id}</td>
                <td>{radiologist.name}</td>
                <td>{radiologist.username}</td>
                <td>{radiologist.email}</td>
                <td>{radiologist.contactNumber}</td>
                <td>{radiologist.type}</td>
                <td className="actions-buttons">
                  <button className="button primary new btn-sm">Add</button>
                  <button className="button primary edit btn-sm">Edit</button>
                  <button className="button primary delete btn-sm">
                    Delete
                  </button>
                </td>
                <td className="actions-buttons">
                  {/* <div className="main-container"> */}
                  <button
                    class="button primary edit btn-sm"
                    onClick={() => handleEditRadiologist(radiologist)}
                  ></button>
                  {/* </div> */}

                  <div
                    className={`modal-container ${
                      isEditModalOpen ? "open-modal" : ""
                    }`}
                    onClick={toggleEditRadiologistModal}
                  ></div>
                  <div
                    className={`modal-window ${
                      isEditModalOpen ? "open-modal" : ""
                    }`}
                  >
                    <EditRadiologistModal
                      onClose={handleAfterEditRadiologist}
                      selectedRadiologist={selectedEditRadiologist}
                    />
                  </div>

                  {/* <div className="main-container"> */}
                  <button
                    class="button primary delete btn-sm"
                    onClick={() => handleBeforeDelete(radiologist)}
                  ></button>
                  {/* </div> */}

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
                    <h4>Are you sure?</h4>
                    <p>Note: This action cannot be undone</p>
                    <button
                      onClick={() =>
                        handleDeleteRadiologist(selectedDeleteRadiologist)
                      }
                    >
                      Yes
                    </button>
                    <button onClick={() => toggleDeleteRadiologistModal()}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="pagination-container"> */}
      <Container className="center">
        <Pagination size="md">
          <PaginationItem
            onClick={() => changePage(radiologistContent.pageNumber - 1)}
            disabled={radiologistContent.pageNumber == 0}
          >
            <PaginationLink previous>Previous</PaginationLink>
          </PaginationItem>

          {[...Array(radiologistContent.totalPages)].map((_, index) => (
            <PaginationItem
              onClick={() => changePage(index)}
              active={index === radiologistContent.pageNumber}
              key={index}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            onClick={() => changePage(radiologistContent.pageNumber + 1)}
            disabled={radiologistContent.lastPage}
          >
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
      {/* </div> */}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
