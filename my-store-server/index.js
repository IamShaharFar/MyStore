const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config()

const Port = 1616;

let cs = process.env.DATABASE_URL;
console.log(cs);

mongoose.connect(cs, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

const productsRoute = require("./Routes/Products");
const cartRoute = require("./Routes/Cart");
const newCartRoute = require("./Routes/NewCart");

app.use('/products', productsRoute)
app.use('/cart', cartRoute)
app.use('/newcart', newCartRoute)

app.listen(Port, () => {
    console.log(`Server running on port - ${Port}`)
})