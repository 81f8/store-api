const express = require("express");
const { getProducts, getProductsById, addOrder, register, login } = require("../models/client");
const router = express.Router();
router.get("/products", getProducts);
router.get("/products/:id", getProductsById);
router.post("/orders/add", addOrder);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
