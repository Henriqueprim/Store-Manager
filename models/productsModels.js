const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');
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

module.exports = {
  getAll,
  getById,
};