const express = require("express")
const cors = require("cors")
const connectDB  = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
require('dotenv').config();
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// App Config
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//DB COnnection
connectDB();

//Api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});