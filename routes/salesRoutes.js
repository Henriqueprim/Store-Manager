const express = require('express');
const salesController = require('../controllers/salesController');
const middlewares = require('../middlewares');
const { productIdInSales } = require('../middlewares/productExistence');
const { quantityArr, quantityInStock } = require('../middlewares/quantityValidation');

const router = express.Router();

const postValidations = [
  middlewares.productIdExistence,
  quantityArr,
  quantityInStock,
];

const putValidations = [
  middlewares.productIdExistence,
  quantityArr,
  productIdInSales,
];

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', postValidations, salesController.createSale);

router.put('/:id', putValidations, salesController.updateSale);

router.delete('/:id', middlewares.saleIdValidation, salesController.deleteSale);

module.exports = router;