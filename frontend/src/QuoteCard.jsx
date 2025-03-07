import React from "react";

function QuoteCard({ name, message, time }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        color: "#fff",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h5>{name}</h5>
      <p>{message}</p>
      <small
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FFD700" }}
      >
        {new Date(time).toLocaleString()}
      </small>
    </div>
  );
}

export default QuoteCard;
