const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
  try {
    const allProducts = await productsServices.getAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
    next(error);
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
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};