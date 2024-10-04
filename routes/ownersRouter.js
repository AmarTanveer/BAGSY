const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
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
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", function (req, res) {
  const success = req.flash("success");
  res.render("createproducts.ejs", {success});
});

module.exports = router;
