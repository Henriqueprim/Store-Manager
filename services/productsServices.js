const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  return product;
};

const createProduct = async (name, quantity) => {
  const product = await productsModels.createProduct(name, quantity);
  const newProduct = { id: product.insertId, name, quantity };
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};