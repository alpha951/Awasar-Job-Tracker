const mongoose = require("mongoose");

const connectDb = async (url) => {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
