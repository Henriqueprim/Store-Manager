const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);
  return sale;
};

const createSale = async (soldProducts) => {
  const sale = await salesModels.createSale();
  const saleInfo = { id: sale.insertId, itemsSold: soldProducts };
  soldProducts.forEach(async ({ productId, quantity }) => {
    await salesModels.createProductSale(sale.insertId, productId, quantity);
  });
  return saleInfo;
};

// const updateSale = async (saleInfo) =>

module.exports = {
  getAll,
  getById,
  createSale,
};