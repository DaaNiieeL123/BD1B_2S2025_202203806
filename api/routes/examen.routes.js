const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examen.controller');

router.get('/', examenController.getAll);
router.get('/:id', examenController.getById);
router.post('/', examenController.create);
router.put('/:id', examenController.update);
router.delete('/:id', examenController.delete);

module.exports = router;
