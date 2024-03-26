import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import Plot from "react-plotly.js";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";


const Home = () => {
  const [existingResources, setExistingResources] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [resourceToDelete, setResourceToDelete] = useState([]);
  const [query, setQuery] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (resource) => {
    setResourceToDelete(resource)
    setShow(true);
  }

  useEffect(() => {
    fetchResources();
  }, []);

  function fetchResources() {
    fetch("/api/resources/view")
          .then((res) => res.json())
          .then((data) => {
            setExistingResources(data.table);
            setChartData(data.chart);
            setQuery(data.query);
            setApiError(false);
          })
          .catch((error) => {
            setApiError(true);
          });
  }

  function handleDelete(resource) {
      deleteResource(resource).then((data) => {
        handleClose();
        fetchResources();
      });
  }

  function deleteResource(resource) {
    const postData = new FormData();
    postData.append("unique_id", resource.unique_id);
    return fetch("/api/resource/delete", {
      method: "POST",
      body: postData,
    })
    .then((response) => {
      setApiError(false);
    })
    .catch((error) => {
      setApiError(true);
    });
  }

  function ResourceRow({ resource }) {
    return (
      <tr>
        <td>{resource.name}</td>
        <td>{resource.hours}</td>
        <td>{resource.start} to {resource.end}</td>
        <td>{resource.average}</td>
        <td>
          <Link to={`/view/${resource.unique_id}`}>
            <Button variant="outline-dark" size="sm">
              View
            </Button>
          </Link>{" "}
            <Button variant="outline-danger" size="sm" onClick={() => handleShow(resource)}>
              Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{resourceToDelete.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete {resourceToDelete.name}?</Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete(resourceToDelete)}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
        </td>
      </tr>
    );
  }

  function ResourceTable({ resources }) {
    const rows = [];
    resources.forEach((resource) => {
      rows.push(<ResourceRow resource={resource} key={resource.name} />);
    });

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Hours Needed</th>
            <th style={{ color: 'green' }}>Optimal Window</th>
            <th>Average Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="auto">
          <Card>
            <Card.Body>
              <div>
                {apiError && <div className="alert alert-danger">Error Communicating with Server</div>}
                <Plot
                  data={chartData}
                  layout={{
                    title: "Lowest Price Window for Each Resource",
                    xaxis: { title: "Time" },
                    yaxis: { title: "Price (LMP)" },
                  }}
                />
                <ResourceTable resources={existingResources} />
              </div>
              <div>
                <Badge bg="secondary" className="float-end">
                  Market: {query.operator} {query.market}, Location:{" "}{query.location}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default Home;