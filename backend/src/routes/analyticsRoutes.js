const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// ✅ Total Sales + Total Orders
router.get("/summary", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$amount" },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    const data = result[0] || { totalOrders: 0, totalSales: 0, totalQuantity: 0 };

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Top Products (by revenue)
router.get("/top-products", async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $group: {
          _id: "$productName",
          revenue: { $sum: "$amount" },
          quantity: { $sum: "$quantity" }, // ✅ rename
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          productName: "$_id", // ✅ rename
          revenue: 1,
          quantity: 1,
        },
      },
    ]);

    res.json({ success: true, topProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.get("/city-sales", async (req, res) => {
  try {
    const citySales = await Order.aggregate([
      {
        $group: {
          _id: "$city",
          sales: { $sum: "$amount" }, // ✅ rename
        },
      },
      { $sort: { sales: -1 } },
      {
        $project: {
          _id: 0,
          city: "$_id",
          sales: 1,
        },
      },
    ]);

    res.json({ success: true, citySales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/monthly-sales", async (req, res) => {
  try {
    const data = await Order.aggregate([
      // ✅ Only keep docs where orderDate exists
      {
        $match: {
          orderDate: { $exists: true, $ne: null },
        },
      },

      // ✅ Convert orderDate to a real Date no matter what type it is
      {
        $addFields: {
          orderDateParsed: {
            $cond: [
              { $eq: [{ $type: "$orderDate" }, "date"] },
              "$orderDate", // already Date ✅
              {
                $dateFromString: {
                  dateString: "$orderDate", // string ✅
                  onError: null,
                  onNull: null,
                },
              },
            ],
          },
        },
      },

      // ✅ Remove invalid ones
      {
        $match: {
          orderDateParsed: { $ne: null },
        },
      },

      // ✅ Group month/year
      {
        $group: {
          _id: {
            year: { $year: "$orderDateParsed" },
            month: { $month: "$orderDateParsed" },
          },
          totalSales: { $sum: "$amount" },
        },
      },

      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const formatted = data.map((item) => {
      const month = String(item._id.month).padStart(2, "0");
      return {
        month: `${item._id.year}-${month}`,
        sales: item.totalSales,
      };
    });

    res.json({ success: true, monthlySales: formatted });
  } catch (error) {
    console.error("Monthly Sales Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
