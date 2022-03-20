const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
  try {
    const allProducts = await productsServices.getAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getById(Number(id));

    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsServices.createProduct(name, quantity);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await productsServices.updateProduct(id, name, quantity);
    // if (updatedProduct === null) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};