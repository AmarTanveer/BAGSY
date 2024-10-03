const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.send("user");
});

router.post("/register", async function(req, res) {
    
    try {
    const {fullname, email, password} = req.body;
    const user = await userModel.findOne({email});
    if (user) {
        return res.status(500).send("User with the email already exists");
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.status(500).send(err.message);
        } 
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
                return res.status(500).send(err.message);
            } 
            const createdUser = await userModel.create({
                fullname, email, password: hash
            })
            return res.status(200).send(createdUser)
        })
    })
   
    } catch(err) {
        console.log(err.message)
        
    }
})

module.exports = router;
