const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const addressRoutes = require("./routes/addressRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const app = express();
connectDB();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://phonestore-pravin.netlify.app",
    // origin: "*",
    credentials: true,
  })
);

//routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running PORT ${PORT}`);
});
