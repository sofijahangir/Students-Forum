const mongoose = require('mongoose');

const mongoConnect = async () => {
  const connection = await mongoose.connect(
    'mongodb+srv://forum:forum@cluster0.m0nhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {}
  );
  console.log('Connected to Forum Database.');
};

module.exports = mongoConnect;
