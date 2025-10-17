const express = require('express');
const router = express.Router();
const tipoTramiteController = require('../controllers/tipo_tramite.controller');

router.get('/', tipoTramiteController.getAll);
router.get('/:id', tipoTramiteController.getById);
router.post('/', tipoTramiteController.create);
router.put('/:id', tipoTramiteController.update);
router.delete('/:id', tipoTramiteController.delete);

module.exports = router;
