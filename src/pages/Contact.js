import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import "../pages/Contact.css";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-inner-container">
          <div className="contact-main-heading">
            <p>Contact Us</p>
          </div>
          <div className="contact-content">
            <div className="customer-support">
              <p>
                {" "}
                <span className="contact-heading">Customer Support :</span>{" "}
                support@deeptek.ai
              </p>
            </div>
            <div className="other-queries">
              <p>
                {" "}
                <span className="contact-heading">Other Queries :</span>{" "}
                info@deeptek.ai
              </p>
            </div>
            <div className="address">
              <p>
                <span className="contact-heading">Address : </span>
                India 3rd Floor, Ideas to ImpactBuilding, Pallod Farms,Behind
                Vijay Sales, Baner, Pune 411 045, Maharashtra United States 20
                Elan Lane Ronkonkoma, NY 11779
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
