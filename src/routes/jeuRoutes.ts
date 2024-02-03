import express from 'express';
import * as jeuController from '../controllers/jeuController';
const router = express.Router();


//===== GET REQUESTS =====//



//===== POST REQUESTS =====//
router.post('/', jeuController.createJeu);



//===== PUT REQUESTS =====//
router.put('/', jeuController.updateJeu);


//===== DELETE REQUESTS =====//


export const jeuRoutes = router;