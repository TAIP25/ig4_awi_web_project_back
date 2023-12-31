import express from 'express';
import { getPostes, getPosteById, getPosteByName, createPoste, updatePoste } from '../controllers/posteController';
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', getPostes);
router.get('/:id', getPosteById);
router.get('/nom/:nom', getPosteByName);

//===== POST REQUESTS =====//
router.post('/', createPoste);

//===== PUT REQUESTS =====//
router.put('/:id', updatePoste);

export const posteRoutes = router;