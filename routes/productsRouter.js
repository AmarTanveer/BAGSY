const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const { name, price, bgcolor, panelcolor, textcolor, discount } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      bgcolor,
      panelcolor,
      textcolor,
      discount,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
