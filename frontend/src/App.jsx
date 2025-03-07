import { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
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
    <Container className="py-4">
      <img
        src={quoteLogo}
        alt="Quotebook Logo"
        style={{ width: "60px", marginRight: "10px" }}
      />
      <h1 className="mb-4">Hack at UCI Tech Deliverable</h1>

      <h2 className="mb-3">Submit a quote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="inputName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="inputMessage">
          <Form.Label>Quote</Form.Label>
          <Form.Control type="text" name="message" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <h2 className="mt-5 mb-3">Previous Quotes</h2>
      <div>
        <label htmlFor="timeframe-select" className="me-2">
          Filter by timeframe:
        </label>
        <select
          id="timeframe-select"
          value={timeframe}
          onChange={handleTimeframeChange}
          className="mb-4"
        >
          <option value="all_time">All Time</option>
          <option value="year">Last Year</option>
          <option value="month">Last Month</option>
          <option value="week">Last Week</option>
        </select>
      </div>

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
    </Container>
  );
}

export default App;
