const express = require('express');
const productsController = require('../controllers/productsController');
const middlewares = require('../middlewares');
const { quantityObj } = require('../middlewares/quantityValidation');

const postValidations = [
  middlewares.nameValidation,
  quantityObj,
  middlewares.productExistence,
];

const putValidations = [
  middlewares.productIdValidation,
  middlewares.nameValidation,
  quantityObj,
];

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', postValidations, productsController.createProduct);

router.put('/:id', putValidations, productsController.updateProduct);

router.delete('/:id', middlewares.productIdValidation, productsController.deleteProduct);

module.exports = router;
