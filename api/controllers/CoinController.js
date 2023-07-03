const Coin = require("../models/CoinModel");
const fs = require("fs");

const createCoin = async (req, res, next) => {
  const newCoin = new Coin(req.body);
  try {
    if (req.files.img[0].filename) {
      newCoin.img = req.files.img[0].filename;
    }
    const savedCoin = await newCoin.save();
    res.status(200).json(savedCoin);
  } catch (error) {
    next(error);
  }
};

const getCoins = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const coins = await Coin.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(coins);
  } catch (error) {
    next(error);
  }
};
const getCoin = async (req, res, next) => {
  try {
    const coin = await Coin.findById(req.params.id);
    res.status(200).json(coin);
  } catch (error) {
    next(error);
  }
};
const updateCoin = async (req, res, next) => {
  try {
    const updatedCoin = await Coin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedCoin);
  } catch (error) {}
};
const deleteCoin = async (req, res, next) => {
  try {
    const deletedCoin = await Coin.findByIdAndDelete(req.params.id);
    fs.unlink(`../client/public/images/${deletedCoin.img}`, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("img1 deleted");
    });
    res.status(200).json(deletedCoin);
  } catch (error) {
    
  }
}
module.exports = {
  createCoin,
  getCoins,
  getCoin,
  updateCoin,
  deleteCoin,

};
