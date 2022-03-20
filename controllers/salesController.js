const salesServices = require('../services/salesServices');

const getAll = async (_req, res, next) => {
  try {
    const allSales = await salesServices.getAll();
    return res.status(200).json(allSales);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getById(id);

    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    const soldProducts = req.body; // não é desconstruído pq vai mais de um valor
    const saleInfo = await salesServices.createSale(soldProducts);
    return res.status(201).json(saleInfo);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
};