const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const Order = require("../models/Order");

const router = express.Router();

// store file temporarily in uploads folder
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
        orders.push({
          orderId: row.orderId,
          customerName: row.customerName,
          productName: row.productName,
          category: row.category || "General",
          quantity: Number(row.quantity),
          amount: Number(row.amount),
          city: row.city || "Unknown",
          paymentMode: row.paymentMode || "COD",
          orderDate: new Date(row.orderDate),
        });
      })
      .on("end", async () => {
  try {
    // ✅ 1) Find existing orderIds already in DB
    const existing = await Order.find(
      { orderId: { $in: orders.map(o => o.orderId) } },
      { orderId: 1, _id: 0 }
    );

    const existingIds = new Set(existing.map(e => e.orderId));

    // ✅ 2) Keep only new orders
    const newOrders = orders.filter(o => !existingIds.has(o.orderId));

    // ✅ 3) Insert only new orders (no duplicate error now)
    const inserted = await Order.insertMany(newOrders);

    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "CSV uploaded successfully ✅",
      totalRows: orders.length,
      insertedCount: inserted.length,
      skippedDuplicates: orders.length - inserted.length
    });
  } catch (err) {
    fs.unlinkSync(req.file.path);

    return res.status(500).json({
      success: false,
      message: "Upload failed ❌",
      error: err.message
    });
  }
      });  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});


module.exports = router;
