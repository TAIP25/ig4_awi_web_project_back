import express from 'express';
import * as jeuSousEspaceFestivalController from '../controllers/jeuSousEspaceFestivalController';
const router = express.Router();


//===== GET REQUESTS =====//


//===== POST REQUESTS =====//
router.post('/', jeuSousEspaceFestivalController.createJeuSousEspaceFestival);


//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//


export const jeuSousEspaceFestivalRoutes = router;