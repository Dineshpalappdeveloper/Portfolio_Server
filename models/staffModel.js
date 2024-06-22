const mongoose = require("mongoose");

const satffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  efficiency: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    default: "Yes",
  },
});
const staffModel = mongoose.model("staff", satffSchema);
module.exports = staffModel;
