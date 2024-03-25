import React from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Home from './Home'
import Add from './Add'

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: "2vh" }}>
        <Container>
          <Navbar.Brand href="/">Energy Resources</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">
              <Button variant="outline-primary" className="float-right">
                Add Resource
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<Add />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return <h2>NotFound</h2>;
}
