const express = require("express");
const router = express.Router();
const url = require("url");
const { Bank } = require("../models/bank");

router.get("/", async (req, res) => {
  const { query } = url.parse(req.url, true);

  const branch = query.q;
  const limit = parseInt(query.limit);
  const offset = parseInt(query.offset);

  const bank = await Bank.find({ branch })
    .sort({ ifsc: 1 })
    .limit(limit)
    .skip(offset);

  res.send(bank);
});

module.exports = router;
