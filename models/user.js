const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');

const PassportLocalSchema = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    isSuperAdmin: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isFaculty: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'userId',
  localField: '_id',
});
UserSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'userId',
  localField: '_id',
});
UserSchema.virtual('likes', {
  ref: 'Likes',
  foreignField: 'userId',
  localField: '_id',
});
UserSchema.virtual('dislikes', {
  ref: 'Dislikes',
  foreignField: 'userId',
  localField: '_id',
});

UserSchema.virtual('views', {
  ref: 'Views',
  foreignField: 'userId',
  localField: '_id',
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
