import React from "react";

function Quote({ name, message, time }) {
  return (
    <div className="quote-item">
      <p>
        <strong>{name}</strong>
      </p>
      <p>{message}</p>
      <p>
        <small>{new Date(time).toLocaleString()}</small>
      </p>
    </div>
  );
}

export default Quote;
