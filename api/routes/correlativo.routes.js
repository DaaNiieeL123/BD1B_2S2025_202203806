const express = require('express');
const router = express.Router();
const correlativoController = require('../controllers/correlativo.controller');

router.get('/', correlativoController.getAll);
router.get('/:id', correlativoController.getById);
router.post('/', correlativoController.create);
router.put('/:id', correlativoController.update);
router.delete('/:id', correlativoController.delete);

module.exports = router;
