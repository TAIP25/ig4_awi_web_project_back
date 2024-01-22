import express from 'express';
import { 
  getInscriptions, 
  getInscriptionsByBenevole, 
  getInscriptionsByPoste, 
  getInscriptionsByCreneauHoraire,
  getInscriptionsByCreneauHoraireAndPoste, 
  getInscriptionById,
  getNbInscriptionsByPoste,
  createInscription, 
  updateInscription, 
  deleteInscription 
} from '../controllers/inscriptionBenevoleController';
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/festival/:id', getInscriptions);
router.get('/festival/:id/benevole/:benevoleId', getInscriptionsByBenevole);
router.get('/festival/:id/poste/:posteId', getInscriptionsByPoste);
router.get('/festival/:id/creneauxHoraire/:creneauHoraireId', getInscriptionsByCreneauHoraire);
router.get('/festival/:id/creneauxHoraire/:creneauHoraireId/poste/:posteId', getInscriptionsByCreneauHoraireAndPoste);
router.get('/:id', getInscriptionById);
router.get('/festival/:id/count', getNbInscriptionsByPoste);

//===== POST REQUESTS =====//
router.post('/', createInscription);

//===== PUT REQUESTS =====//
router.put('/:id', updateInscription);

//===== DELETE REQUESTS =====//
router.delete('/:id', deleteInscription);

export const inscriptionBenevoleRoutes = router;