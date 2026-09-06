const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
require("dotenv").config();

const authRoute = require("./route/auth.route")
const userRoute = require("./route/user.route");
const chatRoute = require("./route/chat.route");

const connectDB = require("./config/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

connectDB();


app.use("/QuickChat/api/v1/auth",authRoute);
app.use("/QuickChat/api/v1/user",userRoute);
app.use("/QuickChat/api/v1/chat",chatRoute);


app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
}); 
 