const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found!" });
});

module.exports = app;
