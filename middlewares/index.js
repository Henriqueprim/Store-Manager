const errorMiddleware = require('./ErrorMiddleware');
const nameValidation = require('./nameValidation');
const quantityValidation = require('./quantityValidation');
// const productIdValidation = require('./productIdValidations');
const { productExistence, productIdValidation } = require('./productExistence');

module.exports = {
  errorMiddleware,
  nameValidation,
  quantityValidation,
  productIdValidation,
  productExistence,
};