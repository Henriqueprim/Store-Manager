const errorMiddleware = require('./ErrorMiddleware');
const nameValidation = require('./nameValidation');
const quantityValidation = require('./quantityValidation');
const productIdValidation = require('./productIdValidations');

module.exports = {
  errorMiddleware,
  nameValidation,
  quantityValidation,
  productIdValidation,
};