const salesServices = require('../services/salesServices');

const getAll = async (_req, res, next) => {
  try {
    const allSales = await salesServices.getAll();
    return res.status(200).json(allSales);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAll,
};