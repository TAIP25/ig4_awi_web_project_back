import express from 'express';
import {
  getAllJeuxSousEspaceFestival,
  getJeuxSousEspaceFestivalByFestival,
  createJeuSousEspaceFestival
} from '../controllers/jeuSousEspaceFestivalController';
const router = express.Router();


//===== GET REQUESTS =====//
router.get('/', getAllJeuxSousEspaceFestival);
router.get('/:festivalID', getJeuxSousEspaceFestivalByFestival);

//===== POST REQUESTS =====//
router.post('/', createJeuSousEspaceFestival);


//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//


export const jeuSousEspaceFestivalRoutes = router;