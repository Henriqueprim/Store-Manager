const salesServices = require('../services/salesServices');

const saleIdValidation = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id } = req.params;
    // console.log(productId);
    const salesList = await salesServices.getAll();
    console.log(salesList);
    const exists = salesList.some((sale) => sale.saleId === Number(id));
    console.log(exists);
    if (!exists) return res.status(404).json({ message: 'Sale not found' });
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = saleIdValidation;