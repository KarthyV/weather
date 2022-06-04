import React, { useEffect, useContext } from "react";
import { WeatherContext } from "./context";
import SearchBox from "./searchBox";
import Forecast from "./Forecast";

const App = () => {
  const { city, setCity, position } = useContext(WeatherContext);

  useEffect(() => {
    if (!position.lat) return;

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
  const getDate = (d) => {
    const date = d.getDate();
    const day = days[d.getDay()];
    const year = d.getFullYear();
    const month = months[d.getMonth()];

    return `${day} ${date}, ${month} ${year}`;
  };
  const date = new Date();
  const next5 = [];
  let tomorrow = date.getDay() + 1;
  for (let i = 0; i <= 6; i++) {
    if (tomorrow === 7) tomorrow = 0;
    next5.push(days[tomorrow + i]);
  }

  const description = ([initial, ...rest]) =>
    [initial.toUpperCase(), ...rest].join("");

  if (!city)
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
              {description(city.weather[0].description)} {city.main.temp}°C
            </div>
            <div className="location">
              {city.name} (
              <i>
                Max : {city.main.temp_max}°C | {city.main.temp_min} : 30°C
              </i>
              )
            </div>
            <div className="date">{getDate(new Date())}</div>
          </div>
          <Forecast next5={next5} />
        </div>
      </div>
    );
  }
};

export default App;
