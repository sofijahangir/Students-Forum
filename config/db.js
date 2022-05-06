const mongoose = require('mongoose');

const mongoConnect = async () => {
  const connection = await mongoose.connect(
    'mongodb+srv://jsofi502:forum@cluster0.h4voi.mongodb.net/forum?retryWrites=true&w=majority',
    {}
  );
  console.log('Connected to Forum DataBase');
};

module.exports = mongoConnect;
