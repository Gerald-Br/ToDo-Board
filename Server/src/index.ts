import express from 'express';
import cors from 'cors';
import { getWeatherData, getGeocodeData } from './services/weatherAPI';
import { formatWeatherData } from './util/weatherDataFormatter';
import { formatGeocodeData } from './util/geocodeDataFormatter';
import { formatWeatherGeoData } from './util/finalWeatherResponseFormatter';

const app = express();
app.use(cors());
const port = 3000;

app.get('/api/weather', async (req: any, res: any) => {
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
    res.json(finalResponse);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});