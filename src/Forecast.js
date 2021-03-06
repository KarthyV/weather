import React, { useContext, useEffect } from "react";
import { WeatherContext } from "./context";

const Forecast = ({ ForecastDays, description }) => {
  const { position, forecast, setforecast } = useContext(WeatherContext);
  useEffect(() => {
    if (!position.lat) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&exclude=current,minutely,hourly,alerts&appid=d1830506bd0c92984597133ff995c081&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setforecast(data.daily))
      .catch((err) => console.log(err));
  }, [position]);

  if (!forecast) return <div>Loading...</div>;
  else {
    return (
      <div className="forecast">
        Forecast
        <div className="box">
          {ForecastDays.map((day, i) => {
            return (
              <div key={i} className="cast">
                <h3 className="day">{day}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png`}
                  alt="icon"
                ></img>
                <h3>{forecast[i].temp.max}°C</h3>
                <p className="description">
                  {description(forecast[i].weather[0].description)}
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
