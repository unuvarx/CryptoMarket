const mongoose = require("mongoose");
const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
    },
    balance: {
      type: Number,
      default: 0,
    },
    coins: [{
      shortName: String,
      price: Number,
      amount: Number,
    }],
    coinsProcess: [
      {
        shortName: String,
        purchaseOrSale: String,
        price: String,
        amount: String,
        time : { type : Date, default: Date.now }
      },
      
    ],
    withdrawMoney: [
      {
        bank: String,
        iban: String,
        amount: String,
        desc: String,
        state: {
          type: String,
          default: "Bekliyor",
        },
        reason: {
          type: String,
          default: "-",
        },
        time : { type : Date, default: Date.now },
      }
    ],
    depositMoney: [
      {
        bank: String,
        amount: String,
        iban: String,
        state: {
          type: String,
          default: "Bekliyor",
        },
        reason: {
          type: String,
          default: "-",
        },
        time : { type : Date, default: Date.now },
      }
    ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel);
