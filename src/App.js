import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

import Home from './Home'

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: "2vh" }}>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return <h2>NotFound</h2>;
}
