const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const Port = 1616;

let cs = "mongodb+srv://drshack:Dw47AGhlJ5Gefpc7@faradyan.3ewylju.mongodb.net/my-store?retryWrites=true&w=majority";

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