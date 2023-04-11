

import ReactDOM from 'react-dom';
import './style.css'





import React, { useState, useEffect } from 'react';
function Wheater() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchData = async () => {

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=643fc592ee92f8b7f4d40fa378630af9`);
                const data = await response.json();
                setWeatherData(data);
                setCity(data.name);
            });
        };
        fetchData();
    }, []);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=643fc592ee92f8b7f4d40fa378630af9`);
        const data = await response.json();
        setWeatherData(data);
    };

    return (
        
        <div className='container'>
        <h1 className='text-center mt-5'>My Weather App</h1>
        <div className='row justify-content-center'>
          <form onSubmit={handleSubmit} className='col-md-6 col-lg-4'>
            <div className='mb-3'>
              <label For='cityName' className='form-label'>
                City name:
              </label>
              <input type='text' className='form-control' id='cityName' value={city} onChange={handleCityChange} />
            </div>
            <button type='submit' className='btn btn-primary'>
              Get temperature
            </button>
          </form>
        </div>
        {weatherData && (
          <div className='row justify-content-center mt-5'>
            <div className='col-md-6 col-lg-4'>
              <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}&deg;C</p>
              <p>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}&deg;C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    );
}




ReactDOM.render(<Wheater />, document.getElementById('root'));