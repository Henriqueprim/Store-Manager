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
  
const getAll = async () => {
  const [sales] = await connection.execute(getAllQuery);
  return sales;
};

module.exports = {
  getAll,
};