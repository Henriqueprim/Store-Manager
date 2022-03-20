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

module.exports = productExistence;