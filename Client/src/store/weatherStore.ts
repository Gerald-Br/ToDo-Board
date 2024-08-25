import { defineStore } from 'pinia';
import { getWeatherData } from '@/services/weatherApi';
import type { weatherData } from '@/services/weatherApi';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weatherData: null as weatherData | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    location: (state) => state.weatherData?.location,
    currentWeather: (state) => state.weatherData?.data[0],
    forecast: (state) => ({
      ...state.weatherData?.data
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