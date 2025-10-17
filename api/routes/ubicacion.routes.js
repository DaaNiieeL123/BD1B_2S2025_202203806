const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacion.controller');

router.get('/', ubicacionController.getAll);
router.get('/:id_escuela/:id_centro', ubicacionController.getById);
router.post('/', ubicacionController.create);
router.put('/:id_escuela/:id_centro', ubicacionController.update);
router.delete('/:id_escuela/:id_centro', ubicacionController.delete);

module.exports = router;
