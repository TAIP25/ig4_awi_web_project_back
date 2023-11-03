import express from 'express';
import { configCors } from './middlewares/mainMiddlewares';

// Create Express server
const app = express();

app.use(configCors);

export default app;