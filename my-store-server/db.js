const mongoose = require("mongoose");
const connectionString = "mongodb+srv://kikbatovski123456:199Farad!@@my-store-faradyan.fc1dsgn.mongodb.net/my-store?retryWrites=true&w=majority";


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database.");
});

module.exports = db;