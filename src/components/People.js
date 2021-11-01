import React, { useState } from "react";
import "./People.css";
function People({ charData }) {
  const { name, birth_year, height } = charData;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="card_container"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        data-allow-toggle
      >
        <h4>{name}</h4>
      </button>
      {isOpen && (
        <div className="card_content">
          <p tabIndex="0">Name: {name}</p>
          <p tabIndex="0">Year born : {birth_year}</p>
          <p tabIndex="0">Height: {height}</p>
        </div>
      )}
    </div>
  );
}

export default People;
