import express from 'express';
//const benevoleController = require('../controllers/benevoleController');
import * as benevoleController from '../controllers/benevoleController';
import { auth }  from '../middlewares/login';
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', benevoleController.getBenevoles);
router.get('/:id', benevoleController.getBenevole);

//===== POST REQUESTS =====//
router.post('/', benevoleController.createBenevole);
router.post('/login', benevoleController.login);

//===== PUT REQUESTS =====//
router.put('/:id', auth, benevoleController.updateBenevole);


//===== DELETE REQUESTS =====//
router.delete('/:id', auth, benevoleController.deleteBenevole);


export const benevoleRoutes = router;