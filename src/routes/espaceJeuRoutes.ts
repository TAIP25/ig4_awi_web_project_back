import express from 'express';
import * as espacesJeuController from '../controllers/espaceJeuController';
const router = express.Router();
import { auth }  from '../middlewares/login';



//===== GET REQUESTS =====//
router.get('/', espacesJeuController.getAllEspacesDeJeu);
router.get('/festival/:id', espacesJeuController.getEspacesDeJeuByFestivalId);
router.get('/:id', espacesJeuController.getEspaceDeJeuById);

//===== POST REQUESTS =====//
router.post('/', auth, espacesJeuController.createEspaceDeJeu);



//===== PUT REQUESTS =====//


//===== DELETE REQUESTS =====//



export const espacesJeuRoutes = router;