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
S.date,
SP.product_id AS productId,
SP.quantity
FROM
StoreManager.sales_products AS SP
JOIN
sales AS S ON S.id = SP.sale_id
WHERE SP.sale_id = ?
ORDER BY
productId`;

const getAll = async () => {
  console.log('sale1');
  const [sales] = await connection.execute(getAllQuery);
  return sales;
};

const getById = async (id) => {
  console.log('sale2');
  const [sale] = await connection.execute(getByIdQuery, [id]);
  return sale;
};

const createSale = async () => {
  console.log('sale3');
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales SET date = (NOW());');
  return sale;
};

const createProductSale = async (saleId, product, quantity) => {
  console.log(saleId, product, quantity);
  const [productSale] = await connection.execute(`INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [saleId, product, quantity]);
  return productSale;
};

const updateSale = async (saleId, productId, quantity) => {
  console.log('s6');
  const [updatedSale] = await connection.execute(`UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`, [productId, quantity, saleId]);
  return updatedSale;
};

const deleteSale = async (saleId) => {
  console.log('asdasdas7');
  const [deletedSale] = await connection.execute(`DELETE FROM StoreManager.sales 
  WHERE id = ?`, [saleId]);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  createProductSale,
  updateSale,
  deleteSale,
};