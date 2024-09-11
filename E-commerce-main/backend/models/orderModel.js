const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [],
    name: {
      type: String,
      required: true,
    },
    address: {
      client: String,
      phone: String,
      city: String,
      region: String,
      address: String,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "En attente",           // Pending
        "En cours de livraison", // In delivery
        "Livré",                // Delivered
        "Annulé",               // Canceled
        "En cours de préparation", // In preparation
      ],
      default: "En attente", // Correctly set default value as a string
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
