const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const isAdmin = require("../middlewares/isAdmin");
const ownerModel = require("../models/owner-model");


router.post("/create",isAdmin, upload.single("image"), async function (req, res) {
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

    const admin = await ownerModel.findOne({email: req.admin.email});
    admin.products.push(product._id);
    await admin.save();

    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});


router.get("/removeproduct/:productid",isAdmin, async function (req, res) {
 try{
    const productId = req.params.productid;
    const admin = await ownerModel.findOne({email: req.admin.email});
    
    // Remove the product ID from the admin's products array
    admin.products = admin.products.filter(id => id.toString() !== productId);
    await admin.save();

    // Delete the product from the productModel
    await productModel.findByIdAndDelete(productId);

    req.flash("success", "Product removed successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
