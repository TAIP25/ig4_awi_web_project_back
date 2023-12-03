import express from 'express';
import * as associationController from '../controllers/associationController';

const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', associationController.getAllAssociations);
router.get('/:id', associationController.getAssociationById);

//===== POST REQUESTS =====//
router.post('/', associationController.createAssociation);

//===== PUT REQUESTS =====//
router.put('/:id', associationController.updateAssociation);

//===== DELETE REQUESTS =====//
router.delete('/:id', associationController.deleteAssociation);


export const associationRoutes = router;