import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import coursesRoutes from './routes/courses.mjs';
import learningPathRoutes from './routes/learning-paths.mjs';
import userRoutes from './routes/user.mjs';
import { DB_NAME, PASSWORD, USER_NAME } from './credentials.mjs';

const app = express();

mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.u1dcews.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  );
  next();
});

app.use('/api/courses', coursesRoutes);
app.use('/api/learning-paths', learningPathRoutes);
app.use('/api/user', userRoutes);

export default app;
