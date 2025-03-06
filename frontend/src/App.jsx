import { useState } from "react";
import "./App.css";

function App() {
  //state for timeframe and fetched quotes
  const [timeframe, setTimeframe] = useState("all_time");
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes?timeframe=${timeframe}`);
      if (!response.ok) {
        console.error("Error getting quotes");
        return;
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error getting quotes:", error);
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
      {/* TODO: Display the actual quotes from the database */}
      <div className="messages">
        <p>Peter Anteater</p>
        <p>Zot Zot Zot!</p>
        <p>Every day</p>
      </div>
    </div>
  );
}

export default App;
