const express = require("express");
const cors = require("cors");
const connectMongodb = require("./config/database");
const router = require("./routes");

const cookiesParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cookiesParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.port || 5173;

app.get("/", (req, res) => {
  res.json({
    message: "Server running at " + PORT,
  });
});

app.use("/api", router);

connectMongodb().then(() => {
  app.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
