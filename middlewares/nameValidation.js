module.exports = (req, res, next) => {
  try {
    const { name } = req.params;
    const MIN_NAME = 5;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < MIN_NAME) {
      return res.status(422).json({ message: '"name" must be at least 5 characters long' });
    }
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
