import express from 'express';
import * as festivalBenevoleController from '../controllers/festivalBenevoleController';
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', festivalBenevoleController.getAllFestivalsBenevoles);
router.get('/:festivalID/:benevoleID', festivalBenevoleController.getFestivalBenevole);

//===== POST REQUESTS =====//
router.post('/', festivalBenevoleController.createFestivalBenevole);

//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//
router.delete('/:id', festivalBenevoleController.deleteFestivalBenevole);

export const festivalBenevoleRoutes = router;