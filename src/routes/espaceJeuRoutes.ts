import express from 'express';
import * as espacesJeuController from '../controllers/espaceJeuController';
const router = express.Router();


//===== GET REQUESTS =====//


//===== POST REQUESTS =====//
router.post('/', espacesJeuController.createEspaceDeJeu);



//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//



export const espacesJeuRoutes = router;