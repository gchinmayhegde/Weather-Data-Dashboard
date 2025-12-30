import React from "react";
import { useState,useEffect } from "react";

function App(){

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(selectedCity);
  //console.log(city);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    console.log(selectedCity);
    
    if(selectedCity === "") return;

    const fetchWeatherData = async ()=> {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      }
       catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchWeatherData(); 
  }, [selectedCity]);


  return(
    <div className="App">
      <h1 className="main-heading">Weather Data Dashboard</h1>
      <p className="tag-line">Welcome to the Weather Data Dashboard!</p>

      <input type="text" className="city-input" placeholder="Enter City Name" value={city} onChange={(e)=>setCity(e.target.value)}/>
      <button className="get-weather-btn" onClick={()=>setSelectedCity(city)}>Get Weather</button>

      {loading && !error && <p>Loading weather data...</p>}
      {error && <p style={{color:"red"}}>Error: {error}</p>}

    {weatherData && !loading && !error && (
      <div className="weather-data-main">
        <h2>Weather in {weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Weather: {weatherData.weather[0].description}</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    )}
      
    </div>
  )
}

export default App;