const express = require("express");
const cors = require("cors");
const connectMongodb = require("./config/database");
const router = require("./routes");

const { app, server } = require("./socket/index");
const cookiesParser = require("cookie-parser");

require("dotenv").config();

// const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(cookiesParser());

const PORT = process.env.port || 5173;

app.get("/", (req, res) => {
  res.json({
    message: "Server running at " + PORT,
  });
});

app.use("/api", router);

connectMongodb().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
