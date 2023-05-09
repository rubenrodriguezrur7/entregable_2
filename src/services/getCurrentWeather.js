import axios from "axios";
import { kelvinToCelsius } from "../utils/kelvinToCelsius";
import { kelvinToFarenheit } from "../utils/kelvinToFarenheit";
import { getIconById } from "../utils/getIconById";

export const getCurrentWeather = async (lat, lon) => {
  try {
    const params = {lat, lon, appid: "c2dc6852631ade0b0dbceec2123acc12",};
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather",
      {
         params,
      }
    ); 
      
    const weatherInfo = {
      country: res.data.sys.country,
      city: res.data.name,
      weather: {
        main: res.data.weather[0].main,
        description: res.data.weather[0].description,
        icon: getIconById(res.data.weather[0].icon),
      },
      temperature: {
        kelvin: res.data.main.temp,
        celsius: kelvinToCelsius(res.data.main.temp),
        farenheit: kelvinToFarenheit(res.data.main.temp),
      },
    };

    return weatherInfo;
  } catch (error) {
    console.error(error);
  }
};