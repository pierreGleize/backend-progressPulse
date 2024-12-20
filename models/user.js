const mongoose = require("mongoose");

const weightSchema = mongoose.Schema({
  weight: Number,
  date: Date,
});

const userSchema = mongoose.Schema({
  token: String,
  email: String,
  username: String,
  password: String,
  target: {
    weight: Number,
    date: Date,
    objectif: String,
    initialWeight: Number,
  },
  sound: { type: String, default: "Alarm" },
  weight: { type: [weightSchema], default: [] },
  resetToken: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
