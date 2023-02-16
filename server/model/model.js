const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
  platform: String,
  status: String,
});

const Gamedb = mongoose.model("gamedbs", schema);

module.exports = Gamedb;
