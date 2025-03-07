import React from "react";
import { Card } from "react-bootstrap";

function QuoteCard({ name, message, time }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{new Date(time).toLocaleString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default QuoteCard;
