const express = require('express');
const salesController = require('../controllers/salesController');
// const middlewares = require('../middlewares');

// const postValidations = [
//   middlewares.productIdValidation,
//   middlewares.quantityValidation,
// ];

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

// router.post('/', null);

module.exports = router;