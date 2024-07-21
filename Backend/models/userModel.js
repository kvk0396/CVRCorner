const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  rollNo: {
    type: String,
    required: true,
    //match: /^[0-9]{2}[Bb]81[Aa][A-Za-z0-9]{4}$/,
    unique: true
  },
  email: {
    type: String,
    required: true,
    //match: /^[0-9]{2}[Bb]81[Aa][A-Za-z0-9]{4}@cvr.ac.in$/,
    unique: true
  },
  password: {
    type: String,
    required: true,
    //match: /^.{8}$/
  }
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
