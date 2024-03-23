import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import "../pages/About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-inner-container">
          <div className="about-heading">
            <p>About Us</p>
          </div>
          <div className="about-content">
            <p>
              DeepTek mission is to make quality radiology services more
              affordable and accessible by leveraging the power of Al. It is
              amongst very few Radiology Al companies which have successfully
              adopted its technology in a commercial mode - creating clear and
              quantifiable value for patients, hospitals, and radiologists.
            </p>
            <p>
              We plan to equip healthcare caregivers with the power of Al. Its
              power has the potential to transform healthcare radically. Deeptek
              uses in-house innovative "assisted and augmented" (AaA)
              imaging-focused algorithmic tools designed by our experts and
              covers a wide sphere of medical imaging like radiographs, CT
              scans, and MRI.
            </p>
            <p>
              We aim to save time, give caregivers additional reach in treating
              more individuals in need of care, and give prompt results.
              Considering workflow management, this amounts to drastic savings
              in healthcare costs by using experts' valuable time.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
