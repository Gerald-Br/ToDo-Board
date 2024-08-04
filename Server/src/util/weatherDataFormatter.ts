export interface WeatherData {
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
        },
        tomorrow: {
            time: new Date(daily.time[1]),
            maxTemperature: daily.temperature_2m_max[1],
            minTemperature: daily.temperature_2m_min[1],
        },
        dayAfterTomorrow: {
            time: new Date(daily.time[2]),
            maxTemperature: daily.temperature_2m_max[2],
            minTemperature: daily.temperature_2m_min[2],
        }
    }
  };