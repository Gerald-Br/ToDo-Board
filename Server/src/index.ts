import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weatherRouter';

const app = express();
app.use(cors());

app.use('/api', weatherRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});