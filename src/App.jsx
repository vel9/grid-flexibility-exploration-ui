import React from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import AddResource from "./AddResource";
import ViewResource from "./ViewResource";

export default function App() {
  return (
    <BrowserRouter>
      {/* ref: https://react-bootstrap.netlify.app/docs/components/navbar/ */}
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        style={{ marginBottom: "2vh" }}
        sticky="top"
      >
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
      <Routes>  {/* ref: https://reactrouter.com/en/main/router-components/browser-router */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddResource />} />
        <Route exact path="/view/:id" element={<ViewResource />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <h2>Not Found</h2>;
}
