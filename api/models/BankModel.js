const mongoose = require("mongoose");
const BankModel = new mongoose.Schema({
  receivingBank: {
    type: String,
  },
  iban: {
    type: String,
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model("Bank", BankModel);
