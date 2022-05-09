const mongoose = require('mongoose');

const mongoConnect = async () => {
  const connection = await mongoose.connect(
    'mongodb+srv://jsofi502:forum@cluster0.pd5rt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {}
  );
  console.log('Connected to Forum Database.');
};

module.exports = mongoConnect;
