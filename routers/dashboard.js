const express = require("express");
const {
  login,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  register,
  getProductsById,
  getOrders,
  changeOrder,
} = require("../models/dashboard");
const checkAuth = require("../middleware");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductsById);
router.post("/products/add", checkAuth, addProduct);
router.put("/products/update/:id", checkAuth, updateProduct);
router.delete("/products/delete/:id", checkAuth, deleteProduct);
router.post("/admin/register", register);
router.post("/admin/login", login);
router.get("/orders/view", checkAuth, getOrders);
router.post("/orders/changeStatus/:id", checkAuth, changeOrder);

module.exports = router;
