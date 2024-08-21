export function getWeatherIcon(weather: string): string {
    switch (weather) {
        case 'Clear':
            return 'wi-day-sunny';
        case 'Clouds':
            return 'wi-cloudy';
        case 'Rain':
            return 'wi-rain';
        case 'Snow':
            return 'wi-snow';
        default:
            return 'wi-day-sunny';
    }
}