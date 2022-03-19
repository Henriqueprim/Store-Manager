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

module.exports = {
  getAll,
};