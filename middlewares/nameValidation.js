module.exports = (req, res, next) => {
  try {
    const { name } = req.body;
    const MIN_NAME = 5;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < MIN_NAME) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
