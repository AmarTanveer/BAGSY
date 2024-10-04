const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("index.ejs", { error, success });
});

router.get("/shop",isLoggedIn, async function (req, res) {
  const products = await productModel.find();
  const success = req.flash("success");
  res.render("shop.ejs", {products, success});
});

router.get("/cart", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({email: req.user.email}).populate("cart");
  const cartItems = user.cart;
  res.render("cart.ejs", {cartItems})
})

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
})


router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  req.flash("success", "You have been logged out");

  // Redirect the user to the login page or home page
  res.redirect("/");
})

module.exports = router;
