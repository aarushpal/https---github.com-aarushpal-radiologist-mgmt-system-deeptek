import "./App.css";

import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { Welcome } from "./Components/Welcome";

import React from "react";
import { LoginProvider } from "./LoginContext";
import ViewDicomModal from "./Components/ViewDicomModal/ViewDicomModal";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/viewdicom/:id" element={<ViewDicomModal />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </LoginProvider>
      </Router>
    </div>
  );
}

export default App;
