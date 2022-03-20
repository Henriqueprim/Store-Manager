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

const updateProduct = async (id, name, quantity) => {
  const product = await productsModels.updateProduct(id, name, quantity);
  if (product === undefined) return null;
  const updatedProduct = await productsModels.getById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const result = await productsModels.deleteProduct(id);
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};