import React, { useContext, useEffect } from "react";
import { WeatherContext } from "./context";

const Forecast = ({ next5 }) => {
  const { position, next5city, setnext5City } = useContext(WeatherContext);
  useEffect(() => {
    if (!position.lat) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&exclude=current,minutely,hourly,alerts&appid=d1830506bd0c92984597133ff995c081&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setnext5City(data.daily))
      .catch((err) => console.log(err));
  }, [position]);

  if (!next5city) return <div>Loading...</div>;
  else {
    return (
      <div className="forecast">
        Forecast
        <div className="box">
          {next5.map((day, i) => {
            return (
              <div key={i} className="cast">
                <h3 className="day">{day}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${next5city[i].weather[0].icon}.png`}
                  alt="icon"
                ></img>
                <h3>{next5city[i].temp.max}°C</h3>
                <p className="description">
                  {next5city[i].weather[0].description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Forecast;
