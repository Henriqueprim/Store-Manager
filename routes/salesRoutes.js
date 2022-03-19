const express = require('express');
const salesController = require('../controllers/salesController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

const postValidations = [
  middlewares.productIdValidation,
  middlewares.quantityValidation,
];

router.post('/', postValidations);

module.exports = router;