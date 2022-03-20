module.exports = (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (Number(quantity) <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
