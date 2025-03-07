import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import QuoteCard from "./QuoteCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import quoteLogo from "../images/quotebook.png";

function App() {
  // State for timeframe and fetched quotes
  const [timeframe, setTimeframe] = useState("all_time");
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/quotes?timeframe=${timeframe}`
      );
      if (!response.ok) {
        console.error("Error fetching quotes:", response.statusText);
        return;
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [timeframe]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  // Custom submit handler remains the same as before
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent full page refresh
    const formData = new FormData(e.target);
    try {
      const response = await fetch("http://127.0.0.1:8000/quote", {
        method: "POST",
        body: formData,
        redirect: "manual",
      });
      if (
        response.status === 303 ||
        response.redirected ||
        response.status === 0
      ) {
        fetchQuotes();
        e.target.reset();
      } else {
        console.error("Error submitting quote:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      fetchQuotes();
      e.target.reset();
    }
  };

  return (
    <Container
      fluid
      className="py-4 px-4"
      style={{
        background: "linear-gradient(135deg, #4a90e2 0%, #5fc3e4 100%)",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div className="content-wrapper">
        {/* Header Section */}
        <div className="d-flex align-items-center mb-4">
          <img
            src={quoteLogo}
            alt="Quotebook Logo"
            style={{ width: "60px", marginRight: "10px" }}
          />
          <h1>Hack at UCI Tech Deliverable</h1>
        </div>

        {/* Form Section */}
        <h2 className="mb-3">Submit a quote</h2>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              required
              style={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              className="me-3"
            />
            <Form.Control
              type="text"
              name="message"
              placeholder="Quote"
              required
              style={{
                backgroundColor: "#fff",
                color: "#000",
              }}
            />
          </div>
          <Button variant="light" type="submit">
            Submit
          </Button>
        </Form>

        {/* Filter Section */}
        <h2 className="mt-5 mb-3">Previous Quotes</h2>
        <div>
          <Form.Group className="d-flex align-items-center mb-4">
            <Form.Label className="me-2 mb-0" style={{ fontSize: "1.25rem" }}>
              Filter by timeframe:
            </Form.Label>
            <Form.Select
              aria-label="Timeframe select"
              value={timeframe}
              onChange={handleTimeframeChange}
              style={{ width: "150px", color: "#000" }}
            >
              <option value="all_time">All Time</option>
              <option value="year">Last Year</option>
              <option value="month">Last Month</option>
              <option value="week">Last Week</option>
            </Form.Select>
          </Form.Group>
        </div>

        {/* Quotes Display */}
        <div className="messages">
          {quotes.length === 0 && <p>No quotes found</p>}
          {quotes
            .slice()
            .reverse()
            .map((quote, index) => (
              <QuoteCard
                key={index}
                name={quote.name}
                message={quote.message}
                time={quote.time}
              />
            ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
