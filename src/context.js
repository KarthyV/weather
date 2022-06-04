import React, { createContext, useState } from "react";

export const WeatherContext = createContext("");

const AppContext = ({ children }) => {
  const [city, setCity] = useState(null);
  const [next5city, setnext5City] = useState(null);
  const [position, setPosition] = useState({
    lat: "",
    lon: "",
  });

  if (!position.lat) {
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
    <WeatherContext.Provider
      value={{ city, setCity, position, setPosition, next5city, setnext5City }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default AppContext;
