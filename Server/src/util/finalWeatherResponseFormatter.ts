import { WeatherData } from './weatherDataFormatter';

interface FinalWeatherResponse {
    location: string;
    today: {
        time: Date;
        temperature: number;
        rainprobability: number;
        sunshine: number;
    }
    tomorrow: {
        time: Date;
        maxTemperature: number;
        minTemperature: number;
        sunshine: number;
        rainprobability: number;
    }
    dayAfterTomorrow: {
        time: Date;
        maxTemperature: number;
        minTemperature: number;
        sunshine: number;
        rainprobability: number;
    }
}

export const formatWeatherGeoData = (location: string, weatherData: WeatherData): FinalWeatherResponse => {
    console.log('Received data:', weatherData);
    return {
        location: location,
        ...weatherData
    }
}