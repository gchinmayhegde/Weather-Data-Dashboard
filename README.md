# Weather-Data-Dashboard
A simple React application that fetches and displays real-time weather data for a user-selected city using the useEffect hook and an external API.

Demo Link:


-I used the useEffect hook from React in order to manage responses from openWeather API
-I defined fetchWeatherData() function inside useEffect scope and Used selectedCity in dependency array of useEffect
-So it fetches the data whenever the selectedCity changes(it changes when user clicks getWeather button)

-used Another useEffect Hook to Change Document Title based upon City serached by the User
-It also uses selectedCity in Dependency Array and Document title changes upon change in selectedCity
