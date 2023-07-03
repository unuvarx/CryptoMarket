const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/VerifyToken.js");
const {
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

} = require("../controllers/UserController");

// !USER ROUTE STARTING

//update
router.put("/:id", updateUser);
//delete
router.delete("/:id", deleteUser);
//get
router.get("/:id", getUser);
//get all
router.get("/", getUsers);

//coins
router.put("/add-coinsprocess/:id", addCoinsProcess);
router.put("/add-coin/:id", addCoin);
router.put("/sell-coin/:id", sellCoin);

router.put("/withdraw/:id", withdrawMoney);
router.put("/deposit/:id", depositMoney);

router.put("/withdraw/:userId/:withdrawId", updateWithdraw);
router.put("/deposit/:userId/:depositId", updateDeposit);


// !USER ROUTE FINISHED

module.exports = router;
