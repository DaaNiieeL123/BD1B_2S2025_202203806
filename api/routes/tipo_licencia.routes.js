const express = require('express');
const router = express.Router();
const tipoLicenciaController = require('../controllers/tipo_licencia.controller');

router.get('/', tipoLicenciaController.getAll);
router.get('/:id', tipoLicenciaController.getById);
router.post('/', tipoLicenciaController.create);
router.put('/:id', tipoLicenciaController.update);
router.delete('/:id', tipoLicenciaController.delete);

module.exports = router;
