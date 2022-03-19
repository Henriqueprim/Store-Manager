module.exports = (req, res, next) => {
try {
  const { productId } = req.params;

  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  
  return next();
} catch (error) {
  console.log(error);
  next(error);
}
};
