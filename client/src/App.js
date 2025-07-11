import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const res = await fetch(`http://localhost:5000/weather/${city}`);
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="App">
      <h1>🌦 Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <p><strong>{weather.current.condition.text}</strong></p>
          <p>🌡 Temp: {weather.current.temp_c}°C</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>🌬 Wind: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;
