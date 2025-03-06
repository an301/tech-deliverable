import { useState, useEffect } from "react";
import Quote from "./Quote";
import "./App.css";

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
      console.log("Fetched quotes:", data);
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Update quotes whenever the selected timeframe changes
  useEffect(() => {
    fetchQuotes();
  }, [timeframe]);

  // Handler for the select menu
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="App">
      {/* TODO: include an icon for the quote book */}
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      {/* TODO: implement custom form submission logic to not refresh the page */}
      <form action="/api/quote" method="post">
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

      {/* Button to manually fetch quotes for debugging */}
      <button onClick={fetchQuotes}>Show Quotes</button>

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
