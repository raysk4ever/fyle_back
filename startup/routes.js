const express = require("express");
const bank = require("../routes/bank");
const search = require("../routes/search");

module.exports = function(app) {
  app.use(express.json());

  app.use("/api/branches/autocomplete", bank);
  app.use("/api/branches", search);
};
