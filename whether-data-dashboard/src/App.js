import { useState,useEffect } from "react";
import "./App.css";

function App(){

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
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

  useEffect(() => {
    document.title = selectedCity ? `Weather in ${selectedCity}` : "Weather Data Dashboard";
  }, [selectedCity]);

  const handleGetWeather = () => {
    if(city.trim() !== ""){
      setSelectedCity(city.trim());
      setCity("");
    }
  };


  return(
    <div className="App">
      <strong><h1 className="main-heading">Weather Data Dashboard</h1></strong>
      <p className="tag-line">Your quick view into today’s weather</p>

      <input type="text" className="city-input" placeholder="Enter City Name" value={city} onChange={(e)=>setCity(e.target.value)}/>
      <button className="get-weather-btn" onClick={handleGetWeather} disabled={loading}>Get Weather</button>

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