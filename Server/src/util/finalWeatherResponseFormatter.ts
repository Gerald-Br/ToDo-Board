import { WeatherData } from './weatherDataFormatter';

interface FinalWeatherResponse {
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

export const formatWeatherGeoData = (location: string, weatherData: WeatherData): FinalWeatherResponse => {
    console.log('Received data:', weatherData);
    return {
        location: location,
        ...weatherData
    }
}