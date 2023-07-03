const express = require("express");
const router = express.Router();
const {
  createBank,
  getBanks,
  getBank,
  updateBank,
  deleteBank,
} = require("../controllers/BankController");

router.post("/", createBank);
router.get("/", getBanks);
router.get("/:id", getBank);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);

module.exports = router;
