const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  const query = `SELECT id, name, quantity 
    FROM StoreManager.products 
    WHERE id = ? 
    ORDER BY id;`;
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const createProduct = async (name, quantity) => {
  const [newProduct] = await connection.execute(`INSERT INTO StoreManager.products
  (name, quantity) VALUES (?, ?)`, [name, quantity]);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?`;
  const [updatedProduct] = await connection.execute(query, [name, quantity, id]);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const [response] = await connection.execute(`DELETE FROM StoreManager.products 
  WHERE id = ?;`, [id]);
  return response;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};