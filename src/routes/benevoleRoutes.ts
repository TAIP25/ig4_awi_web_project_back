const express = require('express');
const benevoleController = require('../controllers/benevoleController');
const router = express.Router();

//===== GET REQUESTS =====//
router.get('/', benevoleController.getBenevoles);
router.get('/:id', benevoleController.getBenevole);

//===== POST REQUESTS =====//
router.post('/', benevoleController.createBenevole);


//===== PUT REQUESTS =====//
router.put('/:id', benevoleController.updateBenevole);


//===== DELETE REQUESTS =====//
router.delete('/:id', benevoleController.deleteBenevole);


module.exports = router;