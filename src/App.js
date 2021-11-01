import { useState, useEffect } from "react";
import "./App.css";
import People from "./components/People";
import headerBackground from "./images/header-background.png";

function App() {
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ prev: false, next: true });
  const [charInput, setCharInput] = useState(null);

  useEffect(() => {
    (async () => {
      const req = await fetch("https://swapi.dev/api/people");
      const res = await req.json();
      console.log(res);
      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      setLoading(false);
    })();
  }, []);

  const handleSearch = async () => {
    if (!charInput) return;

    const req = await fetch(
      `https://swapi.dev/api/people/?search=${charInput.trim()}`
    );
    const res = await req.json();
    setPeople(res.results);
  };
  const pagination = async (type, { prev, next }) => {
    if (type === "next") {
      const req = await fetch(next);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    } else {
      if (!prev) return;
      const req = await fetch(prev);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    }
  };

  return (
    <div className="App">
      <header>
        <div className="head-text">
          <div className="head-image">
            <img
              className="arrow-open"
              src={headerBackground}
              alt="Previous results"
            />
          </div>
          <div class="text-on-image">
            <h1>Welocome to Starwars API</h1>
          </div>
          {/* To search the characters */}

          <div className="searchNames">
            <input
              type="text"
              aria-label="Search for character"
              name="characterSearch"
              id="characterSearch"
              placeholder="search character"
              value={charInput !== null ? charInput : ""}
              onChange={(e) => {
                setCharInput(e.target.value);
              }}
            />

            <button className="searchButton" onClick={() => handleSearch()}>
              Search
            </button>
          </div>
        </div>
      </header>
      <section>
        <h1> Starwars Character Names </h1>
        <div className="charcterContainer">
          {people === null ? (
            <div className="card_list_loading">{loading}</div>
          ) : (
            people.map((charData, index) => (
              <People key={index} charData={charData} index={index} />
            ))
          )}

          {people !== null && people.length === 0 ? (
            <div className="card_list_error">
              <h1 tabIndex="0">No data Found.</h1>
              <h1 tabIndex="0">Please try again</h1>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="paginationButton">
          <button
            onClick={() => pagination("prev", page)}
            style={{ display: page.prev === null ? "none" : "inline-block" }}
          >
            Prev
          </button>

          <button
            onClick={() => pagination("next", page)}
            style={{ display: page.next === null ? "none" : "inline-block" }}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
