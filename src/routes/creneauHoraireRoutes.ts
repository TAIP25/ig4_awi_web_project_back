import express from 'express';
import { getCreneauHoraires, getCreneauHoraireById } from '../controllers/creneauHoraireController';
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', getCreneauHoraires);
router.get('/:id', getCreneauHoraireById);

export const creneauHoraireRoutes = router;

