const mongoose = require("mongoose");
const CoinModel = new mongoose.Schema({
  img: {
    type: String,
  },
  coinName: {
    type: String,
  },
  shortName: {
    type: String,
  },
  purchasePrice: {
    type: String,
  },
  salePrice: {
    type: String,
  },
  change: {
    type: String,
  },
});



module.exports = mongoose.model("Coin", CoinModel);