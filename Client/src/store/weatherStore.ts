import { defineStore } from 'pinia';
import { getWeatherData } from '@/services/weatherService';
import type { weatherData, WeatherDataItem } from '@/services/weatherService';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weatherData: null as weatherData | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    location: (state): string | undefined => state.weatherData?.location,
    currentWeather: (state): WeatherDataItem | null=> state.weatherData?.data[0] ?? null,
    forecast: (state): WeatherDataItem[] | []  => state.weatherData?.data ?? [],
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