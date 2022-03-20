const express = require('express');
const productsController = require('../controllers/productsController');
const middlewares = require('../middlewares');

const postValidations = [
  middlewares.nameValidation,
  middlewares.quantityValidation,
  middlewares.productExistence,
];

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', postValidations, productsController.createProduct);

module.exports = router;