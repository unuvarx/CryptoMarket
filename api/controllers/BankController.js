const Bank = require("../models/BankModel");

const createBank = async (req, res, next) => {
  const newBank = new Bank(req.body);
  try {
    const savedBank = await newBank.save();
    res.status(200).json(savedBank);
  } catch (error) {
    next(error);
  }
};

const getBanks = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const banks = await Bank.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(banks);
  } catch (error) {
    next(error);
  }
};
const getBank = async (req, res, next) => {
  try {
    const bank = await Bank.findById(req.params.id);
    res.status(200).json(bank);
  } catch (error) {
    next(error);
  }
};
const updateBank = async (req, res, next) => {
  try {
    const updatedBank = await Bank.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedBank);
  } catch (error) {
    next(error);
  }
};
const deleteBank = async (req, res, next) => {
  try {
    const deletedBank = await Bank.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBank);
  } catch (error) {
    
  }
}
module.exports = {
  createBank,
  getBanks,
  getBank,
  updateBank,
  deleteBank,

};
