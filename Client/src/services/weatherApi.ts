import axios from 'axios';
export interface weatherData {
    location: string;
    today: {
        time: Date;
        temperature: number;
        rainprobability: number;
    }
    tomorrow: {
        time: Date;
        maxTemperature: number;
        minTemperature: number;
        rainprobability: number;
    }
    dayAfterTomorrow: {
        time: Date;
        maxTemperature: number;
        minTemperature: number;
        rainprobability: number;
    }
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
      throw error; // Re-throw the error to be handled by the calling function
  }
};