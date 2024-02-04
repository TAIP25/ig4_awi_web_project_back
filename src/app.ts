import express from 'express';
import { configCors } from './middlewares/mainMiddlewares';
import { benevoleRoutes } from './routes/benevoleRoutes';
import { festivalRoutes } from './routes/festivalRoutes';
import { associationRoutes } from './routes/associationRoutes';
import { festivalBenevoleRoutes } from './routes/festivalBenevoleRoutes';
import { posteRoutes } from './routes/posteRoutes';
import { creneauHoraireRoutes } from './routes/creneauHoraireRoutes';
import { inscriptionBenevoleRoutes } from './routes/inscriptionBenevoleRoutes';
import { jeuRoutes } from './routes/jeuRoutes';
import { espacesJeuRoutes } from './routes/espaceJeuRoutes';
import { sousEspaceJeuRoutes } from './routes/sousEspaceJeuRoutes';
import { jeuSousEspaceFestivalRoutes } from './routes/jeuSousEspaceFestivalRoutes';

// Create Express server
const app = express();  


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(configCors);

app.use('/benevole', benevoleRoutes);
app.use('/festival', festivalRoutes);
app.use('/association', associationRoutes);
app.use('/festivalBenevole', festivalBenevoleRoutes);
app.use('/poste', posteRoutes);
app.use('/creneauHoraire', creneauHoraireRoutes);
app.use('/inscriptionBenevole', inscriptionBenevoleRoutes);
app.use('/jeu', jeuRoutes);
app.use('/espaceJeu', espacesJeuRoutes);
app.use('/sousEspaceJeu', sousEspaceJeuRoutes);
app.use('/jeuSousEspaceFestival', jeuSousEspaceFestivalRoutes);


export default app;