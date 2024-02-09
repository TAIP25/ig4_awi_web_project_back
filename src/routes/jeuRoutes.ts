import express from 'express';
import * as jeuController from '../controllers/jeuController';
const router = express.Router();
import { auth }  from '../middlewares/login';


//===== GET REQUESTS =====//



//===== POST REQUESTS =====//
router.post('/', jeuController.createJeu);



//===== PUT REQUESTS =====//
router.put('/', auth, jeuController.updateJeu);


//===== DELETE REQUESTS =====//


export const jeuRoutes = router;