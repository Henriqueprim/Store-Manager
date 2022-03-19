const express = require('express');
const productsController = require('../controllers/productsController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

const postValidations = [
  middlewares.nameValidation,
  middlewares.quantityValidation,
];

router.post('/', postValidations);

module.exports = router;