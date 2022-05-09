const mongoose = require('mongoose');

const mongoConnect = async () => {
  const connection = await mongoose.connect(
    'mongodb+srv://forum:forum@forum.yibgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {}
  );
  console.log('Connected to Forum Database.');
};

module.exports = mongoConnect;
