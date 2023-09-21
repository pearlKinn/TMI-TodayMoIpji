import axios from 'axios';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const success = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const weather = await getWeather(latitude, longitude);

  return weather;
};

const getWeather = (lat, lon) => {
  return axios(
    `${
      import.meta.env.VITE_WEATHER_URL
    }?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  ).then((response) => {
    const weatherInfo = {
      temperature: response.data.main.temp,
      place: response.data.name,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      iconURL: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    };

    return weatherInfo;
  });
};
