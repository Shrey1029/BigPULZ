const express = require("express");
const Order = require("../models/Order");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Upload Orders CSV
const upload = multer({ dest: "uploads/" });

router.post("/orders-csv", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "CSV file is required" });
    }

    const orders = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        // ✅ Map CSV fields properly
        // Expected CSV headers:
        // orderId, customerName, productName, category, quantity, amount, city, paymentMode, orderDate

        orders.push({
          orderId: row.orderId,
          customerName: row.customerName,
          productName: row.productName,
          category: row.category,
          quantity: Number(row.quantity || 1),
          amount: Number(row.amount || 0),
          city: row.city,
          paymentMode: row.paymentMode,
          orderDate: row.orderDate,
        });
      })
      .on("end", async () => {
        fs.unlinkSync(req.file.path); // ✅ delete uploaded temp file

        if (orders.length === 0) {
          return res.status(400).json({
            success: false,
            message: "CSV file is empty or invalid",
          });
        }

        await Order.insertMany(orders);

        return res.status(201).json({
          success: true,
          message: "✅ CSV uploaded & orders stored successfully",
          inserted: orders.length,
        });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
