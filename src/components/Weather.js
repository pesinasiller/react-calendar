import React, { useState, useEffect } from "react";
import moment from 'moment';

const Weather = (props) => {

  const [weatherInfo, setWeatherInfo] = useState({});

  const fetchData  = async (city) => {
    const url = "http://api.openweathermap.org/data/2.5/forecast?q="
      + city
      + "&units=metric&APPID=1d9184ccc9c5d718d47425d8f2ca6374";
    const res = await fetch(url);
    res.json().then(res => setWeatherInfo(res));
  }

  useEffect(() => {
      if(props.city) fetchData(props.city);
  }, [props.city])

  const date = moment(props.date).format("YYYY-MM-DD");
  const foundForecast = Object.keys(weatherInfo).length!==0 ?
    weatherInfo.list.find((element) => element.dt_txt.includes(date))
    : null;

  return (
    <div>
    <label>Weather:</label>
      {foundForecast ? (
        <span> {`${foundForecast.main.temp} ºC`}</span>
      ) : (
       <span> Only available in the next 5 days from today </span>
      )}
    </div>
  );
};
export default Weather;
