import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weatherRouter';
import taskRouter from './routes/taskRouter'
import mongoose from 'mongoose'
import config from './config/db'

const app = express();
app.use(express.json())
app.use(cors());
app.use('/api', weatherRouter);
app.use('/api', taskRouter);

const startServer = async () => {
  try {
    await mongoose.connect(config.db.uri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  } finally {
  }
};

startServer()

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});