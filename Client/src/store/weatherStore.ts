import { defineStore } from 'pinia';
import { getWeatherData } from '@/services/weatherApi'; // Adjust the import path as needed

export interface WeatherData {
  location: string;
  today: {
    time: Date;
    temperature: number;
    rainprobability: number;
  };
  tomorrow: {
    time: Date;
    maxTemperature: number;
    minTemperature: number;
    rainprobability: number;
  };
  dayAfterTomorrow: {
    time: Date;
    maxTemperature: number;
    minTemperature: number;
    rainprobability: number;
  };
}

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weatherData: null as WeatherData | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    currentWeather: (state) => state.weatherData?.today,
    forecast: (state) => ({
      tomorrow: state.weatherData?.tomorrow,
      dayAfterTomorrow: state.weatherData?.dayAfterTomorrow,
    }),
  },
  actions: {
    async fetchWeather(location: string) {
      this.loading = true;
      this.error = null;
      try {
        const data = await getWeatherData(location);
        this.weatherData = data;
      } catch (error) {
        this.error = 'Failed to fetch weather data';
      } finally {
        this.loading = false;
      }
    },
  },
});