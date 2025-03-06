import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //state for timeframe and fetched quotes
  const [timeframe, setTimeframe] = useState("all_time");
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes?timeframe=${timeframe}`);
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

  // update quotes when timeframe changes
  useEffect(() => {
    fetchQuotes();
  }, [timeframe]);

  //handler for selection menu
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

      <div className="messages">
        {quotes.map((quote, index) => (
          <div key={index}>
            <p>{quote.name}</p>
            <p>{quote.message}</p>
            <p>{quote.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
