import express from 'express';
import { 
  getInscriptionsBenevoleSousEspaceDeJeu, 
  createInscriptionBenevoleSousEspaceDeJeu, 
  deleteInscriptionBenevoleSousEspaceDeJeu 
} from '../controllers/inscriptionBenevoleSousEspaceDeJeuController';

const router = express.Router();

//===== GET REQUESTS =====//
router.get('/:id', getInscriptionsBenevoleSousEspaceDeJeu);

//===== POST REQUESTS =====//
router.post('/', createInscriptionBenevoleSousEspaceDeJeu);

//===== DELETE REQUESTS =====//
router.delete('/:id', deleteInscriptionBenevoleSousEspaceDeJeu);

export const inscriptionBenevoleSousEspaceDeJeuRoutes = router;