const express = require('express');
const router = express.Router();
const {
    createCoin,
    getCoins,
    getCoin,
    updateCoin,
    deleteCoin,

} = require("../controllers/CoinController");

router.post("/", createCoin);
router.get("/", getCoins);
router.get("/:id", getCoin);
router.put("/:id", updateCoin);
router.delete("/:id", deleteCoin);


module.exports = router;