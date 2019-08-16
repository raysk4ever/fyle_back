const express = require("express");
const router = express.Router();
const _ = require("lodash");
const url = require("url");

const { Bank, validate } = require("../models/bank");

// router.get("/", async (req, res) => {
//   const banks = await Bank.find();
//   res.send(banks);
// });

router.get("/", async (req, res) => {
  const { query } = url.parse(req.url, true);

  const branch = query.q;
  const offSet = parseInt(query.offset);
  const limit = parseInt(query.limit);

  const str = "^" + branch;
  const reg = new RegExp(str);
  const bank = await Bank.find({ branch: reg })
    .sort({ branch: 1 })
    .limit(limit)
    .skip(offSet);
  res.send(bank);
  //   res.json({
  //     branch: branch,
  //     offset: offSet,
  //     limit: limit
  //   });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(`error: ${error.details[0].message}..`);

  let bank = await Bank.findOne({ bank_id: req.body.bank_id });
  if (bank) return res.status(400).send(`bank already exists...`);

  bank = new Bank(
    _.pick(req.body, [
      "name",
      "ifsc",
      "bank_id",
      "branch",
      "address",
      "city",
      "district",
      "state"
    ])
  );

  const result = await bank.save();
  res.send(result);
});

module.exports = router;
