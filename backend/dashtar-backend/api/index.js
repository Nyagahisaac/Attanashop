require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require('express-session');

const Sequelize = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const userOrderRoutes = require("../routes/userOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const { isAuth, isAdmin } = require("../config/auth");
const cookieSession = require("cookie-session");
const passportSetup = require("passport");
const passport = require("passport");
const authRoute = require("../routes/auth");
const toolsRoutes  = require("../routes/toolsRoutes")
const subCategoryRoutes = require("../routes/subCategoryRoutes")
const brandRoutes = require("../routes/brandRoutes")
const modelViewRoutes = require("../routes/modelViewRoutes")
const mpesaRoute = require("../routes/mpesaRoute")
const mpesaResponse = require ("../routes/mpesaResponseRoute")
const paypalRoute = require("../routes/paypalRoute")

Sequelize.authenticate()
  .then(() => console.log("PostgreSQL Database Connected"))
  .catch((err) => console.log("Error: " + err));

const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable("trust proxy");

app.use(express.json({ limit: "4mb" }));
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
// 
app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/order/", isAuth, userOrderRoutes);
app.use("/api/subCategory/", subCategoryRoutes);
app.use("/api/tools/", toolsRoutes);
app.use("/api/brand/", brandRoutes);
app.use("/api/view/", modelViewRoutes);
app.use("/api/mpesa/", mpesaRoute);
app.use("/api/mpesaResponse/", mpesaResponse);
app.use("/api/paypal/", paypalRoute);

//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", isAuth, orderRoutes);
app.use("/auth", authRoute);

//static Images folder
app.use("/Images", express.static("../Images"));

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
