import express from 'express';
import { configCors } from './middlewares/mainMiddlewares';
import {benevoleRoutes} from './routes/benevoleRoutes';
import {festivalRoutes} from './routes/festivalRoutes';
import { associationRoutes } from './routes/associationRoutes';
import {festivalBenevoleRoutes} from './routes/festivalBenevoleRoutes';


// Create Express server
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(configCors);

app.use('/benevole', benevoleRoutes);
app.use('/festival', festivalRoutes);
app.use('/association', associationRoutes);
app.use('/festivalBenevole', festivalBenevoleRoutes);


export default app;