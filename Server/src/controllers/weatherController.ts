import { getWeatherData, getGeocodeData } from '../services/weatherAPI';
import { formatWeatherData } from '../util/weatherDataFormatter';
import { formatGeocodeData } from '../util/geocodeDataFormatter';
import { formatWeatherGeoData } from '../util/finalWeatherResponseFormatter';

export const getWeatherByLocation = async (req: any, res: any) => {
    try {
      const location: string = req.query.location as string;
      if (!location) {
        return res.status(400).send('Missing location');
      }
      const geocodeData = await getGeocodeData(location);
      const formattedGeocodeData = formatGeocodeData(geocodeData);
      const weatherData = await getWeatherData(formattedGeocodeData.lat, formattedGeocodeData.long);
      const formattedWeatherData = formatWeatherData(weatherData);
      const finalResponse = formatWeatherGeoData(formattedGeocodeData.name, formattedWeatherData);
      console.log('Final Response:', finalResponse);
      res.json(finalResponse);
    } catch (error) {
      res.status(500).send('Error fetching weather data from Server');
    }
  };
  
  export const getWeatherByCoordinates = async (req: any, res: any) => {
    try {
      const lat: number = req.params.lat;
      const long: number = req.params.long;
      if (!lat || !long) {
        return res.status(400).send('Missing Coordinates');
      }
      const weatherData = await getWeatherData(lat, long);
      const formattedWeatherData = formatWeatherData(weatherData);
      res.json(formattedWeatherData);
    } catch (error) {
      res.status(500).send('Error fetching weather data');
    }
  };