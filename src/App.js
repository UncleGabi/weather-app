import React, { useEffect, useState } from "react";
import "./App.scss";

import axios from "axios";

import { InputBox } from "./components/input-box/input-box.component"
import { WeatherDetails } from "./components/weather-details/weather-details.component";

const App = () => {
  
  const [data, setData] = useState({});

  useEffect(() => {

    const success = async(position) => {
      const { latitude, longitude } = position.coords;
      const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

      const location = await axios.get(url, {
        params: {
          latitude: latitude,
          longitude: longitude,
          localityLanguage: "hu"
        }
      });

      const city = location.data.city;
      getDetails(city);

    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    };

  }, []);

  const getDetails = (async(cityName) => {

    const url = "http://api.openweathermap.org/data/2.5/weather";
    const appId = "3461cd7ddeb3bf5931b3c61e8e5024c0";
    const weather = await axios.get(url, {
      params: {
        q: cityName,
        APPID: appId,
        units: "metric"
      }
    });

    const data = await weather.data;
    const details =  {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      temp_feel: Math.round(data.main.temp),
      longitude: data.coord.lon,
      latitude: data.coord.lat,
      desc: data.weather[0].description,
      wind: Math.round(data.wind.speed)
    };

    setData(details)

  });

  const handleChange = (e) => {
      const { value } = e.target;
      getDetails(value);
  };

    return ( 
      <div className="app">
        <InputBox handleChange={handleChange} />
        
        {data &&
          <WeatherDetails className="box" data={data} />
        }
      </div>
    );
  }
 
export default App;