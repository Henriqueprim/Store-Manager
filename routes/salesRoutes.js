const express = require('express');
const salesController = require('../controllers/salesController');
const middlewares = require('../middlewares');
const { productIdInSales } = require('../middlewares/productExistence');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.createSale);

router.put('/:id', middlewares.quantityValidation, productIdInSales, salesController.updateSale);

router.delete('/:id', middlewares.saleIdValidation, salesController.deleteSale);

module.exports = router;