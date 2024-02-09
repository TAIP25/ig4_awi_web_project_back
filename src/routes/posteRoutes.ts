import express from 'express';
import { getPostes, getPosteById, /*getPosteByName*/ createPoste, updatePoste, deletePoste } from '../controllers/posteController';
const router = express.Router();
import { auth }  from '../middlewares/login';


//===== GET REQUESTS =====//
router.get('/festival/:id', getPostes);
router.get('/:id', getPosteById);
//router.get('/festival/:id/nom/:nom', getPosteByName);

//===== POST REQUESTS =====//
router.post('/', auth, createPoste);

//===== PUT REQUESTS =====//
router.put('/:id', auth, updatePoste);

//===== DELETE REQUESTS =====//
router.delete('/:id', auth,  deletePoste);

export const posteRoutes = router;