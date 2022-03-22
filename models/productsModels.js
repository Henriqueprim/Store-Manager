const connection = require('./connection');

const getAll = async () => {
  console.log('primeiro');
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  console.log('seg');
  const query = `SELECT id, name, quantity 
    FROM StoreManager.products 
    WHERE id = ? 
    ORDER BY id;`;
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const createProduct = async (name, quantity) => {
  console.log(name, quantity);
  const [newProduct] = await connection.execute(`INSERT INTO StoreManager.products
  (name, quantity) VALUES (?, ?)`, [name, quantity]);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?`;
  const [updatedProduct] = await connection.execute(query, [name, quantity, id]);
  console.log(updatedProduct);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const [response] = await connection.execute(`DELETE FROM StoreManager.products 
  WHERE id = ?;`, [id]);
  console.log(response);
  return response;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};