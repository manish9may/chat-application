const mongoose = require("mongoose");

async function connectMongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    connection.on("error", (err) => {
      console.log("Somthing went wrong with mongodb", err);
    });
  } catch (err) {
    console.log("Somthing went wrong", err);
  }
}

module.exports = connectMongodb;
