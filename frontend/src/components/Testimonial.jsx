import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Testimonial({ feedback }) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Title>Катерина</Card.Title>
            <div
              style={{
                color: "gold",
              }}
            >
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <q>{feedback}</q>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Testimonial;
