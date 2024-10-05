const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const {loginAdmin} = require("../controllers/authController");
const isAdmin = require("../middlewares/isAdmin");

// if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(500)
        .send("You dont have permission to create new owner");
    }

    let { fullname, email, password } = req.body;
    let createdOwner = {
      fullname,
      email,
      password,
    };
    
    await ownerModel.create(createdOwner);
    // res.status(201).send(createdOwner);
    res.redirect("/owners");
  });
// }

router.get("/", function (req, res) {
  res.render("owner-login.ejs")
})

router.get("/admin",isAdmin, async function (req, res) {
  const admin = await ownerModel.findOne({email: req.admin.email}).populate("products");
  const products = admin.products;

  res.render("admin.ejs", {products});
})

router.get("/createproduct", isAdmin, function(req, res) {
  const success = req.flash("success", "Admin verified")
  res.render("createproducts.ejs", {success})
})


router.post("/loginadmin", loginAdmin);

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  req.flash("success", "You have been logged out");

  // Redirect the user to the login page or home page
  res.redirect("/");
})
module.exports = router;
