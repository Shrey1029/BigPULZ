const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, default: "General" },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    city: { type: String, default: "Unknown" },
    paymentMode: { type: String, default: "COD" },
    orderDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);