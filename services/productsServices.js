const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

module.exports = {
  getAll,
};