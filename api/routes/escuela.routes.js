const express = require('express');
const router = express.Router();
const escuelaController = require('../controllers/escuela.controller');

router.get('/', escuelaController.getAll);
router.get('/:id', escuelaController.getById);
router.post('/', escuelaController.create);
router.put('/:id', escuelaController.update);
router.delete('/:id', escuelaController.delete);

module.exports = router;
