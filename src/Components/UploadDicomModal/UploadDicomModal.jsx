import React, { useEffect, useState } from "react";
import "../UploadDicomModal/UploadDicomModal.css";
import axiosInstance from "../../AxiosInstance";
import { toast } from "react-toastify";
// axiosInstance.defaults.withCredentials = true;

const UploadDicomModal = ({ onClose, selectedRadiologist }) => {
  const [File, setFile] = useState();
  const [ServerDicom, setServerDicom] = useState(-1);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

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
    // console.log(selectedRadiologist);
  }, [selectedRadiologist]);

  //Checking Dicom Status
  //   useEffect(() => {
  //     const fetchdata = async () => {
  //       const response = await axiosInstance.get(
  //         `/api/radiologists/view/${selectedRadiologist.id}`
  //       );
  //       console.log(response);
  //       if (response.data) {
  //         setServerDicom(response.data[0].dicomId);
  //       }
  //     };
  //     fetchdata();
  //   }, []);

  //   useEffect(() => {
  //     console.log("radiologist:", selectedRadiologist);
  //   }, [selectedRadiologist]);

  //   const fetchdata = async () => {
  //     const response = await axiosInstance.get(
  //       `/api/radiologists/view/${selectedRadiologist.id}`
  //     );
  //     console.log(response);
  //     if (response.data) {
  //       setServerDicom(response.data[0].dicomId);
  //     }
  //   };

  //Uploading Dicom
  const UploadDicomFunc = async () => {
    try {
      //   fetchdata();
      const formData = new FormData();
      formData.append("file", File);
      let response = null;
      // if (ServerDicom == -1)
      // {
      response = await axiosInstance.post(
        `/api/radiologists/upload/${radiologist.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   } else {
      //     response = await axiosInstance.put(
      //       `/api/radiologists/update/${ServerDicom}`,
      //       formData,
      //       {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       }
      //     );
      //   }
      //   props.SetUploadModal(false);
      toast.success("Dicom Uploaded Successfully");
      console.log("File upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainerUpload">
        {/* <div
          className="btn-one-upload-close"
          onClick={() => {
            props.SetUploadModal(false);
          }}
        >
          <span>X</span>
        </div> */}
        {/* <div className="DicomStatusBox">
          {ServerDicom == -1
            ? "No Dicoms Present"
            : `DICOM already present; uploading will update the current file.`}
        </div> */}
        <div className="upload-dicom-heading">
          <p>Upload DICOM</p>
        </div>
        <form>
          <input
            className="Select-File-Button"
            type="file"
            name="file"
            onChange={handleFile}
          ></input>

          <div className="Upload-File-Button">
            <button onClick={UploadDicomFunc}>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDicomModal;
