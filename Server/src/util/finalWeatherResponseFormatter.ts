import { WeatherData } from './weatherDataFormatter';

interface FinalWeatherResponse {
    location: string;
    data: WeatherData[];
}

export const formatWeatherGeoData = (location: string, weatherData: WeatherData[]): FinalWeatherResponse => {
    return {
        location: location,
        data: weatherData
    }
}