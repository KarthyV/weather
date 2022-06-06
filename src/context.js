import React, { createContext, useState } from "react";

export const WeatherContext = createContext("");

const AppContext = ({ children }) => {
  const [city, setCity] = useState(null); // City Data
  const [forecast, setforecast] = useState(null); // Forecast data for the next 6 days
  const [position, setPosition] = useState({
    // Current Users coords & also from the search request
    lat: "",
    lon: "",
  });

  if (!position.lat) {
    // Checking if the search request data doesnt exist, if not setting the current user location
    const location = (pos) => {
      var { latitude: lat, longitude: lon } = pos.coords;
      // console.log(lat, lon);
      setPosition({ lat, lon });
    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(location, error, options);
  }

  return (
    // passing all the state to the childern (App)
    <WeatherContext.Provider
      value={{ city, setCity, position, setPosition, forecast, setforecast }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default AppContext;
