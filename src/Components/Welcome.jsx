import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <p>Radiologist Management System</p>
      </div>
      <Footer />
    </>
  );
};
