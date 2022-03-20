const productService = require('../services/productsServices');

const quantityObj = (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity } = req.body;
    if (quantity == null) return res.status(400).json({ message: '"quantity" is required' });
    if (Number(quantity) <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const quantityArr = (req, res, next) => {
  try {
    const { quantity } = req.body[0];
    if (quantity == null) return res.status(400).json({ message: '"quantity" is required' });
    if (Number(quantity) <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const quantityInStock = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body[0];
    const product = await productService.getById(productId);
    if (product.quantity < quantity) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  quantityObj,
  quantityArr,
  quantityInStock,
};