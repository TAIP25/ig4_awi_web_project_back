import express from 'express';
import * as festivalBenevoleController from '../controllers/festivalBenevoleController';
const router = express.Router();
import { auth }  from '../middlewares/login';


//===== GET REQUESTS =====//
router.get('/', festivalBenevoleController.getAllFestivalsBenevoles);
router.get('/:festivalID/:benevoleID', festivalBenevoleController.getFestivalBenevole);

//===== POST REQUESTS =====//
router.post('/', auth, festivalBenevoleController.createFestivalBenevole);

//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//
router.delete('/:id', auth, festivalBenevoleController.deleteFestivalBenevole);


export const festivalBenevoleRoutes = router;
