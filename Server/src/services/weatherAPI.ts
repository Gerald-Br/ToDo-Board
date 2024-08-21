import axios from 'axios';

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getWeatherData = async (lat: number, long: number) => {
  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        latitude: lat,
        longitude: long,
        current: 'temperature_2m,precipitation',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunshine_duration',
        timezone: 'Europe/Berlin',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getGeocodeData = async (location: string) => {
  try {
    const response = await axios.get(GEOCODE_URL, {
      params: {
        name: location,
        count: 1,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    throw error;
  }
}