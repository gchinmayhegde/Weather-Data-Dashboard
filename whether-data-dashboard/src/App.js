import React from "react";
import { useState,useEffect } from "react";

function App(){

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  console.log(selectedCity);
  //console.log(city);

  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity]);

  return(
    <div className="App">
      <h1 className="main-heading">Weather Data Dashboard</h1>
      <p className="tag-line">Welcome to the Weather Data Dashboard!</p>

      <input type="text" className="city-input" placeholder="Enter City Name" value={city} onChange={(e)=>setCity(e.target.value)}/>
      <button className="get-weather-btn" onClick={()=>setSelectedCity(city)}>Get Weather</button>
      
    </div>
  )
}

export default App;