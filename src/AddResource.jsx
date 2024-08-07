import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

{/* ref: https://react.dev/learn/choosing-the-state-structure */}
const AddResource = () => {
  function AddForm() {
    const [validationErrors, setValidationErrors] = useState({});
    const [apiError, setApiError] = useState(false);
    const navigate = useNavigate();
    const [resource, setResource] = useState({
      name: "",
      hours: "",
    });

    function handleNameChange(e) {
      setResource({
        ...resource,
        name: e.target.value,
      });
    }

    function handleHoursChange(e) {
      setResource({
        ...resource,
        hours: e.target.value,
      });
    }

    function submitForm(resource) {
      const postData = new FormData();
      postData.append("name", resource.name);
      postData.append("hours", resource.hours);
      return fetch("/api/resource/add", {
        method: "POST",
        body: postData,
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    }

    function handleSubmit(e) {
      e.preventDefault();
      submitForm(resource)
        .then((data) => {
          setApiError(false);
          if (data != null && data.has_errors) {
            setValidationErrors(data.errors);
          } else {
            setValidationErrors({});
            navigate("/", {});
          }
        })
        .catch(() => {
          setApiError(true);
        });
    }

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col md="auto">
            <Card>
              <Card.Body>
                <Col>
                  {apiError && (
                    <div className="alert alert-danger">
                      Error Communicating with Server
                    </div>
                  )}
                  {/* ref: https://react-bootstrap.netlify.app/docs/forms/overview */}
                  <Form>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Resource Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Name"
                        onChange={handleNameChange}
                        isInvalid={validationErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHours">
                      <Form.Label>Hours Needed</Form.Label>
                      <Form.Control
                        type="hours"
                        placeholder="Hours"
                        onChange={handleHoursChange}
                        isInvalid={validationErrors.hours}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.hours}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Enter number of continuous hours of energy consumption
                      </Form.Text>
                    </Form.Group>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      type="submit"
                    >
                      Add
                    </Button>{" "}
                    <Link to="/">
                      <Button variant="outline-dark">Cancel</Button>
                    </Link>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <AddForm />
    </div>
  );
};

export default AddResource;
