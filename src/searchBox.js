import React, { useState, useContext } from "react";
import { WeatherContext } from "./context";

const SearchBox = () => {
  const { setPosition, setCity } = useContext(WeatherContext);
  const [query, setQuery] = useState("");

  const handleEnter = (e) => {
    // Updating the position state based on users search results
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=d1830506bd0c92984597133ff995c081&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod !== 200) {
            throw new Error(`Invalid location, Please try again`);
          } else {
            const { lat, lon } = data.coord;
            setPosition({ lat, lon });
            setCity(data);
            setQuery("");
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="Enter a Location Name..."
      />
    </div>
  );
};

export default SearchBox;
