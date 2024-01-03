import { WeatherInterface } from '../../types';

const Weather = ({ weather }: { weather: WeatherInterface }) => {
  const src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div>
      temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius
      <br />
      <img src={src} alt={weather.weather[0].description} />
      <br />
      wind {weather.wind.speed} m/s
    </div>
  );
};

export default Weather;

