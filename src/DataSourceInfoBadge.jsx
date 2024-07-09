import React from "react";
import Badge from "react-bootstrap/Badge";

const DataBadge = ({ query }) => {

  return (
    <div>
      <Badge bg="secondary" className="float-end">
        Market: {query.operator} {query.market}, Location: {query.location}
      </Badge>
      {query.fallback ? (
        <Badge bg="danger" className="float-start">
          {"Tomorrow's Prices Not Available Yet"}
        </Badge>
      ) : (
        <Badge bg="info" className="float-start">
          {"Displaying Tomorrow's Prices"}
        </Badge>
      )}
    </div>
  );
};

export default DataBadge;
