const mongoose = require("mongoose");
const joi = require("joi");

const bankSchema = new mongoose.Schema({
  ifsc: {
    type: String,
    required: true
  },
  bank_id: {
    type: Number,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

const Bank = mongoose.model("Banks", bankSchema);

function validateBank(bank) {
  const Schema = {
    bank_id: joi.number().required(),
    name: joi.string().required(),
    branch: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    district: joi.string().required(),
    state: joi.string().required(),
    ifsc: joi.string().required()
  };
  return joi.validate(bank, Schema);
}

exports.validate = validateBank;
exports.Bank = Bank;
