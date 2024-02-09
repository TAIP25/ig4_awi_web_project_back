import express from 'express';
import * as festivalController from '../controllers/festivalController';
import { auth }  from '../middlewares/login';

const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', festivalController.getAllFestivals);
router.get('/next', festivalController.getNextFestival);
router.get('/:id', festivalController.getFestivalById);


//===== POST REQUESTS =====//
router.post('/', auth, festivalController.createFestival);

//===== PUT REQUESTS =====//
router.put('/:id', auth, festivalController.updateFestival);

//===== DELETE REQUESTS =====//
router.delete('/:id', auth, festivalController.deleteFestival);

export const festivalRoutes = router;