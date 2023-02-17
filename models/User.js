const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');



const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
   

    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thoughts'}],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'}],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
