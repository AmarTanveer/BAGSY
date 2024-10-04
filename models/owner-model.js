const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: { type: String, trim: true, required: true, minLength: 3 },
  email: String,
  password: String,
  gstin: String,
  picture: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
});

module.exports = mongoose.model("owner", ownerSchema);
