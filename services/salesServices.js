const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

module.exports = {
  getAll,
};