const errorMiddleware = require('./ErrorMiddleware');
const nameValidation = require('./nameValidation');
const quantityValidation = require('./quantityValidation');
const saleIdValidation = require('./saleExistence');
const { productExistence, productIdValidation } = require('./productExistence');
const productIdExistence = require('./productIdExistence');

module.exports = {
  errorMiddleware,
  nameValidation,
  quantityValidation,
  productIdValidation,
  productIdExistence,
  productExistence,
  saleIdValidation,
};