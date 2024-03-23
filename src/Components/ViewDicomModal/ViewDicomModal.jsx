import React, { useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance";
import DCMImage from "../DCMImage";
import { initialiseCornerstone } from "../initCornerstone";
import { useParams, useNavigate } from "react-router-dom";
import "../ViewDicomModal/ViewDicomModal.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import UpdateDicomModal from "../UpdateDicomModal/UpdateDicomModal";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

function ViewDicomModal() {
  const navigate = useNavigate();
  const [cornerstoneInitialised, setCornerstoneInitialised] = useState(false);
  const [data, setData] = useState([]);
  const [dicomID, setDicomID] = useState(-1);
  const [isUpdateDicomModalOpen, setUpdateDicomModalOpen] = useState(false);

  const [radiologistID, setRadiologistID] = useState(null);
  const toggleUpdateDicomModal = () =>
    setUpdateDicomModalOpen(!isUpdateDicomModalOpen);
  const [selectedUpdateDicomRadiologist, setSelectedUpdateDicomRadiologist] =
    useState(null);

  const { id } = useParams();
  // console.log(id);
  const initialisingCornerStone = async () => {
    initialiseCornerstone().then(() => {
      setCornerstoneInitialised(true);
    });
  };

  function handleDismissButtonClick() {
    const dismissButton = document.querySelector(
      'button[aria-label="Dismiss"]'
    );
    if (dismissButton) {
      dismissButton.click(); // Simulate a click on the button
    }
  }

  // useEffect(() => {
  //   const fetchDicomID = async () => {
  //     try {
  //       initialisingCornerStone();
  //       axiosInstance.get(`/api/radiologists/view/${id}`).then((response) => {
  //         setDicomID(response.data[0].dicomId);
  //         // console.log("DicomID", dicomID);
  //       });
  //     } catch (e) {
  //       console.log("Cannot Get DicomID");
  //     }
  //   };
  //   fetchDicomID();
  // }, []);

  useEffect(() => {
    const handleDismissButtonClick = () => {
      const dismissButton = document.querySelector(
        'button[aria-label="Dismiss"]'
      );
      if (dismissButton) {
        dismissButton.click(); // Simulate a click on the button
      }
    };

    const fetchDicomID = async () => {
      try {
        initialisingCornerStone().then(() => {
          setCornerstoneInitialised(true);
        });
        const response = await axiosInstance.get(
          `/api/radiologists/view/${id}`
        );
        setDicomID(response.data[0].dicomId);
      } catch (error) {
        console.error("Error fetching DICOM ID:", error);
        // Handle error
      }
    };

    // Fetch DICOM ID and add event listener when component mounts
    fetchDicomID();
    window.addEventListener("load", handleDismissButtonClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("load", handleDismissButtonClick);
    };
  }, [id]);

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        if (dicomID !== -1) {
          // handleDismissButtonClick();
          // window.addEventListener("load", handleDismissButtonClick);
          axiosInstance
            .get(`/api/radiologists/viewPatientDetails/${dicomID}`, {
              headers: {
                Accept: "application/json",
              },
            })
            .then((response) => {
              console.log("Data", data);
              setData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              // Display a custom error message on the screen
              toast.error(
                "Error fetching patient details. Please try again later."
              );
            });
        }
      } catch (error) {
        console.error("Error:", error);
        // Display a custom error message on the screen
        toast.error("An unexpected error occurred. Please try again later.");
      }
    };

    fetchdetails();
  }, [dicomID]);

  const handleAfterUpdateDicom = () => {
    toggleUpdateDicomModal();
    setSelectedUpdateDicomRadiologist(null);
  };
  const handleGoBack = () => {
    navigate("/home"); // Go back one step in the history
  };

  const handleDicomUpdate = () => {
    toggleUpdateDicomModal();
  };

  return (
    <>
      <Navbar />
      <div className="modalBackground">
        <div className="modalContainer-DicomView">
          {dicomID === -1 ? (
            <div className="viewdicomerror">
              <div className="back-button">
                <IconButton onClick={handleGoBack} style={{ color: "white" }}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <p>No DICOM Present</p>
            </div>
          ) : (
            <>
              <div className="patient-comments-div">
                <div className="patient-details">
                  <div className="back-button">
                    <IconButton
                      onClick={handleGoBack}
                      style={{ color: "white" }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </div>
                  <div className="patient-detial-title">
                    <b>PATIENT DETAILS</b>
                  </div>
                  <div className="Patient-Detail-Container">
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">Id: </span>
                      <b>{data[0]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">Name: </span>
                      <b>{data[1]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">Sex: </span>
                      <b>{data[5]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">
                        Birth Date:{" "}
                      </span>
                      <b>{data[6]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">Age: </span>
                      <b>{data[4]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">Modality: </span>
                      <b>{data[2]}</b>
                    </div>
                    <div className="Patient-Detail-Entry">
                      <span className="patient-detail-heading">
                        Study Date:{" "}
                      </span>
                      <b>{data[3]}</b>
                    </div>
                  </div>
                </div>

                <div className="update-dicom-button-div">
                  <button onClick={() => handleDicomUpdate(dicomID)}>
                    Update DICOM
                  </button>

                  <div
                    className={`modal-container ${
                      isUpdateDicomModalOpen ? "open-modal" : ""
                    }`}
                    onClick={toggleUpdateDicomModal}
                  ></div>
                  <div
                    className={`modal-window ${
                      isUpdateDicomModalOpen ? "open-modal" : ""
                    }`}
                  >
                    <UpdateDicomModal
                      onClose={handleAfterUpdateDicom}
                      selectedRadiologist={selectedUpdateDicomRadiologist}
                      dicomID={dicomID}
                    />
                  </div>
                </div>
              </div>
              {cornerstoneInitialised && dicomID != -1 && (
                <DCMImage dicomId={dicomID} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewDicomModal;
