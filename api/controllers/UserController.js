const User = require("../models/UserModel");

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("it is deleted!");
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const addCoinsProcess = async (req, res, next) => {
  let coin = req.body.coinsProcess;
  try {
    const updatedCoins = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          coinsProcess: coin,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCoins);
  } catch (error) {
    next(error);
  }
};
const addCoin = async (req, res, next) => {
  let coin = req.body.coins;
  let user = await User.findById(req.params.id);

  if (user.coins.length > 0) {
    if (user.coins.find((item) => item.shortName === coin.shortName)) {
      console.log("zaten var");
      // console.log(user.coins.find((item) => item.shortName === coin.shortName));
      try {
        const findedCoin = user.coins.find(
          (item) => item.shortName === coin.shortName
        );
        console.log(findedCoin);
        console.log(req.body.coins);
        findedCoin.amount += req.body.coins.amount;
        await user.save();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedCoin = await User.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              coins: coin,
            },
          },
          { new: true }
        );
        res.status(200).json(updatedCoin);
      } catch (error) {
        next(error);
      }
    }
  } else {
    try {
      const updatedCoin = await User.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            coins: coin,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedCoin);
    } catch (error) {
      console.log(error);
    }
  }
};
const sellCoin = async (req, res, next) => {
  try {
    let coin = req.body.coins;
    let user = await User.findById(req.params.id);
    if (user.coins.length > 0) {
      if (user.coins.find((item) => item.shortName === coin.shortName)) {
        const findedCoin = user.coins.find(
          (item) => item.shortName === coin.shortName
        );
        findedCoin.amount -= coin.amount;
        user.coins = user.coins.filter((item) => item.amount > 0);
        await user.save();
      } else {
        console.log("hata: böyle bir kripto yok!");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const withdrawMoney = async (req, res, next) => {
  let withdraw = req.body.withdrawMoney;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          withdrawMoney: withdraw,
        },
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
const depositMoney = async (req, res, next) => {
  let deposit = req.body.depositMoney;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          depositMoney: deposit,
        },
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateWithdraw = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const withdraw = user.withdrawMoney.find(
      (item) => item._id.toString() === req.params.withdrawId
    );
    withdraw.state = req.body.withdrawMoney.state;
    withdraw.reason = req.body.withdrawMoney.reason;
    await user.save();
  } catch (error) {
    next(error);
  }
};
const updateDeposit = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const deposit = user.depositMoney.find(
      (item) => item._id.toString() === req.params.depositId
    );
    deposit.state = req.body.depositMoney.state;
    deposit.reason = req.body.depositMoney.reason;
    await user.save();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  addCoinsProcess,
  addCoin,
  sellCoin,
  withdrawMoney,
  depositMoney,
  updateWithdraw,
  updateDeposit,
};
