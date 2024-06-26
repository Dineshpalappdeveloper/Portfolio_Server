const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
