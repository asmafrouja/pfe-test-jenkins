const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      name: String,
      phone: String,
      city: String,
      region: String,
      street: String,
      
    },
    password: String,
    profilePic: String,
    role: String,
    resetPasswordCode: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
