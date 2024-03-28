import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Plot from "react-plotly.js";
import Badge from "react-bootstrap/Badge";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DataSourceInfoBadge from "./DataSourceInfoBadge";

const ViewResource = () => {
  const [existingResource, setExistingResource] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [resourceTableData, setResourceTableData] = useState([]);
  const [query, setQuery] = useState([]);

  const { id } = useParams();

  const chartName =
    "Lowest " +
    existingResource.hours +
    "-Hour Windows for " +
    existingResource.name;

  useEffect(() => {
    fetch("/api/resource/view/" + id)
      .then((res) => res.json())
      .then((data) => {
        setExistingResource(data.resource);
        setChartData(data.chart);
        setResourceTableData(data.table);
        setQuery(data.query);
      });
  });

  function ResourceWindowRow({ resourceWindow }) {
    return (
      <tr>
        <td>{resourceWindow.name}</td>
        <td>{resourceWindow.start}</td>
        <td>{resourceWindow.end}</td>
        <td>{resourceWindow.average}</td>
      </tr>
    );
  }

  {/* ref: https://react.dev/learn/thinking-in-react#step-4-identify-where-your-state-should-live */}
  function ResourceWindowTable({ resourceWindows }) {
    const rows = [];
    resourceWindows.forEach((resourceWindow) => {
      rows.push(
        <ResourceWindowRow
          resourceWindow={resourceWindow}
          key={resourceWindow.name}
        />,
      );
    });

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Window</th>
            <th>Start</th>
            <th>End</th>
            <th>Average Price</th>
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
                <Link to="/">
                  <Button variant="outline-dark">Back</Button>
                </Link>
              </div>
              <div>
                <Plot
                  data={chartData}
                  layout={{
                    title: chartName,
                    xaxis: { title: "Time" },
                    yaxis: { title: "Price (LMP)" },
                    width: 800,
                    height: 500,
                  }}
                />
                <ResourceWindowTable resourceWindows={resourceTableData} />
              </div>
              <DataSourceInfoBadge query={query} />
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ViewResource;
