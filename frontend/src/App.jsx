import { useState, useEffect } from "react";
import Quote from "./Quote";
import "./App.css";

function App() {
  // State for timeframe and fetched quotes
  const [timeframe, setTimeframe] = useState("all_time");
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes from the backend
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

  // Re-fetch quotes whenever the timeframe changes
  useEffect(() => {
    fetchQuotes();
  }, [timeframe]);

  // Handler for the select menu
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  // Custom submit handler for the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent full page refresh
    const formData = new FormData(e.target);
    try {
      // Use redirect: "manual" to intercept the redirect response
      const response = await fetch("http://127.0.0.1:8000/quote", {
        method: "POST",
        body: formData,
        redirect: "manual",
      });
      console.log(
        "Response status:",
        response.status,
        "redirected:",
        response.redirected
      );

      // If we get a 303 (or a status of 0 which sometimes happens in cross-origin redirects) or the response indicates a redirect, treat it as success.
      if (
        response.status === 303 ||
        response.redirected ||
        response.status === 0
      ) {
        fetchQuotes();
        e.target.reset();
      } else {
        console.error("Error submitting quote:", response.status);
      }
    } catch (error) {
      console.error("Caught error during submission:", error);
      // In case of error, still try to re-fetch quotes
      fetchQuotes();
      e.target.reset();
    }
  };

  return (
    <div className="App">
      {/* TODO: include an icon for the quote book */}
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Name</label>
        <input type="text" name="name" id="input-name" required />
        <label htmlFor="input-message">Quote</label>
        <input type="text" name="message" id="input-message" required />
        <button type="submit">Submit</button>
      </form>

      <h2>Previous Quotes</h2>
      <div>
        <label htmlFor="timeframe-select">Filter by timeframe:</label>
        <select
          id="timeframe-select"
          value={timeframe}
          onChange={handleTimeframeChange}
        >
          <option value="all_time">All Time</option>
          <option value="year">Last Year</option>
          <option value="month">Last Month</option>
          <option value="week">Last Week</option>
        </select>
      </div>

      <div className="messages">
        {quotes.length === 0 && <p>No quotes found</p>}
        {quotes.map((quote, index) => (
          <Quote
            key={index}
            name={quote.name}
            message={quote.message}
            time={quote.time}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
