const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  let { username, password } = req.body;

  const result = await client.query(
    `SELECT * FROM admins WHERE username = '${username}'`
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

async function getProducts(req, res) {
  const { search, filter, page, pageSize = 10, minPrice, maxPrice } = req.query;

  let whereClause = "WHERE active = true";
  if (search) {
    whereClause += ` AND (name ILIKE '%${search}%')`;
  }
  if (filter) {
    whereClause += ` AND category = '${filter}'`;
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

async function addProduct(req, res) {
  let { id, name, price, discount, image, active } = req.body;
  const result =
    await client.query(`INSERT INTO students (id, name, price, discount, image, active)
  VALUES ('${id}', '${name}', '${price}', '${discount}', '${image}', '${active}', ) RETURNING *`);
  res.send(result.rows);
}

async function updateProduct(req, res) {
  let { id } = req.params;
  let { name, price, discount, image, active } = req.body;
  const result = await client.query(
    `UPDATE products SET name = '${name}', price = '${price}', discount = '${discount}', image = '${image}', active = '${active}' WHERE id = ${id}`
  );
  res.send(result.rows);
}
async function deleteProduct(req, res) {
  let { id } = req.params;
  const result = await client.query(
    `UPDATE products set active = false WHERE id = ${id}`
  );
  res.send(result.rows);
}

async function register(req, res) {
  let { name, department, username, password } = req.body;

  const hashPasswod = bcrypt.hashSync(password, 10);

  const result =
    await client.query(`INSERT INTO admins (name, department, username, password)
  VALUES ('${name}', '${department}', '${username}', '${hashPasswod}') RETURNING *`);

  res.send({
    success: true,
    user: result.rows[0],
  });
}

async function getOrders(req, res) {
  const result = await client.query(`SELECT * FROM orders`);
  res.send(result.rows);
}

async function changeOrder(req, res) {
  let id = req.params.id;
  let { status } = req.body;
  const result = await client.query(
    `UPDATE orders SET status = '${status}' WHERE id = ${id}`
  );
  res.send(result.rows);
}

module.exports = {
  login,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  register,
  getProductsById,
  getOrders,
  changeOrder,
};
