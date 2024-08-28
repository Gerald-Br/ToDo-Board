import axios from 'axios';
export interface WeatherDataItem {
    time: Date;
    temperature?: number; // Optional, only for the current day
    maxTemperature: number;
    minTemperature: number;
    sunshine: number;
    rainprobability: number;
}
export interface weatherData {
    location: string;
    data: WeatherDataItem[];
}

const SERVER_URL = 'http://localhost:3000/api/weather'

export const getWeatherData = async (location: string): Promise<weatherData> => {
  try {
      const response = await axios.get(SERVER_URL, {
          params: { location }
      });
      console.log('Weather data:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
  }
};