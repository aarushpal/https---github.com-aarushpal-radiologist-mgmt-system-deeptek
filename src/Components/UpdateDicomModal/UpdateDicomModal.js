import React, { useEffect, useState } from "react";
import "../UpdateDicomModal/UpdateDicomModal.css";
import axiosInstance from "../../AxiosInstance";
import { toast } from "react-toastify";
// axiosInstance.defaults.withCredentials = true;

const UpdateDicomModal = ({ onClose, selectedRadiologist, dicomID }) => {
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

  //Uploading Dicom
  const UpdateDicomFunc = async () => {
    try {
      //   fetchdata();
      const formData = new FormData();
      formData.append("file", File);
      let response = null;
      // if (ServerDicom == -1)
      // {
      response = await axiosInstance.put(
        `/api/radiologists/update/${dicomID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Dicom Updated Successfully");
      console.log("File upload successful:", response.data);
    } catch (error) {
      console.error("Error updating file:", error);
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
        <div className="update-dicom-heading">
          <p>Update DICOM</p>
        </div>
        <form>
          <input
            className="Select-File-Button"
            type="file"
            name="file"
            onChange={handleFile}
          ></input>

          <div className="update-File-Button">
            <button onClick={UpdateDicomFunc}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDicomModal;
