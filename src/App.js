import "./App.css";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  const FetchTickets = async () => {
    const ip = await fetch("https://ipinfo.io?token=3d65915ff7b3f8");
    const code = await ip.json();
    const region = code.region.slice(0, 3);

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/venues?apikey=g2OZIw7lpR4NrRjG6qWjRiTQGW3sZbBL&locale=*&countryCode=${code.country}&stateCode=${region}`
    );
    const data = await res.json();

    const d = data._embedded.venues;
    console.log(d);
    setResults(d);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Tikiter</h1>
        <h2 className="subtitle">Hey! We use your IP to find the events near you!</h2>

        <div className="search">
          <button onClick={FetchTickets}>Start Search</button>

          <div className="results">
            <h3>Results</h3>
            <ul>
              {results.map((result) => (
                <div className="result">
                  <strong>
                    <a href={result.url}>{result.name}</a>
                  </strong>

                  {result.generalInfo ? (
                    <p>{result.generalInfo.generalRule}</p>
                  ) : (
                    <p>No general info</p>
                  )}

                  {result.images ? (
                    <img src={result.images[0].url} alt="venue" />
                  ) : (
                    <h6>No image</h6>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
