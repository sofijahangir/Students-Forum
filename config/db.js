const mongoose = require('mongoose');

const mongoConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL, {});
  console.log('Connected to Forum DataBase');
};

module.exports = mongoConnect;
