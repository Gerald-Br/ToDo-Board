export interface WeatherData {
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
  
  export const formatWeatherData = (data: any): WeatherData => {
    console.log('Received data:', data);
    if (!data.current || !data.daily) {
        throw new Error('Invalid data structure');
    }
    const current = data.current;
    const daily = data.daily;
    return {
        today: {
            time: new Date(current.time),
            temperature: current.temperature_2m,
            rainprobability: current.precipitation,
            sunshine: daily.sunshine_duration[0]/3600,
        },
        tomorrow: {
            time: new Date(daily.time[1]),
            maxTemperature: daily.temperature_2m_max[1],
            minTemperature: daily.temperature_2m_min[1],
            sunshine: daily.sunshine_duration[1]/3600,
            rainprobability: daily.precipitation_probability_mean[1],
        },
        dayAfterTomorrow: {
            time: new Date(daily.time[2]),
            maxTemperature: daily.temperature_2m_max[2],
            minTemperature: daily.temperature_2m_min[2],
            sunshine: daily.sunshine_duration[2]/3600,
            rainprobability: daily.precipitation_probability_mean[2],
        }
    }
  };