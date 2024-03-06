import React, { useContext, useEffect } from "react";
import "./Home.css";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Features } from "../Components/Features/Features";
import Navbar from "../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { LoginContext } from "../LoginContext";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home({ ...props }) {
  const { isLoggedIn } = useContext(LoginContext);

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
        `/api/radiologists/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      console.log("response data: ", response);

      setRadiologists(response.data.content);
    } catch (error) {
      console.error("Error fetching radiologists:", error);
    }
  };

  // const changePage = (pageSize = 10, pageNumber = 0) => {
  //   // loadRadiologists((pageSize, pageNumber))
  //   //   .then((data) => {
  //   //     setRadiologistContent(data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //     toast.error("Error in loading radiologists");
  //   //   });
  //   if (
  //     pageNumber > radiologistContent.pageNumber &&
  //     radiologistContent.lastPage
  //   ) {
  //     return;
  //   }
  //   if (
  //     pageNumber < radiologistContent.pageNumber &&
  //     radiologistContent.pageNumber == 0
  //   ) {
  //     return;
  //   }

  //   loadRadiologists(pageSize, pageNumber)
  //     .then((data) => {
  //       setRadiologistContent({
  //         content: [...radiologistContent.content, ...data.content],
  //         totalPages: data.totalPages,
  //         totalElements: data.totalElements,
  //         pageSize: data.pageSize,
  //         lastPage: data.lastPage,
  //         pageNumber: data.pageNumber,
  //       });

  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       toast.error("Error in loading posts");
  //     });
  // };

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
        `/api/radiologists/?pageSize=${radiologistContent.pageSize}&pageNumber=${pageNumber}`
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

  // if (isLoggedIn) {
  //   loadRadiologists();
  // }

  return isLoggedIn ? (
    <>
      <Navbar />
      <Features />
      <div className="home-container">
        <table>
          <thead>
            <tr className="table-headers">
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Type</th>
              <th>DICOM Actions</th>
            </tr>
          </thead>
          <tbody>
            {radiologists.map((radiologist, index) => (
              <tr key={radiologist.id}>
                <th scope="row">{index + 1}</th>
                <td>{radiologist.name}</td>
                <td>{radiologist.username}</td>
                <td>{radiologist.email}</td>
                <td>{radiologist.contactNumber}</td>
                <td>{radiologist.type}</td>
                <td className="actions-buttons">
                  <button className="button primary new">Add</button>
                  <button className="button primary edit">Edit</button>
                  <button className="button primary delete">Delete</button>
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
