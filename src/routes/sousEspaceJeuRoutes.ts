import express from 'express';
import * as sousEspaceJeuController from '../controllers/sousEspaceJeuController';
const router = express.Router();


//===== GET REQUESTS =====//


//===== POST REQUESTS =====//
router.post('/', sousEspaceJeuController.createSousEspaceDeJeu);



//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//



export const sousEspaceJeuRoutes = router;