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
    }
    dayAfterTomorrow: {
        time: Date;
        maxTemperature: number;
        minTemperature: number;
    }
}

const BASE_URL = 'http://localhost:3000/api/weather'

export const getWeatherData = async (location: string): Promise<weatherData> => {
    try {
        const response = await axios.get(BASE_URL, {
          params: {
            location: location
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching weatherData:', error);
        throw error;
      }
}