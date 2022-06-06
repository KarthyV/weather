import React, { useEffect, useContext } from "react";
import { WeatherContext } from "./context";
import SearchBox from "./searchBox";
import Forecast from "./Forecast";

const App = () => {
  const { city, setCity, position } = useContext(WeatherContext); // Using context

  useEffect(() => {
    // For Getting the current weather data  of the user based on geolocation

    if (!position.lat) return; // Guard Clause

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=d1830506bd0c92984597133ff995c081&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setCity(data))
      .catch((err) => console.log(err));
  }, [position]);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Helper Function Date formatter
  const getDate = (d) => {
    const date = d.getDate();
    const day = days[d.getDay()];
    const year = d.getFullYear();
    const month = months[d.getMonth()];

    return `${day} ${date}, ${month} ${year}`;
  };
  const date = new Date(); // Getting the current date and passing it to helper function
  const forecastDays = [...days]; // Making a copy of the days for forecast
  let tomorrow = date.getDay() + 1;

  for (let i = 0; i < 7 - tomorrow; i++) {
    // Rotating the array based on tomorrow
    forecastDays.unshift(forecastDays.pop());
  }

  const description = ([initial, ...rest]) =>
    [initial.toUpperCase(), ...rest].join("");

  if (!city)
    // Checking if the city state is available
    return (
      <div className="App lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else {
    return (
      <div className="App">
        <div className="main">
          <SearchBox />
          <div className="detail">
            <div className="weather">
              <img
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt="icon"
              ></img>
              {`${city.main.temp}°C `}
              {description(city.weather[0].description)}
            </div>
            <div className="location">
              {city.name}
              <p className="info">
                (Max : {city.main.temp_max}°C | Min : {city.main.temp_min}°C)
              </p>
            </div>
            <div className="date">{getDate(new Date())}</div>
          </div>
          {/*  Passing Forecast days as Props */}
          <Forecast ForecastDays={forecastDays} />
        </div>
      </div>
    );
  }
};

export default App;
