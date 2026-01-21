const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.get("/", (req, res) => {
  res.json({ message: "BizPulse API Running" });
});

app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes); 
app.use("/api/analytics", analyticsRoutes);

module.exports = app;
