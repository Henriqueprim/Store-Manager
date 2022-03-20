const connection = require('./connection');

const getAllQuery = `SELECT
SP.sale_id AS saleId,
SP.product_id AS productId,
SP.quantity,
S.date
FROM 
StoreManager.sales_products AS SP
JOIN
StoreManager.sales AS S
  ON S.id = SP.sale_id
ORDER BY
productId;`;

const getByIdQuery = `SELECT
s.date,
sp.product_id AS productId,
sp.quantity
FROM
sales_products sp
INNER JOIN
sales AS s ON s.id = sp.sale_id
WHERE sp.sale_id = ?
ORDER BY
productId`;

const getAll = async () => {
  const [sales] = await connection.execute(getAllQuery);
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(getByIdQuery, [id]);
  return sale;
};

const createSale = async () => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales SET date = (NOW());');
  return sale;
};

const createProductSale = async (saleId, product, quantity) => {
  const [productSale] = await connection.execute(`INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [saleId, product, quantity]);
  return productSale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  createProductSale,
};