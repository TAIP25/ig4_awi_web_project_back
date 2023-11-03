import express from 'express';
import { configCors } from './middlewares/mainMiddlewares';
const benevoleRoutes = require("./routes/benevoleRoutes");

// Create Express server
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(configCors);

app.use('/benevoles', benevoleRoutes);

export default app;