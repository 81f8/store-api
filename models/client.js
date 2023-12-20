const client = require("../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function getProducts(req, res) {
  const { search, category, page, pageSize = 10, minPrice, maxPrice } = req.query;

  let whereClause = "WHERE active = true";
  if (search) {
    whereClause += ` AND (name ILIKE '%${search}%')`;
  }
  if (filter) {
    whereClause += ` AND category = '${category}'`;
  }
  if (minPrice) {
    whereClause += ` AND price >= ${minPrice}`;
  }
  if (maxPrice) {
    whereClause += ` AND price <= ${maxPrice}`;
  }

  const offset = (page - 1) * pageSize || 0;

  const queryString = `
    SELECT * FROM products
    ${whereClause}
    ORDER BY id ASC
    LIMIT ${pageSize} OFFSET ${offset}
  `;
  console.log("Generated SQL Query:", queryString);

  try {
    const result = await client.query(queryString);

    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getProductsById(req, res) {
  const { id } = req.params;

  try {
    const result = await client.query(`
    SELECT * FROM products
    WHERE id = ${id}
  `);

    if (result.rows.length === 0) {
      res.status(404).send("Product not found");
    } else {
      res.send(result.rows[0]);
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function addOrder(req, res) {
  let { items, userID, address, status } = req.body;
  const result = await client.query(
    `INSERT INTO orders (items, userID, address, status)
    VALUES ('${items}', '${userID}', '${address}', '${status}') RETURNING *`
  );
  res.send(result.rows);
}

async function register(req, res) {
  let { name, username, password, phone } = req.body;

  const hashPasswod = bcrypt.hashSync(password, 10);

  const result = await client.query(`INSERT INTO users (username, password)
  VALUES ('${name}', '${username}', '${hashPasswod}', '${phone}') RETURNING *`);

  res.send({
    success: true,
    user: result.rows[0],
  });
}

async function login(req, res) {
  let { username, password } = req.body;

  const result = await client.query(
    `SELECT * FROM users WHERE username = '${username}'`
  );

  if (result.rows.length === 0)
    res.send({ success: false, msg: "User not found" });
  else {
    let user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(user, "salam");
      res.send({ success: true, token, user });
    } else res.send({ success: false, msg: "Wrong password!" });
  }
}

module.exports = {
  getProducts,
  getProductsById,
  addOrder,
  register,
  login,
};
