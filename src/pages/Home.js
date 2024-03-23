import React, { useContext, useEffect } from "react";
import "./Home.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Tooltip from "@mui/material/Tooltip";

import { Features } from "../Components/Features/Features";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Navigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { LoginContext } from "../LoginContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import IconButton from "@mui/material/IconButton";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditRadiologistModal } from "../Components/EditRadiologistModal/EditRadiologistModal";
import UploadDicomModal from "../Components/UploadDicomModal/UploadDicomModal";
import ViewDicomModal from "../Components/ViewDicomModal/ViewDicomModal";
import { Link } from "react-router-dom";

export default function Home({ ...props }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUploadDicomModalOpen, setUploadDicomModalOpen] = useState(false);
  const [isViewDicomModalOpen, setViewDicomModalOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [dicomID, setDicomID] = useState(-1);

  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });
  // const [keyword, setKeyword] = useState("");
  const [searchValues, setSearchValues] = useState({
    name: "",
    email: "",
    type: "",
    contactNumber: "",
    username: "",
  });

  const toggleEditRadiologistModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteRadiologistModal = () =>
    setDeleteModalOpen(!isDeleteModalOpen);
  const toggleUploadDicomModal = () =>
    setUploadDicomModalOpen(!isUploadDicomModalOpen);
  const toggleViewDicomModal = () =>
    setViewDicomModalOpen(!isViewDicomModalOpen);

  const { isLoggedIn } = useContext(LoginContext);
  const [selectedEditRadiologist, setSelectedEditRadiologist] = useState(null);
  const [selectedDeleteRadiologist, setSelectedDeleteRadiologist] =
    useState(null);
  const [selectedUploadDicomRadiologist, setSelectedUploadDicomRadiologist] =
    useState(null);
  const [selectedViewDicomRadiologistID, setSelectedViewDicomRadiologistID] =
    useState("");
  const [dicomUploaded, setDicomUploaded] = useState(false);

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
      loadRadiologists(entriesPerPage, 0);
    }
  }, [isLoggedIn]);

  const loadRadiologists = async (pageSize, pageNumber) => {
    try {
      const response = await axiosInstance.get(
        `/api/radiologists/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortConfig.key}&sortDir=${sortConfig.direction}`
      );

      setRadiologists(response.data.content);
      setDataLoaded(true);
      setRadiologistContent({
        content: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        pageSize: response.data.pageSize,
        lastPage: response.data.lastPage,
        pageNumber: pageNumber,
      });
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

  const getSortIconStyle = (key, direction) => {
    if (sortConfig.key === key && sortConfig.direction === direction) {
      return { ...iconStyle, backgroundColor: "lightblue" }; // Apply your highlighted style here
    }
    return iconStyle;
  };

  useEffect(() => {
    if (sortConfig.key !== null && sortConfig.direction !== "") {
      loadRadiologists(entriesPerPage, 0);
    }
  }, [sortConfig]);

  useEffect(() => {
    loadRadiologists(entriesPerPage, 0);
  }, [entriesPerPage]);

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
        `/api/radiologists/?pageSize=${entriesPerPage}&pageNumber=${pageNumber}&sortBy=${sortConfig.key}&sortDir=${sortConfig.direction}`
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

  const handleDicomUpload = (radiologist) => {
    toggleUploadDicomModal();
    setSelectedUploadDicomRadiologist(radiologist);
  };

  const handleDicomView = (radiologist) => {
    toggleViewDicomModal();
    setSelectedViewDicomRadiologistID(radiologist.id);
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

  const handleAfterUploadDicom = () => {
    toggleUploadDicomModal();
    setSelectedUploadDicomRadiologist(null);
  };

  const handleAfterViewDicom = () => {
    toggleViewDicomModal();
    setSelectedViewDicomRadiologistID("");
  };

  const handleSearch = async () => {
    console.log(searchValues);
    try {
      const response = await axiosInstance.get(
        `/api/radiologists/search?name=${searchValues.name}&type=${searchValues.type}&email=${searchValues.email}&username=${searchValues.username}&contactNumber=${searchValues.contactNumber}&type=${searchValues.type}`
      );

      console.log(response);
      setRadiologists(response.data.content);
    } catch (error) {
      console.error("Error searching radiologists:", error);
      toast.error("Error in searching radiologists");
    }
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
  };

  const iconStyle = {
    padding: "0",
    paddingLeft: "0",
    paddingRight: "0",
    paddingTop: "0",
    paddingBottom: "0",
    color: "black",
    margin: "0",
    marginLeft: "0",
    marginRight: "0",
    marginTop: "0",
    marginBottom: "0",
    borderLeft: "0",
    borderRight: "0",
    borderTop: "0",
    borderBottom: "0",
  };

  const EditIconStyle = {
    // padding: "0",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",

    color: "white",
    // margin: "0",
    background: "#0077b6",
    borderRadius: "5px",
  };

  const DeleteIconStyle = {
    // padding: "0",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "white",
    // margin: "0",
    background: "#f7412c",
    borderRadius: "5px",
  };

  const ViewIconStyle = {
    // padding: "0",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "white",
    // margin: "0",
    background: "#0077b6",
    borderRadius: "5px",
  };

  const AddIconStyle = {
    // padding: "0",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "white",
    // margin: "0",
    background: "#2ecc71",
    borderRadius: "5px",
  };

  return isLoggedIn ? (
    <>
      <Navbar />
      <Features
        handleSearch={handleSearch}
        setSearchValues={setSearchValues}
        searchValues={searchValues}
        loadRadiologists={loadRadiologists}
      />
      <div className="home-container">
        <div className="table-container">
          <table>
            <thead>
              <tr className="table-headers">
                <th>
                  <div className="sort-div">
                    <div className="sort-heading">ID </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          onClick={() => handleSort("id", "asc")}
                          style={getSortIconStyle("id", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("id", "desc")}
                          style={getSortIconStyle("id", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>

                <th>
                  <div className="sort-div">
                    <div className="sort-heading">Name </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          size="small"
                          onClick={() => handleSort("name", "asc")}
                          style={getSortIconStyle("name", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("name", "desc")}
                          style={getSortIconStyle("name", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="sort-div">
                    <div className="sort-heading">Username </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          onClick={() => handleSort("username", "asc")}
                          style={getSortIconStyle("username", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("username", "desc")}
                          style={getSortIconStyle("username", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="sort-div">
                    <div className="sort-heading">Email </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          onClick={() => handleSort("email", "asc")}
                          style={getSortIconStyle("email", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("email", "desc")}
                          style={getSortIconStyle("email", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="sort-div">
                    <div className="sort-heading">Contact </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          onClick={() => handleSort("contactNumber", "asc")}
                          style={getSortIconStyle("contactNumber", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("contactNumber", "desc")}
                          style={getSortIconStyle("contactNumber", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="sort-div">
                    <div className="sort-heading">Type </div>

                    <div className="sort-buttons">
                      <div className="up-button">
                        <IconButton
                          onClick={() => handleSort("type", "asc")}
                          style={getSortIconStyle("type", "asc")}
                        >
                          <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="down-button">
                        <IconButton
                          onClick={() => handleSort("type", "desc")}
                          style={getSortIconStyle("type", "desc")}
                        >
                          <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </th>
                <th>DICOM Actions</th>
                <th>Radiologist Actions</th>
              </tr>
            </thead>
            <tbody>
              {radiologists.map((radiologist, index) => (
                <tr key={radiologist.id}>
                  <td>{radiologist.id}</td>
                  <td>{radiologist.name}</td>
                  <td>{radiologist.username}</td>
                  <td>{radiologist.email}</td>
                  <td>{radiologist.contactNumber}</td>
                  <td>{radiologist.type}</td>
                  <td>
                    <div className="actions-buttons">
                      <div className="">
                        <Tooltip title="View DICOM">
                          <IconButton
                            component={Link}
                            to={`/viewdicom/${radiologist.id}`}
                            style={ViewIconStyle}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="">
                        {/* <button
                          className="button primary new btn-sm"
                          onClick={() => handleDicomUpload(radiologist)}
                        >
                          Add
                        </button> */}
                        <Tooltip title="Add DICOM File">
                          <IconButton
                            onClick={() => handleDicomUpload(radiologist)}
                            style={AddIconStyle}
                          >
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                        <div
                          className={`modal-container ${
                            isUploadDicomModalOpen ? "open-modal" : ""
                          }`}
                          onClick={toggleUploadDicomModal}
                        ></div>
                        <div
                          className={`modal-window ${
                            isUploadDicomModalOpen ? "open-modal" : ""
                          }`}
                        >
                          <UploadDicomModal
                            onClose={handleAfterUploadDicom}
                            selectedRadiologist={selectedUploadDicomRadiologist}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="actions-buttons">
                      <div>
                        {/* <button
                        className="button primary edit btn-sm"
                        onClick={() => handleEditRadiologist(radiologist)}
                      ></button> */}
                        <Tooltip title="Update Radiologist">
                          <IconButton
                            onClick={() => handleEditRadiologist(radiologist)}
                            style={EditIconStyle}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
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
                      </div>
                      <div className="">
                        {/* <button
                        className="button primary delete btn-sm"
                        onClick={() => handleBeforeDelete(radiologist)}
                      ></button> */}
                        <Tooltip title="Delete Radiologist">
                          <IconButton
                            onClick={() => handleBeforeDelete(radiologist)}
                            style={DeleteIconStyle}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
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
                          <div className="delete-modal-window">
                            <h2>Delete Radiologist</h2>
                            <h2>Are you sure?</h2>
                            <p>*Note: This action cannot be undone</p>
                            <div className="yes-cancel-buttons">
                              <div className="yes-button">
                                <button
                                  onClick={() =>
                                    handleDeleteRadiologist(
                                      selectedDeleteRadiologist
                                    )
                                  }
                                  id="delete-modal-yes-button"
                                >
                                  Yes
                                </button>
                              </div>
                              <div className="cancel-button">
                                <button
                                  onClick={() => toggleDeleteRadiologistModal()}
                                  id="delete-modal-cancel-button"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDataLoaded && (
        <div className="center">
          <div className="entries-per-page">
            <div className="entries-per-page-heading">
              <p>Entries per page : </p>
            </div>

            <div className="entries-per-page-dropdown">
              <select
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="pagination-div">
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
          </div>
        </div>
      )}

      {/* </div> */}
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
