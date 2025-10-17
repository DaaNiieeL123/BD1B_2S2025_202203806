const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');

router.get('/', registroController.getAll);
router.get('/:id', registroController.getById);
router.post('/', registroController.create);
router.put('/:id', registroController.update);
router.delete('/:id', registroController.delete);

module.exports = router;
