import express from 'express';
import * as weatherController from '../controllers/weather';

const router = express.Router();

router.get('/weather', weatherController.getWeatherByLocation);
router.get('/weather/:lat/:long', weatherController.getWeatherByCoordinates);

console.log('weatherRouter loaded');

export default router;