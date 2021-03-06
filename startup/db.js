const mongoose = require("mongoose");
const config = require("config");

module.exports = function() {
  mongoose
    .connect(config.get("db"), { useNewUrlParser: true })
    .then(() => console.log(`connected to mongodb`))
    .catch(e => console.log(`Mongo Error: ${e}`));
};
