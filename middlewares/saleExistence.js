const salesServices = require('../services/salesServices');

const saleIdValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesList = await salesServices.getAll();
    const exists = salesList.some((sale) => sale.saleId === Number(id));
    if (!exists) return res.status(404).json({ message: 'Sale not found' });
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = saleIdValidation;
