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
    const soldProducts = req.body;
    const saleInfo = await salesServices.createSale(soldProducts);
    return res.status(201).json(saleInfo);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];
    const updatedSale = await salesServices.updateSale(id, productId, quantity);
    if (updatedSale === null) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json({ saleId: id, itemUpdated: [{ productId, quantity }] });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};