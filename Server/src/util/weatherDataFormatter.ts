export interface WeatherData {
    time: Date;
    temperature?: number; // Optional, only for the current day
    maxTemperature: number;
    minTemperature: number;
    sunshine: number;
    rainprobability: number;
}

export const formatWeatherData = (data: any): WeatherData[] => {
    console.log('Received data:', data);
    if (!data.current || !data.daily) {
        throw new Error('Invalid data structure');
    }
    const current = data.current;
    const daily = data.daily;

    const weatherDataItems: WeatherData[] = [];
    console.log('Current:', weatherDataItems);
    weatherDataItems.push({
        time: new Date(current.time),
        temperature: current.temperature_2m,
        maxTemperature: daily.temperature_2m_max[0],
        minTemperature: daily.temperature_2m_min[0],
        sunshine: daily.sunshine_duration[0] / 3600,
        rainprobability: current.precipitation
    });
    console.log('Current:', weatherDataItems);
    for (let i = 1; i < daily.time.length; i++) {
        console.log('Inside Loop number:', i);
        weatherDataItems.push({
            time: new Date(daily.time[i]),
            maxTemperature: daily.temperature_2m_max[i],
            minTemperature: daily.temperature_2m_min[i],
            sunshine: daily.sunshine_duration[i] / 3600,
            rainprobability: daily.precipitation_probability_mean[i]
        });
    }
    console.log('After Adding others:', weatherDataItems);
    return weatherDataItems;
};