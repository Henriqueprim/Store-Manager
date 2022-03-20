const productsServices = require('../services/productsServices');

const productExistence = async (req, res, next) => {
  try {
    const { name } = req.body;
    const products = await productsServices.getAll();
    const exists = products.some((prod) => prod.name === name);
    if (exists) return res.status(409).json({ message: 'Product already exists' });
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const productIdValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productsList = await productsServices.getAll();
    const exists = productsList.some((prod) => prod.id === Number(id));
    if (!exists) return res.status(404).json({ message: 'Product not found' });
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const productIdInSales = async (req, res, next) => {
  try {
    console.log(req.body);
    const { productId } = req.body[0];
    console.log(productId);
    const productsList = await productsServices.getAll();
    console.log(productsList);
    const exists = productsList.some((prod) => prod.id === Number(productId));
    console.log(exists);
    if (!exists) return res.status(404).json({ message: 'Product not found' });
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  productExistence,
  productIdValidation,
  productIdInSales,
};