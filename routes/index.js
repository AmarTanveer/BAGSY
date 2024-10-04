const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  const error = req.flash("error");
  res.render("index.ejs", { error });
});

router.get("/shop", async function (req, res) {
  const products = await productModel.find();
  res.render("shop.ejs", {products});
});

module.exports = router;
